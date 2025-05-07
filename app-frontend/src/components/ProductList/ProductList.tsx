import { useEffect, useState } from 'react';
import { ProductCard } from './components';
import './ProductList.css';

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imgUrl: string
}

function ProductList() {
  // Estado para productos
  const [products, setProducts] = useState<Product[]>([]);

  // Estado para carrito
  const [cart, setCart] = useState<Product[]>([]);

  // Estado para búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3; // Productos por página

  // Cargar productos (simulado)
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 1299,
      imgUrl: "https://th.bing.com/th/id/OIP.HUu3Q4iRmr5LizOANhzXbgHaF5?rs=1&pid=ImgDetMain",
      description: "El último iPhone con chip A17 Pro."
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 1199,
      imgUrl: "https://th.bing.com/th/id/OIP.HUu3Q4iRmr5LizOANhzXbgHaF5?rs=1&pid=ImgDetMain",
      description: "Pantalla AMOLED y cámara de 200MP."
    },
    {
      id: 3,
      name: "Google Pixel 8",
      price: 899,
      imgUrl: "https://wolksoftcr.com/wp-content/uploads/2023/10/google-pixel-8-siete-anos-de-actualizaciones-en-el-pixel-que-abraza-la-ia-como-su-principal-virtud.jpg",
      description: "Android puro con cámara avanzada."
    },
    {
      id: 4,
      name: "OnePlus 12",
      price: 799,
      imgUrl: "https://th.bing.com/th/id/OIP.HUu3Q4iRmr5LizOANhzXbgHaF5?rs=1&pid=ImgDetMain",
      description: "Rendimiento rápido y carga ultra rápida."
    },
    {
      id: 5,
      name: "OnePlus 12",
      price: 799,
      imgUrl: "https://th.bing.com/th/id/OIP.HUu3Q4iRmr5LizOANhzXbgHaF5?rs=1&pid=ImgDetMain",
      description: "Rendimiento rápido y carga ultra rápida."
    },
    {
      id: 6,
      name: "OnePlus 12",
      price: 799,
      imgUrl: "https://th.bing.com/th/id/OIP.HUu3Q4iRmr5LizOANhzXbgHaF5?rs=1&pid=ImgDetMain",
      description: "Rendimiento rápido y carga ultra rápida."
    },
    {
      id: 67,
      name: "OnePlus 12",
      price: 799,
      imgUrl: "https://th.bing.com/th/id/OIP.HUu3Q4iRmr5LizOANhzXbgHaF5?rs=1&pid=ImgDetMain",
      description: "Rendimiento rápido y carga ultra rápida."
    },
    {
      id: 8,
      name: "OnePlus 12",
      price: 799,
      imgUrl: "https://th.bing.com/th/id/OIP.HUu3Q4iRmr5LizOANhzXbgHaF5?rs=1&pid=ImgDetMain",
      description: "Rendimiento rápido y carga ultra rápida."
    },
    {
      id: 9,
      name: "OnePlus 12",
      price: 799,
      imgUrl: "https://th.bing.com/th/id/OIP.HUu3Q4iRmr5LizOANhzXbgHaF5?rs=1&pid=ImgDetMain",
      description: "Rendimiento rápido y carga ultra rápida."
    },
    {
      id: 10,
      name: "OnePlus 12",
      price: 799,
      imgUrl: "https://th.bing.com/th/id/OIP.HUu3Q4iRmr5LizOANhzXbgHaF5?rs=1&pid=ImgDetMain",
      description: "Rendimiento rápido y carga ultra rápida."
    }
    
  ];

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  // Función para agregar producto al carrito (sin duplicados)
  const onAddToCart = (product: Product) => {
    setCart(prevCart => {
      if (prevCart.find(item => item.id === product.id)) return prevCart;
      return [...prevCart, product];
    });
  };

  // Función para quitar producto del carrito
  const onRemoveFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
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

  const goToPage = (pageNumber: number) => {
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

      {/* Resumen del carrito con botón para quitar */}
      <div className="cart-summary">
        <h3>Carrito ({cart.length} {cart.length === 1 ? 'producto' : 'productos'})</h3>
        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price}{' '}
                <button 
                  onClick={() => onRemoveFromCart(item.id)} 
                  aria-label={`Quitar ${item.name} del carrito`}
                  className="remove-btn"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default ProductList;
