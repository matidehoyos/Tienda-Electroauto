import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/home/Home'
import AdminWindow from './pages/adminWindow/AdminWindow'
import Usuarios from './components/adminUtil/usuarios/Usuarios'
import Tienda from './pages/tienda/Tienda'
import ContactUs from './pages/contactUs/ContactUs'
import Productos from './components/productos/Productos'
import ProductoDetail from './components/productoDetail/ProductoDetail'
import PostPago from './pages/postPago/PostPago'
import BotonFlotanteCart from './components/botonFlotanteCart/BotonFlotanteCart'
import axios from "axios";
import CarritoContext from './components/carritoContext/CarritoContext';
import { useState } from 'react';
import ScrollToTop from './components/ScrollToTop'
import Kart from './components/kart/Kart'
import NavBar from './components/navBar/NavBar'

 axios.defaults.baseURL = 'https://electrocar-production.up.railway.app'
 //axios.defaults.baseURL = 'http://localhost:3000'


function App() {
  const location = useLocation()
  const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carrito')) || []);

  return (
    <div>
        <CarritoContext.Provider value={{ carrito, setCarrito }} >
        {!location.pathname.startsWith('/admin') && !location.pathname.startsWith('/kart') && <BotonFlotanteCart />}
        {!location.pathname.startsWith('/admin') && !location.pathname.startsWith('/postPago') && <NavBar />}


            <ScrollToTop>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/tienda" element={<Tienda />}></Route>
                    <Route path="/admin/*" element={<AdminWindow />}></Route>
                    <Route path="/users" element={<Usuarios />}></Route>
                    <Route path="/kart" element={<Kart />}></Route>
                    <Route path="/contacto" element={<ContactUs/>}></Route>
                    <Route path="/:nombre" element={<Productos />}></Route> 
                    <Route path="/producto/:id" element={<ProductoDetail />}></Route>
                    <Route path="/successpayment" element={<PostPago />}></Route>
                </Routes>
              </ScrollToTop>
        </CarritoContext.Provider >
    </div>
  )
}

export default App
