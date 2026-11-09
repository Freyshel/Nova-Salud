import './AlertasInventario.css';

export default function AlertasInventario({ productos }) {
  const alertas = productos.filter(p => p.stock <= p.stockMinimo);

  return (
    <div className="card tarjeta-alertas h-100">
      <div className="card-body p-4">
        <h4 className="card-title text-danger fw-bolder mb-2">
          Alertas de Reposición
        </h4>
        <p className="text-muted small mb-4">Productos por debajo del stock de seguridad.</p>
        
        <div className="list-group list-group-flush gap-2" style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '5px' }}>
          {alertas.length === 0 ? (
            <div className="alert alert-success border-0 shadow-sm rounded-4 text-center p-4">
              <h5 className="fw-bold mb-1">¡Todo en orden!</h5>
              <span className="small">Stock en niveles óptimos.</span>
            </div>
          ) : (
            alertas.map((producto) => (
              <div key={producto.id} className="list-group-item alerta-item d-flex justify-content-between align-items-center p-3">
                <div>
                  <h6 className="fw-bold text-dark mb-1">{producto.nombre}</h6>
                  <span className="text-muted" style={{fontSize: '0.75rem'}}>
                    Mínimo requerido: {producto.stockMinimo}
                  </span>
                </div>
                <span className="badge bg-danger rounded-pill badge-pulsante">
                  Quedan {producto.stock}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}