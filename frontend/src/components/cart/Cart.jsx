import React from 'react';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { setCartItem, removeCartItem } from '../../redux/slices/cartSlice';
import { PiSmileySadDuotone } from "react-icons/pi";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const increaseQty = (item, quantity) => {
    const newQty = quantity + 1

    if(newQty > item?.stock) return
    
    setItemToCart(item, newQty)
  }

  const decreaseQty = (item, quantity) => {
    const newQty = quantity - 1

    if(newQty <= 0) return
    
    setItemToCart(item, newQty)
  }

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty
    }
    dispatch(setCartItem(cartItem))
  }

  const removeCartItemHandler = id => {
    dispatch(removeCartItem(id))
  }

  const checkOutHandler = () => {
    navigate('/shipping')
  }

  return (
    <>
      <MetaData title={'Your Cart'}/>
      {cartItems?.length === 0 ? (
        <h2 className="mt-5">Keranjangmu Kosong <PiSmileySadDuotone/></h2>
      ) : (
        <>
          <div className="row d-flex justify-content-between mt-3">
            <div className="col-12 col-lg-8">
              {cartItems?.map((item, i) => (
                <div key={i}>
                  <hr />
                  <div className="cart-item" data-key="product1">
                    <div className="row cartright">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="60"
                          width="85"
                        />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="col-4 col-lg-2">
                        <p id="card_item_price">Rp. {item.price.toLocaleString('id-ID', { style: 'decimal', minimumFractionDigits: 0 })}</p>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0 cartright">
                        <div className="stockCounter d-inline ">
                          <span className="btn btn-danger minus" onClick={() => decreaseQty(item, item.quantity)}> - </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />
                          <span className="btn btn-primary plus" onClick={() => increaseQty(item, item.quantity)}> + </span>
                        </div>
                      </div>
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i 
                          id="delete_cart_item" 
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandler(item?.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}

            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Pesananmu</h4>
                <hr />
                <p>Jumlah Barang: 
                  <span className="order-summary-values">
                    {cartItems?.reduce((acc, item) => acc + item?.quantity, 0)}{" "}(Unit)
                  </span>
                </p>
                <p>Est. total: 
                  <span className="order-summary-values">
                    Rp. {cartItems?.reduce((acc, item) => acc + item?.quantity * item?.price, 0)
                    .toLocaleString('id-ID', { style: 'decimal', minimumFractionDigits: 0 })}
                  </span>
                </p>
                <hr />
                <button id="checkout_btn" className="btn btn-primary w-100" onClick={checkOutHandler}>
                  Beli
                </button>
              </div>
            </div>
          </div>
            </>
          )}
    </>
  );
}

export default Cart;
