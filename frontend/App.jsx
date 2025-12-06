import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

// Pages
const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">RO Water Systems</h1>
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
          {products.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-2xl font-bold text-blue-600 mb-2">${product.price}</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const HomePage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600">
    <div className="text-center text-white">
      <h1 className="text-5xl font-bold mb-4">RO Water System E-Commerce</h1>
      <p className="text-xl mb-8">Real-time Inventory, Secure Payments, Fast Delivery</p>
      <a href="/shop" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
        Shop Now
      </a>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ProductCatalog />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
