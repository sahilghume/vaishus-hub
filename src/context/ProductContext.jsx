/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/productService';
import { defaultProducts } from '../data/defaultProducts';

const ProductContext = createContext();

const CACHE_KEY = 'vaishus_hub_products_cache';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    // Initial load from cache if available to prevent flash of empty content
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCachedData, setIsCachedData] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
      setIsCachedData(false);
      // Cache data locally on success
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Error fetching products from service:', err);
      // If error occurs, load from localStorage if possible
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        setProducts(JSON.parse(cached));
        setIsCachedData(true);
        setError('Using offline cached products. Please check your internet connection.');
      } else {
        setProducts(defaultProducts);
        setError('Failed to fetch catalogue. Loading default items.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadData]);

  const value = {
    products,
    loading,
    error,
    isCachedData,
    refetch: () => loadData()
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
