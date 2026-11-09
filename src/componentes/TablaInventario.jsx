import { useState } from 'react';
import './TablaInventario.css';

export default function TablaInventario({ inventario }) {
  const [busqueda, setBusqueda] = useState('');

  const inventarioFiltrado = inventario.filter(producto => 
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="card tarjeta-inventario">
      <div className="card-header cabecera-inventario d-flex flex-column flex-md-row justify-content-between align-items-md-center p-4">
        <div className="mb-3 mb-md-0">
          <h4 className="fw-bold mb-1 titulo-inventario">Inventario General</h4>
          <span className="text-muted small">Gestión y control de existencias de Nova Salud</span>
        </div>
        <div className="contenedor-buscador">
          <input 
            type="text" 
            className="form-control input-busqueda-inventario" 
            placeholder="🔍 Buscar producto..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>
      
      <div className="card-body p-4">
        <div className="table-responsive border rounded">
          <table className="table table-bordered table-striped tabla-profesional align-middle mb-0">
            <thead className="table-dark text-center">
              <tr>
                <th style={{ width: '10%' }}>Código</th>
                <th className="text-start" style={{ width: '40%' }}>Producto</th>
                <th style={{ width: '12%' }}>Stock Actual</th>
                <th style={{ width: '12%' }}>Stock Mínimo</th>
                <th style={{ width: '12%' }}>Precio Venta</th>
                <th style={{ width: '14%' }}>Estado</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {inventarioFiltrado.length > 0 ? (
                inventarioFiltrado.map(producto => {
                  const requiereReposicion = producto.stock <= producto.stockMinimo;
                  
                  return (
                    <tr key={producto.id}>
                      <td className="id-columna">
                        #{producto.id.toString().padStart(4, '0')}
                      </td>
                      <td className="text-start fw-bold text-dark">
                        {producto.nombre}
                      </td>
                      <td>
                        <span className={`fs-6 fw-bold ${requiereReposicion ? 'text-danger' : 'text-dark'}`}>
                          {producto.stock}
                        </span>
                      </td>
                      <td className="text-muted fw-semibold">
                        {producto.stockMinimo}
                      </td>
                      <td className="fw-semibold">
                        S/ {producto.precio.toFixed(2)}
                      </td>
                      <td>
                        <span className={`badge ${requiereReposicion ? 'bg-danger' : 'bg-dark'} badge-estado`}>
                          {requiereReposicion ? 'Reposición' : 'Óptimo'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted fw-semibold fs-5">
                    No se encontraron productos que coincidan con "{busqueda}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}