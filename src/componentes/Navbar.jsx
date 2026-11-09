import './Navbar.css';

export default function Navbar({ vista, setVista }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container">
        <a className="navbar-brand fw-bold brand-custom" href="#">💊 Nova Salud</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3">
            <li className="nav-item">
              <a 
                className={`nav-link nav-link-custom ${vista === 'ventas' ? 'active fw-bold' : ''}`} 
                href="#"
                onClick={(e) => { e.preventDefault(); setVista('ventas'); }}
              >
                Punto de Venta
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link nav-link-custom ${vista === 'inventario' ? 'active fw-bold' : ''}`} 
                href="#"
                onClick={(e) => { e.preventDefault(); setVista('inventario'); }}
              >
                Inventario
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}