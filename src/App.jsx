import { useState } from 'react';
import Navbar from './componentes/Navbar';
import RegistroVentas from './componentes/RegistroVentas';
import AlertasInventario from './componentes/AlertasInventario';
import TablaInventario from './componentes/TablaInventario';

function App() {
  const [vistaActiva, setVistaActiva] = useState('ventas'); 

  // Inventario ampliado con medicamentos y productos de farmacia
  const [inventario, setInventario] = useState([
    { id: 1, nombre: 'Paracetamol 500mg (Caja)', stock: 15, stockMinimo: 20, precio: 1.50 },
    { id: 2, nombre: 'Amoxicilina 500mg', stock: 50, stockMinimo: 10, precio: 3.20 },
    { id: 3, nombre: 'Ibuprofeno 400mg', stock: 4, stockMinimo: 15, precio: 2.00 },
    { id: 4, nombre: 'Alcohol en gel 500ml', stock: 8, stockMinimo: 10, precio: 5.50 },
    { id: 5, nombre: 'Panadol 500mg (Blister)', stock: 30, stockMinimo: 15, precio: 2.50 },
    { id: 6, nombre: 'Diclofenaco en gel', stock: 5, stockMinimo: 8, precio: 12.00 },
    { id: 7, nombre: 'Vendas elásticas', stock: 0, stockMinimo: 5, precio: 4.00 },
    { id: 8, nombre: 'Loratadina 10mg', stock: 45, stockMinimo: 15, precio: 1.20 },
    { id: 9, nombre: 'Azitromicina 500mg', stock: 12, stockMinimo: 20, precio: 8.50 },
    { id: 10, nombre: 'Omeprazol 20mg', stock: 8, stockMinimo: 25, precio: 1.00 },
    { id: 11, nombre: 'Vitamina C 1000mg', stock: 60, stockMinimo: 15, precio: 2.50 },
    { id: 12, nombre: 'Sal de Andrews (Sobre)', stock: 120, stockMinimo: 40, precio: 0.50 },
    { id: 13, nombre: 'Agua Oxigenada 120ml', stock: 6, stockMinimo: 12, precio: 3.50 },
    { id: 14, nombre: 'Algodón 100g', stock: 35, stockMinimo: 10, precio: 4.50 },
    { id: 15, nombre: 'Gasa Estéril 10x10cm', stock: 15, stockMinimo: 30, precio: 1.20 },
    { id: 16, nombre: 'Jeringa 5ml', stock: 200, stockMinimo: 50, precio: 0.80 },
    { id: 17, nombre: 'Naproxeno 550mg', stock: 40, stockMinimo: 15, precio: 3.00 },
    { id: 18, nombre: 'Termómetro Digital', stock: 3, stockMinimo: 10, precio: 15.00 }
  ]);

  return (
    <div className="min-vh-100 bg-light">
      <Navbar vista={vistaActiva} setVista={setVistaActiva} />
      
      <div className="container mt-4 mb-5">
        
        {vistaActiva === 'ventas' ? (
          <div className="row g-4">
            <div className="col-lg-8">
              <RegistroVentas inventario={inventario} setInventario={setInventario} />
            </div>
            <div className="col-lg-4">
              <AlertasInventario productos={inventario} />
            </div>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-12">
              <TablaInventario inventario={inventario} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;