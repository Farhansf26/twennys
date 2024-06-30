import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { useOrderDetailsQuery } from '../../redux/api/orderApi';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

const OrderDetails = () => {

  const params = useParams()
  const {data, isLoading, error} = useOrderDetailsQuery(params?.id)
  const order = data?.order || {}

  const { shippingInfo, orderItems, paymentInfo, user, totalAmount, orderStatus } = order

  const isPaid = paymentInfo?.status === 'Sudah Dibayar' ? true : false

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message)
    }
  }, [error])

  if(isLoading) return <Loader/>

  return (
    <>
      <MetaData title={'Order Details'}/>
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-9 mt-5 order-details">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-5 mb-4">Detail Pesanan</h3>
            <Link className="btn btn-success" to={`/invoice/order/${order?._id}`}>
              <i className="fa fa-print"></i> Invoice
            </Link>
          </div>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{order?._id}</td>
              </tr>
              <tr>
                <th scope="row">Status Pesanan</th>
                <td className={String(orderStatus).includes('Sudah Diterima') ? "greenColor" : 'redColor'}>
                  <b>{orderStatus}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Tanggal</th>
                <td>{new Date(order?.createdAt).toLocaleString('id-ID')}</td>
              </tr>
            </tbody>
          </table>
    
          <h3 className="mt-5 mb-4">Informasi Pengiriman</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Nama</th>
                <td>{user?.name}</td>
              </tr>
              <tr>
                <th scope="row">Nomor Telepon</th>
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
    
          <h3 className="mt-5 mb-4">Informasi Pembayaran</h3>
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
                <th scope="row">Total</th>
                <td>
                  Rp {totalAmount.toLocaleString('id-ID', 
                  { style: 'decimal', minimumFractionDigits: 0 })}
                </td>
              </tr>
            </tbody>
          </table>
    
          <h3 className="mt-5 my-4">Barang Yang Dipesan:</h3>
    
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
      </div>
    </>
  );
}

export default OrderDetails;
