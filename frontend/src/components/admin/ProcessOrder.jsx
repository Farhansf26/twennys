import React, { useEffect, useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useOrderDetailsQuery, useUpdateOrderMutation } from '../../redux/api/orderApi';

const ProcessOrder = () => {

  const [status, setStatus] = useState('')

  const params = useParams()
  const {data} = useOrderDetailsQuery(params?.id)
  const order = data?.order || {}

  const [updateOrder, { error, isSuccess }] = useUpdateOrderMutation()

  const { shippingInfo, orderItems, paymentInfo, user, totalAmount, orderStatus } = order

  const isPaid = paymentInfo?.status === 'Sudah Dibayar' ? true : false

  useEffect(() => {
    if(orderStatus){
      setStatus(orderStatus)
    }
  }, [orderStatus])

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message)
    }

    if(isSuccess){
      toast.success('Order Updated')
    }
  }, [error, isSuccess])

  const updateOrderHandler = (id) => {
    const data = { status }

    updateOrder({ id, body: data })
  }

  return (
    <AdminLayout>
      <MetaData title={'Process Order'}/>
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-8 order-details">
          <h3 className="mt-5 mb-4">Order Details</h3>

          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{order?._id}</td>
              </tr>
              <tr>
                <th scope="row">Order Status</th>
                <td className={String(orderStatus).includes('Sudah Diterima') ? "greenColor" : 'redColor'}>
                  <b>{orderStatus}</b>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Shipping Info</h3>
          <table className="table table-striped table-bordered">
          <tbody>
              <tr>
                <th scope="row">Nama</th>
                <td>{user?.name}</td>
              </tr>
              <tr>
                <th scope="row">Nomor Telpon</th>
                <td>{shippingInfo?.phoneNumber}</td>
              </tr>
              <tr>
                <th scope="row">Alamat</th>
                <td>{shippingInfo?.address}, {shippingInfo?.city}, 
                  {' '}{shippingInfo?.zipCode}, {shippingInfo?.country}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Payment Info</h3>
          <table className="table table-striped table-bordered">
          <tbody>
              <tr>
                <th scope="row">Status Pembayaran</th>
                <td className={isPaid ? 'greenColor' : 'redColor'}>
                  <b>{paymentInfo?.status}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Metode Pembayaran</th>
                <td>{order?.paymentMethod}</td>
              </tr>
              <tr>
                <th scope="row">Stripe ID</th>
                <td>{paymentInfo?.id || '-'}</td>
              </tr>
              <tr>
                <th scope="row">Total</th>
                <td>
                  Rp {totalAmount?.toLocaleString('id-ID', 
                  { style: 'decimal', minimumFractionDigits: 0 })}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 my-4">Order Items:</h3>

          <hr />
          <div className="cart-item my-1">
            {orderItems?.map((item, i) => (
              <div key={i} className="row my-5">
                <div className="col-4 col-lg-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    height="45"
                    width="65"
                  />
                </div>
      
                <div className="col-5 col-lg-5">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </div>
      
                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>Rp {Number(item.price).toLocaleString('id-ID', 
                    { style: 'decimal', minimumFractionDigits: 0 })}
                  </p>
                </div>
      
                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p>{item.quantity} Buah</p>
                </div>
              </div>
            ))}
          </div>
          <hr />
        </div>

        <div className="col-12 col-lg-3 mt-5">
          <h4 className="my-4">Status</h4>

          <div className="mb-3">
            <select className="form-select" 
              name="status" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Diproses">Diproses</option>
              <option value="Dalam Perjalanan">Dalam Perjalanan</option>
              <option value="Sudah Diterima">Sudah Diterima</option>
            </select>
          </div>

          <button 
            className="btn btn-primary w-100"
            onClick={() => updateOrderHandler(order?._id)}
            >
            Update Status
          </button>

          <h4 className="mt-5 mb-3">Order Invoice</h4>
          <Link to={`/invoice/order/${order?._id}`} className="btn btn-success w-100">
            <i className="fa fa-print"></i> Generate Invoice
          </Link>
        </div>
      </div>
      </AdminLayout>
  );
}

export default ProcessOrder;
