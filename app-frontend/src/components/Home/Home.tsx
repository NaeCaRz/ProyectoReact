import "./Home.css"
import ProductList from "../ProductList/ProductList";

const Home = () => {
  return (
    <>
      <div className="app-container">
      <header>
        <h1>Tienda Virtual de Tecnología Móvil</h1>
      </header>
      <main>
        <ProductList />
      </main>
      <footer>
        <p>© 2025 Mi Tienda Virtual. Todos los derechos reservados.</p>
      </footer>
    </div>
    </>
  )
}

export default Home