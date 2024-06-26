import { useContext, useState } from "react";
import style from "./ProductoTiendaCard.module.css";
import { FaShoppingCart } from 'react-icons/fa';
import Modal from 'react-modal';
import CarritoContext from "../carritoContext/CarritoContext";

const ProductoTiendaCard = ({producto}) => {
  const { carrito, setCarrito } = useContext(CarritoContext);
  const [unidades, setUnidades] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false); 
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
        <div onClick={() => setModalIsOpen(true)} className={style.link}> 
          <div className={style.imgContainer}>
            <img src={producto.imagen} alt={producto.name}/>
          </div>   
          <h3>{nombreProducto}</h3>   
          <h4 className={style.precio}><span className={style.precioNumero}>${producto.precio}</span></h4> 
        </div>    
       {/*}
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
          */ }
        <Modal 
        className={style.modal}
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            background: 'rgba(0,0,0,.5)',
              backdropFilter: 'blur(8px)'
          },
          }}
        >
          <div className={style.cerrarModalMobile}>
              <button  onClick={() => setModalIsOpen(false)}>X</button>
          </div>
          <div className={style.imag}>
            <img className={style.imgModal} src={producto.imagen} alt={producto.name}/>
          </div>
          <div className={style.txtDetalle}>
          <div className={style.cerrarModal}>
             <button  onClick={() => setModalIsOpen(false)}>X</button>
          </div>
          <h2  className={style.nameM}>{producto.name}</h2>
          <p  className={style.detalleM}>{producto.detalle}</p>
          <p  className={style.infoM}>{producto.informacion}</p>
          <p  className={style.precioM}>${producto.precio}</p>
          <div className={style.unidadesM}>
            <label>Cantidad:</label>
            <select onChange={handleChange}>
          {[...Array(20).keys()].map((value, index) => 
        <option key={index} value={value + 1}>
          {value + 1} {value === 0 ? 'unidad' : 'unidades'}
        </option>
      )}
          </select> 
          </div>
          <button  className={style.addCartM}  onClick={agregarAlCarrito}>Agregar al carrito</button>
          </div>
          
        </Modal>
      </div>
  );
};

export default ProductoTiendaCard;
