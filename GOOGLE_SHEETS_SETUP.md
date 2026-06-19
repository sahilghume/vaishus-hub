# Vaishus Hub: Google Sheets Database Setup & User Guide

Welcome! Your website is now fully dynamic. All product data is fetched in real-time from your Google Sheet database. Whenever you add, edit, or remove products in Google Sheets, the changes will reflect instantly on the live website.

---

## Part 1: How to Setup Your Google Sheet

Follow these simple steps to configure your own Google Sheet as your product database:

### Step 1: Create Your Google Sheet
1. Open Google Sheets and create a **blank spreadsheet**.
2. Name the sheet (e.g., `Vaishus Hub Products`).
3. Set up the exact headers in the **first row (Row 1)**:

| id | name | category | price | description | image1 | image2 | image3 | image4 | image5 | active |
|---|---|---|---|---|---|---|---|---|---|---|

> [!IMPORTANT]
> - Row headers must match these names exactly (they are case-insensitive and whitespace-trimmed).
> - You can optionally add a column for `materials` (comma-separated list of materials used, e.g. `Freshwater Pearls, 18k Gold Plated`).

### Step 2: Share and Connect to Your Website
You can use either of the following two free, reliable methods:

#### Method A: Google Sheets Link Sharing (Recommended - Easiest!)
1. Click the green **Share** button in the top right of your Google Sheet.
2. Under "General access", change Restricted to **"Anyone with the link can view"** (Role: Viewer).
3. Copy the sheet URL from the address bar (e.g., `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit?usp=sharing`).
4. Paste this URL into your `.env` file:
   ```env
   VITE_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit?usp=sharing
   ```

#### Method B: Publish to Web as CSV
1. Click **File** > **Share** > **Publish to web**.
2. In the modal, select **Link**, then change "Entire Document" to your sheet page name (e.g. `Sheet1`) and choose **Comma-separated values (.csv)**.
3. Click **Publish** and copy the generated link.
4. Paste this link into your `.env` file:
   ```env
   VITE_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv
   ```

---

## Part 2: Product Management Operations

### HOW TO ADD A PRODUCT

* **Step 1:** Open your Google Sheet.
* **Step 2:** Scroll down and find the first empty row.
* **Step 3:** Fill in the columns:
  - **id**: Enter a unique number (e.g. `33`). If left blank, it will automatically default to the row index.
  - **name**: Enter your product title (e.g. `Golden Celestial Choker`).
  - **category**: Must be one of the supported categories: `earrings`, `necklaces`, `bracelets`, or `custom-gifts`.
  - **price**: Enter a numeric value (e.g. `1499` or `₹1,499`).
  - **description**: Enter a descriptive story or notes about the jewelry.
  - **image1**: Enter the primary product image URL (mandatory).
  - **image2**: Enter the second image URL (optional).
  - **image3**: Enter the third image URL (optional).
  - **image4**: Enter the fourth image URL (optional).
  - **image5**: Enter the fifth image URL (optional).
  - **active**: Enter `TRUE` or `true`.
* **Step 4:** The sheet saves automatically. Refresh your website, and your new product will be visible in the appropriate collection page!

---

### HOW TO EDIT A PRODUCT

1. Open your Google Sheet.
2. Locate the row of the product you want to modify.
3. Change any value in that row (e.g., lower the price, update the description, change category).
4. Save is automatic. Reload the website to see the changes instantly.

---

### HOW TO REMOVE A PRODUCT

You have two options to remove a product:
- **Temporary Disable (Recommended):** Set the value in the **active** column to `FALSE` (or `false`). The product will disappear from the website, but you will retain its details for future reference or restocking.
- **Permanent Delete:** Right-click the row number in Google Sheets and select **Delete row**.

---

### HOW TO CHANGE PRODUCT IMAGES

1. Upload your image to an image host (Google Drive, Cloudinary, Imgur, etc.).
2. Copy the share link or direct URL of the new image.
3. Open Google Sheets and locate the product row.
4. Paste the URL into any of the image columns: `image1`, `image2`, `image3`, `image4`, or `image5`.
   - The product card will display only the first image (`image1`).
   - The product details page will showcase a beautiful slide gallery containing all non-empty image columns (up to 5).

---

## Part 3: Image Management & Hosting Guidelines

The website service is designed to support three types of image links:

### 1. Google Drive Links (Easiest for local files)
You can upload photos directly to Google Drive, share them, and paste the link.
1. Upload your photo to Google Drive.
2. Right-click the file, choose **Share** > **Share**, and set General Access to **"Anyone with the link can view"**.
3. Click **Copy link** (e.g., `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`).
4. Paste this link directly into any of the image columns (`image1` to `image5`) in the Google Sheet. 
> [!TIP]
> The website contains built-in logic that automatically extracts the `FILE_ID` and converts it into a high-performance, direct image download link (`https://lh3.googleusercontent.com/d/FILE_ID`).

### 2. Cloudinary URLs
If you host images on Cloudinary, copy the direct image link (e.g., `https://res.cloudinary.com/demo/image/upload/sample.jpg`) and paste it into the sheet.

### 3. Direct Image URLs
Any public direct image link ending in standard formats (e.g. `.png`, `.jpg`, `.jpeg`, `.webp`) will render out-of-the-box.

---

## Part 4: Advanced Customizations (Optional)

You can customize the details page elements directly from the spreadsheet by adding this optional column:

1. **materials**: Add a column named `materials` and enter a comma-separated list of raw materials to render customized material badges.
   * *Example*: `Freshwater Pearls, 18k Gold Plated, Sterling Silver`
