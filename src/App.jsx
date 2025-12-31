import React from 'react'; // added for completeness
import { BrowserRouter, Routes, Route, ScrollRestoration, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';

// ScrollToTop component to reset scroll on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      {/* ScrollToTop component handles scroll reset */}
      <AppRoutes /> 
    </BrowserRouter>
  );
}

// Separate component to use hooks inside Browser Router context if needed, 
// strictly speaking ScrollToTop logic is easiest inside a component rendered by Router
const AppRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/:slug" element={<ProductDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} /> 
            </Routes>
        </>
    )
}

export default App;
