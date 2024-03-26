import { useContext, useState } from "react";
import style from "./PopularesCard.module.css";
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from "react-router-dom";
import CarritoContext from "../carritoContext/CarritoContext";


const PopularesCard = ({producto}) => {
  const { carrito, setCarrito } = useContext(CarritoContext);
  const [unidades, setUnidades] = useState(1);
  const subtotal = unidades * producto.precio;

  const handleChange = (e) => {
      const value = e.target.value;
      setUnidades(value);
  }

  const agregarAlCarrito = async () => {
    const productoCarrito = {
      id: producto.id,
      name: producto.name,
      imagen: producto.imagen,
      unidades: unidades,
      subtotal: subtotal,
      precio: producto.precio,
    }
  
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    carrito.push(productoCarrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    setCarrito(carrito);
  }


      const nombreProducto = producto?.name.toUpperCase();

  return (
    
      <div className={style.container}>

        <Link to={`/producto/${producto.id}`} className={style.link}>
          <div className={style.imgContainer}>
            <img src={producto.imagen} alt={producto.name}/>
          </div> 
        </Link>    
        <div className={style.txt}>
          <h3>{nombreProducto}</h3>
          <p className={style.detalle}>{producto.detalle}</p>    
          <p className={style.stock}>Stock disponible: <span>{producto.cantidad}</span></p>
          <p className={style.precio}><span className={style.precioNumero}>${producto.precio}</span></p> 
          <div className={style.botonAgregar}>
            <div className={style.unidades}>
              <label>Cantidad:</label>
              <select onChange={handleChange}>
            {[...Array(20).keys()].map((value, index) => 
          <option key={index} value={value + 1}>
            {value + 1} {value === 0 ? 'unidad' : 'unidades'}
          </option>
        )}
            </select> 
            </div>
              <button className={style.botonKart} onClick={agregarAlCarrito}><FaShoppingCart className={style.icon}/>AGREGAR AL CARRITO</button>  
              </div>
        </div>
    </div>
  );
};

export default PopularesCard;