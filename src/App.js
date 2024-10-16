import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import WishlistPage from './pages/WishlistPage';
import { HeartIcon, MoonIcon, SunIcon } from '@heroicons/react/solid';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'ratingDesc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [products, searchTerm, sortBy]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1)
  };

  const toggleWishlist = (productId) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter(id => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`${darkMode ? 'dark' : ''}`} >
        <div className="w-full h-screen">
          <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            <nav className="flex justify-between items-center py-8 px-4">
              <Link to="/" className="text-3xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 transition-colors duration-300">
                Product Catalog
              </Link>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className="mr-4 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                  aria-label="Toggle Dark Mode"
                >
                  {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                </button>
                <Link to="/wishlist" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  <HeartIcon className="h-6 w-6 mr-2" />
                  <span>Wishlist ({wishlist.length})</span>
                </Link>
              </div>
            </nav>
            <Routes>
              <Route
                path="/"
                element={
                  <ProductGrid
                    products={filteredAndSortedProducts}
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    isLoading={isLoading}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                }
              />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route
                path="/wishlist"
                element={
                  <WishlistPage
                    products={products}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
