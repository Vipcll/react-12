import ItemCarrito from './ItemCarrito';
import { Link } from "react-router-dom";
import React from "react";
import { useContext } from 'react';
import { CartContext } from "../contenedores/CartContext";
import { db } from "../utils/firebaseConfig";
import { serverTimestamp, setDoc, doc, collection} from "firebase/firestore";

const Cart = () => {
    const { cartList, clear, precioTotal } = useContext(CartContext);

    const crearOrdenDeCompra = async (e) => {
        const itemsFiltrados = cartList.map(producto => (
                    {
                        id : producto.id,
                        title: producto.title,
                        price: producto.price,
                        quantity: producto.cantidad
                    }
                ))
                
                const orden = {
                    buyer : {
                        name : "Luca",
                        phone : "1165461516",
                        email : "lucasegura@gmail.com"
                    },
                    items : itemsFiltrados,
                    date : serverTimestamp(),
                    total : precioTotal(),
                }
                const newOrderRef = doc(collection(db, "orders"))
                await setDoc(newOrderRef, orden)
                }
    return (


        <div className="contenedor-carrito">
            <h1>Carrito</h1>
            {
            (cartList.length == 0)
            ?
            <div className="carritoVacio">
                <p>El carrito está vacío. Visita la&nbsp;</p>
                <Link to="/">página principal</Link>
                <p>&nbsp;para ver todas nuestras ofertas</p>
            </div>
            :
            <>
            <div className="carrito">
                {
                cartList.map( item =>
                    <ItemCarrito
                    key = {item.id}
                    id = {item.id}
                    img = {item.img}
                    title = {item.title}
                    cantidad = {item.cantidad}
                    price = {item.price}
                    />
                )
                }
            </div>
            <div className="divFinalizarCompra">
                <p>Total: ${precioTotal()}</p>
                <div>
                    <button className="botonComprar" onClick={(e) => crearOrdenDeCompra(e)}>Finalizar compra</button>
                    <button className="botonBorrar" onClick={clear}>Vaciar carrito</button>
                </div>
            </div>
            </>
            }
        </div>
    )
}

export default Cart;