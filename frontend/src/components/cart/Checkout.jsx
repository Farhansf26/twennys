import React from 'react';
import { Link } from 'react-router-dom';

const Chekout = ({ shipping, confirmOrder, payment }) => {
  return (
    <>
      <div className="checkout-progress d-flex justify-content-center mt-4 ">

        {shipping ? (
          <Link
            to="/shipping"
            className="float-right"
          >
            <div className="triangle2-active"></div>
            <div className="step active-step">Pengiriman</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link
            to="#!"
            className="float-right"
            disabled
          >
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Pengiriman</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {confirmOrder ? (
          <Link
            to="/confirm_order"
            className="float-right"
          >
            <div className="triangle2-active"></div>
            <div className="step active-step">Konfirmasi Pesanan</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link
            to="#!"
            className="float-right"
            disabled
          >
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Konfirmasi Pesanan</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}

        {payment ? (
          <Link
            to="/payment_method"
            className="float-right"
          >
            <div className="triangle2-active"></div>
            <div className="step active-step">Pembayaran</div>
            <div className="triangle-active"></div>
          </Link>
        ) : (
          <Link
            to="#!"
            className="float-right"
            disabled
          >
            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Pembayaran</div>
            <div className="triangle-incomplete"></div>
          </Link>
        )}
      </div>
    </>
  );
}

export default Chekout;
