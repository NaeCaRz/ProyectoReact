import React from 'react';

function ProductCard({ product }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      width: 180,
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img 
        src={product.image} 
        alt={product.name} 
        style={{
          width: '100%',       // ocupa todo el ancho del card
          height: 'auto',      // altura proporcional a la anchura
          display: 'block',
        }} 
      />
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h3>
        <p style={{ fontSize: '0.9rem', color: '#555', margin: '0 0 1rem 0' }}>{product.description}</p>
        <strong>${product.price}</strong>
      </div>
    </div>
  );
}

export default ProductCard;
