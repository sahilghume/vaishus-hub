import { useEffect } from 'react';
import { Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import About from '../pages/About';
import Contact from '../pages/Contact';
import CategoryPage from '../pages/CategoryPage';
import { CATEGORIES } from '../utils/constants';

// ScrollToTop component reset page scroll position on route change
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

// Dynamic page wrapper that resolves category slug parameters
function CategoryPageWrapper() {
  const { categorySlug } = useParams();
  const categoryDetails = CATEGORIES.find(c => c.slug === categorySlug);
  
  if (!categoryDetails) {
    // If category slug doesn't exist, redirect to homepage
    return <Navigate to="/" replace />;
  }
  
  return <CategoryPage category={categoryDetails.name} />;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Dynamic Category Route */}
        <Route path="/category/:categorySlug" element={<CategoryPageWrapper />} />
        
        {/* Redirection for old static category bookmarks */}
        <Route path="/earrings" element={<Navigate to="/category/earrings-jhumkas" replace />} />
        <Route path="/necklaces" element={<Navigate to="/category/necklaces-chokers" replace />} />
        <Route path="/bracelets" element={<Navigate to="/category/bracelets-bangles" replace />} />
        <Route path="/custom-gifts" element={<Navigate to="/category/custom-gifts" replace />} />
        
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
