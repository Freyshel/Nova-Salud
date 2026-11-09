import { useState } from 'react';
import './RegistroVentas.css';

export default function RegistroVentas({ inventario, setInventario }) {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  const agregarProducto = () => {
    if (!busqueda.trim()) return;
    const producto = inventario.find(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase().trim()));
    
    if (!producto) return alert("Producto no encontrado. Revisa el nombre.");
    if (producto.stock === 0) return alert("El producto no tiene stock disponible.");

    const itemEnCarrito = carrito.find(item => item.id === producto.id);
    const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    if (cantidadActual + 1 > producto.stock) {
      return alert("No hay suficiente stock para agregar más unidades.");
    }

    if (itemEnCarrito) {
      setCarrito(carrito.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    setBusqueda('');
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    const productoOriginal = inventario.find(p => p.id === id);
    if (nuevaCantidad > productoOriginal.stock) {
       alert(`Solo hay ${productoOriginal.stock} unidades en stock.`);
       return;
    }
    if (nuevaCantidad <= 0) return;
    setCarrito(carrito.map(item => item.id === id ? { ...item, cantidad: parseInt(nuevaCantidad) } : item));
  };

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  const procesarVenta = () => {
    if (carrito.length === 0) return alert("Agregue productos primero.");
    const nuevoInventario = inventario.map(prodInv => {
      const prodComprado = carrito.find(c => c.id === prodInv.id);
      return prodComprado ? { ...prodInv, stock: prodInv.stock - prodComprado.cantidad } : prodInv;
    });
    setInventario(nuevoInventario);
    setCarrito([]);
    alert("¡Venta procesada con éxito! El inventario se ha actualizado.");
  };

  return (
    <div className="card tarjeta-ventas h-100">
      <div className="card-header bg-white pt-4 pb-3 border-bottom-0">
        <h4 className="text-primary fw-bold mb-0">Registro de Ventas</h4>
      </div>
      <div className="card-body px-4">
        <div className="input-group mb-4">
          <input 
            type="text" 
            className="form-control input-busqueda" 
            placeholder="Buscar medicamento (Ej: Panadol)..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            list="lista-inventario"
          />
          <datalist id="lista-inventario">
            {inventario.map(p => <option key={p.id} value={p.nombre} />)}
          </datalist>
          <button className="btn btn-primary btn-buscar" type="button" onClick={agregarProducto}>
            Buscar y Agregar
          </button>
        </div>

        <div className="table-responsive" style={{ minHeight: '220px' }}>
          <table className="table table-borderless align-middle tabla-custom">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio Unit.</th>
                <th style={{width: '120px'}}>Cant.</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carrito.map(item => (
                <tr key={item.id} className="border-bottom">
                  <td className="fw-semibold text-dark">{item.nombre}</td>
                  <td className="text-muted">S/ {item.precio.toFixed(2)}</td>
                  <td>
                    <input 
                      type="number" 
                      className="form-control form-control-sm text-center rounded-pill" 
                      value={item.cantidad}
                      onChange={(e) => cambiarCantidad(item.id, e.target.value)}
                    />
                  </td>
                  <td className="fw-bold text-dark">S/ {(item.precio * item.cantidad).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-sm btn-danger rounded-circle shadow-sm" onClick={() => eliminarDelCarrito(item.id)}>
                      <i className="bi bi-x-lg"></i> X
                    </button>
                  </td>
                </tr>
              ))}
              {carrito.length === 0 && (
                <tr><td colSpan="5" className="text-center text-muted py-5">Escanea o busca un producto para comenzar</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4 p-4 resumen-venta">
          <div className="d-flex flex-column">
            <span className="text-muted text-uppercase fw-bold" style={{fontSize: '0.8rem'}}>Total a Pagar</span>
            <h2 className="mb-0 text-success fw-bolder">S/ {total.toFixed(2)}</h2>
          </div>
          <button className="btn btn-success btn-lg px-5 btn-cobrar" onClick={procesarVenta}>
            Procesar Venta
          </button>
        </div>
      </div>
    </div>
  );
}