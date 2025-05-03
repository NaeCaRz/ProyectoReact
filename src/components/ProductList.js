import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList() {
  // Estado para productos
  const [products, setProducts] = useState([]);

  // Estado para carrito
  const [cart, setCart] = useState([]);

  // Estado para búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2; // Productos por página

  // Cargar productos (simulado)
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: "iPhone 15 Pro",
        price: 1299,
        image: "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
        description: "El último iPhone con chip A17 Pro."
      },
      {
        id: 2,
        name: "Samsung Galaxy S24",
        price: 1199,
        image: "https://via.placeholder.com/300x300?text=Galaxy+S24",
        description: "Pantalla AMOLED y cámara de 200MP."
      },
      {
        id: 3,
        name: "Google Pixel 8",
        price: 899,
        image: "https://via.placeholder.com/300x300?text=Pixel+8",
        description: "Android puro con cámara avanzada."
      },
      {
        id: 4,
        name: "OnePlus 12",
        price: 799,
        image: "https://via.placeholder.com/300x300?text=OnePlus+12",
        description: "Rendimiento rápido y carga ultra rápida."
      }
    ];
    setProducts(mockProducts);
  }, []);

  // Función para agregar producto al carrito (sin duplicados)
  const onAddToCart = (product) => {
    setCart(prevCart => {
      if (prevCart.find(item => item.id === product.id)) return prevCart;
      return [...prevCart, product];
    });
  };

  // Filtrar productos según búsqueda
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section>
      <h2 className="productlist-title">Catálogo de móviles</h2>

      {/* Buscador */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Resetear página al buscar
          }}
          aria-label="Buscar producto"
        />
      </div>

      {/* Grid de productos */}
      <div className="productlist-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={page === currentPage ? 'active' : ''}
              aria-label={`Ir a página ${page}`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* Resumen del carrito */}
      <div className="cart-summary">
        <h3>Carrito ({cart.length} {cart.length === 1 ? 'producto' : 'productos'})</h3>
        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <ul>
            {cart.map(item => (
              <li key={item.id}>{item.name} - ${item.price}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default ProductList;

