import { DEFAULT_SHEET_URL, CATEGORIES } from '../utils/constants';
import { defaultProducts } from '../data/defaultProducts';

// Helper to transform Google Drive view links to direct hosted images
export function getDirectImageUrl(url) {
  if (!url) return '';
  const urlStr = url.toString().trim();
  
  // Check if it's a Google Drive link
  if (urlStr.includes('drive.google.com')) {
    // Match /file/d/[id] or ?id=[id]
    const matches = urlStr.match(/\/file\/d\/([a-zA-Z0-9-_]+)/) || urlStr.match(/[?&]id=([a-zA-Z0-9-_]+)/);
    if (matches && matches[1]) {
      // Return the high-performance, cookie-free Google Drive direct hosting link
      return `https://lh3.googleusercontent.com/d/${matches[1]}`;
    }
  }
  return urlStr;
}

// Map Google Sheets categories to the UI category values (with soft matching)
function mapCategory(category) {
  if (!category) return '';
  const clean = category.toString().toLowerCase().trim();
  
  // Soft matching heuristics
  if (clean.includes('necklace') || clean.includes('choker')) return 'Necklaces & Chokers';
  if (clean.includes('earring') || clean.includes('jhumka')) return 'Earrings & Jhumkas';
  if (clean.includes('pearl') || clean.includes('bead')) return 'Pearl & Bead Jewellery';
  if (clean.includes('bracelet') || clean.includes('bangle')) return 'Bracelets and Bangles';
  if (clean.includes('wedding') || clean.includes('bridal') || clean.includes('festive')) return 'Wedding Jewellery Collection';
  if (clean.includes('custom') || clean.includes('gift')) return 'Custom Gifts';
  
  // Exact name or slug matching
  const found = CATEGORIES.find(c => c.name.toLowerCase() === clean || c.slug === clean);
  if (found) return found.name;
  
  // Fallback Capitalized words
  return category.toString().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Convert price string (e.g. ₹1,499) to clean number (e.g. 1499)
function cleanPrice(priceVal) {
  if (priceVal === null || priceVal === undefined) return 0;
  if (typeof priceVal === 'number') return priceVal;
  
  const clean = priceVal.toString().replace(/[^0-9.]/g, '');
  return parseFloat(clean) || 0;
}

// Convert active flag to boolean
function cleanActive(activeVal) {
  if (activeVal === null || activeVal === undefined) return true; // default active
  if (typeof activeVal === 'boolean') return activeVal;
  
  const str = activeVal.toString().toLowerCase().trim();
  return str === 'true' || str === '1' || str === 'yes' || str === 'active';
}

// RFC-4180 compliant CSV Parser
function parseCSV(text) {
  const lines = [];
  let row = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push("");
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') {
        i++;
      }
      lines.push(row);
      row = [""];
    } else {
      row[row.length - 1] += c;
    }
  }
  
  if (row.length > 1 || row[0] !== "") {
    lines.push(row);
  }
  
  if (lines.length === 0) return [];
  
  const headers = lines[0].map(h => h.toLowerCase().trim());
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.length === 1 && line[0] === "") continue; // skip empty rows
    const item = {};
    headers.forEach((header, index) => {
      if (!header) return;
      const val = line[index] !== undefined ? line[index] : "";
      item[header] = val;
    });
    rows.push(item);
  }
  
  return rows;
}

// Parse Google Sheets Visualization API JSON format
function parseGvizResponse(text) {
  const jsonStart = text.indexOf('google.visualization.Query.setResponse(');
  if (jsonStart === -1) throw new Error('Invalid Google Sheets response format');
  
  // Extract JSON contents between google.visualization.Query.setResponse( and );
  const jsonString = text.substring(jsonStart + 'google.visualization.Query.setResponse('.length, text.length - 2);
  const data = JSON.parse(jsonString);

  if (data.status !== 'ok') {
    throw new Error(data.errors?.[0]?.detailed_message || 'Failed to retrieve data from Google Sheets');
  }

  const cols = data.table.cols.map(col => col.label || col.id || '');
  return data.table.rows.map(row => {
    const item = {};
    cols.forEach((colName, i) => {
      if (!colName) return;
      const cell = row.c[i];
      item[colName.toLowerCase().trim()] = cell ? cell.v : null;
    });
    return item;
  });
}

// Primary service function to retrieve products
export async function fetchProducts() {
  const configuredUrl = import.meta.env.VITE_GOOGLE_SHEET_URL || DEFAULT_SHEET_URL;
  const url = configuredUrl.trim();
  
  console.log('Fetching products database from URL:', url);

  try {
    let rawItems = [];

    // Case 1: SheetDB URL
    if (url.includes('sheetdb.io')) {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      rawItems = await response.json();
    }
    // Case 2: Google Apps Script Web App URL
    else if (url.includes('script.google.com')) {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      rawItems = await response.json();
    }
    // Case 3: Google Sheet view/edit URL (Anyone with the link can view)
    else if (url.includes('docs.google.com/spreadsheets') && !url.includes('output=csv')) {
      const matches = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      const spreadsheetId = matches ? matches[1] : null;
      if (!spreadsheetId) throw new Error('Could not parse Google Spreadsheet ID from URL');
      
      const gvizUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`;
      const response = await fetch(gvizUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const text = await response.text();
      rawItems = parseGvizResponse(text);
    }
    // Case 4: Published CSV URL or direct CSV link
    else {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const text = await response.text();
      // Detect if response is JSON or CSV
      const trimmed = text.trim();
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        rawItems = JSON.parse(trimmed);
      } else {
        rawItems = parseCSV(text);
      }
    }

    if (!Array.isArray(rawItems)) {
      throw new Error('Database response did not return an array of items');
    }

    // Map raw items into uniform product structure
    const mappedProducts = rawItems
      .map((item, index) => {
        const id = parseInt(item.id) || (index + 1);
        const name = item.name ? item.name.toString().trim() : '';
        const category = mapCategory(item.category);
        const price = cleanPrice(item.price);
        const description = item.description ? item.description.toString().trim() : '';
        const image = getDirectImageUrl(item.image);
        const active = cleanActive(item.active);

        // Advanced features: support comma-separated images and materials in sheet
        const images = item.images 
          ? item.images.toString().split(',').map(img => getDirectImageUrl(img.trim())) 
          : [image].filter(Boolean);
          
        const materials = item.materials 
          ? item.materials.toString().split(',').map(m => m.trim()) 
          : ['Handcrafted', 'Premium Quality'];

        return {
          id,
          name,
          category,
          price,
          description,
          image,
          images,
          materials,
          active
        };
      })
      // Filter active products, ensuring a valid name and price exists
      .filter(p => p.active && p.name !== '');

    console.log(`Successfully parsed ${mappedProducts.length} active products from Google Sheets.`);
    
    if (mappedProducts.length === 0) {
      console.warn('Google Sheets database returned 0 products. Falling back to local data.');
      return defaultProducts;
    }

    return mappedProducts;
  } catch (error) {
    console.error('Failed to load Google Sheets products. Falling back to local database. Error:', error);
    return defaultProducts;
  }
}
