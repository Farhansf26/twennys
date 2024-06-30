import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMyOrdersQuery } from '../../redux/api/orderApi';
import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/slices/cartSlice.js'

const MyOrders = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, isLoading, error } = useMyOrdersQuery()

  const [searchParams] = useSearchParams()

  const orderSuccess = searchParams.get("order_success")

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message)
    }

    if(orderSuccess){
      dispatch(clearCart())
      navigate('/me/orders')
    }
  }, [error, orderSuccess])

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Harga',
          field: 'amount',
          sort: 'asc'
        },
        {
          label: 'Status Pembayaran',
          field: 'status',
          sort: 'asc'
        },
        {
          label: 'Status Pesanan',
          field: 'orderStatus',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc'
        }
      ],
      rows: []
    }

    data?.orders?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        amount: `Rp ${order?.totalAmount?.toLocaleString('id-ID', 
        { style: 'decimal', minimumFractionDigits: 0 })}`,
        status: order?.paymentInfo?.status,
        orderStatus: order?.orderStatus,
        actions: <>
          <Link to={`/me/order/${order?._id}`} className='btn btn-primary'><i className='fa fa-eye'></i></Link>
          <Link to={`/invoice/order/${order?._id}`} className='btn btn-success ms-2'><i className='fa fa-print'></i></Link>
        </>
      })
    })

    return orders
  }

  if(isLoading) return <Loader/>

  return (
    <div>
      <MetaData title={'My Orders'}/>
      <h1 className='my-5'>{data?.orders?.length} Pesanan</h1>

      <MDBDataTable
        data={setOrders()}
        className='px-3'
        bordered
        striped
        hover
      />
    </div>
  );
}

export default MyOrders;
