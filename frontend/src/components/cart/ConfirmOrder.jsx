import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { calculateOrderCost } from '../../assets/helper';
import MetaData from '../layout/MetaData';
import Checkout from './Checkout';

const ConfirmOrder = () => {

  const { user } = useSelector(state => state.auth)
  const { cartItems, shippingInfo } = useSelector(state => state.cart)

  const {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
    } = calculateOrderCost(cartItems)

  return (
    <>
      <MetaData title={'Confirm Order'}/>
      <Checkout shipping confirmOrder/>
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Informasi Pengiriman</h4>
          <p><b>Nama: </b>{user?.name}</p>
          <p><b>Nomor Telepon: </b> {shippingInfo?.phoneNumber}</p>
          <p className="mb-4">
            <b>Tujuan Pengiriman: </b> 
              {shippingInfo?.address}, {' '}
              {shippingInfo?.city}, {' '}
              {shippingInfo?.zipCode}, {' '}
              {shippingInfo?.country}
          </p>

          <hr />

          {cartItems?.map((item, i) => (
            <div key={i}>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x {' '}
                      {item.price.toLocaleString('id-ID', 
                      { style: 'decimal', minimumFractionDigits: 0 })} = 
                      <b>
                        {" Rp. "}{(item.quantity * item.price).
                        toLocaleString('id-ID', { style: 'decimal', minimumFractionDigits: 0 })}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}

          
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>Subtotal: <span className="order-summary-values">Rp. {Number(itemsPrice).toLocaleString('id-ID', { style: 'decimal', minimumFractionDigits: 0 })}</span></p>
            <p>Ongkos Kirim: <span className="order-summary-values">Rp. {shippingPrice}</span></p>
            <p>Tax: <span className="order-summary-values">Rp. {Number(taxPrice).toLocaleString('id-ID', { style: 'decimal', minimumFractionDigits: 0 })}</span></p>

            <hr />

            <p>Total: <span className="order-summary-values">Rp. {Number(totalPrice).toLocaleString('id-ID', { style: 'decimal', minimumFractionDigits: 0 })}</span></p>

            <hr />
            <Link to="/payment" id="checkout_btn" className="btn btn-primary w-100">
              Lanjutkan Pembayaran
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmOrder;
