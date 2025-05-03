import React from 'react';
import { motion } from 'framer-motion';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  return (
    <motion.article 
      className="product-card" 
      tabIndex="0" 
      aria-label={`Producto ${product.name}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.3 }}
    >
     <img 
  src={product.image} 
  alt={product.name} 
  className="product-image"
  loading="lazy"
/>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <strong className="product-price">${product.price}</strong>
        <button 
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
          aria-label={`Agregar ${product.name} al carrito`}
        >
          Agregar al carrito
        </button>
      </div>
    </motion.article>
  );
}

export default ProductCard;

