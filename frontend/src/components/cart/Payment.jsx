import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { calculateOrderCost } from '../../assets/helper';
import { useCreateNewOrderMutation } from '../../redux/api/orderApi';
import MetaData from '../layout/MetaData';
import Checkout from './Checkout';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const Payment = () => {

  const [method, setMethod] = useState('')
  const navigate = useNavigate()

  const { shippingInfo, cartItems } = useSelector(state => state.cart)

  const [createNewOrder, { isLoading, error, isSuccess }] = useCreateNewOrderMutation()

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message)
    }

    if(isSuccess){
      navigate('/me/orders?order_success=true')
    }
  }, [error, isSuccess])

  const submitHandler = (e) => {
    e.preventDefault()

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateOrderCost(cartItems)

    if(method === 'COD'){
      const orderData = {
        orderItems: cartItems,
        shippingInfo,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: 'Belum Dibayar'
        },
        paymentMethod: 'COD'
      }
      console.log(orderData)

      createNewOrder(orderData)
    } 
  }

  return (
    <div>
      <MetaData title={'Payment Method'}/>
      <Checkout shipping confirmOrder payment/>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4">Pilih Metode Pembayaran</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={(e) => setMethod('COD')}
              />
              <label className="form-check-label" htmlFor="codradio">
                Cash on Delivery
              </label>
            </div>

            <button id="shipping_btn" type="submit" className="btn py-2 w-100">
              Lanjut
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
