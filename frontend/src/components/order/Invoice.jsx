import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData';
import './Invoice.css'
import twenny_logo from '../../assets/twennys_logo.png'
import { useParams } from 'react-router-dom';
import { useOrderDetailsQuery } from '../../redux/api/orderApi';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

const Invoice = () => {

  const params = useParams()
  const {data, isLoading, error} = useOrderDetailsQuery(params?.id)
  const order = data?.order || {}

  const { shippingInfo, orderItems, paymentInfo, user, totalAmount, orderStatus } = order

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message)
    }
  }, [error])

  const handleDownload = () => {
    const input = document.getElementById('order_invoice')
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png')

        const pdf = new jsPDF()

        const pdfWidth = pdf.internal.pageSize.getWidth()
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 0)
        pdf.save(`Invoice_${order?._id}.pdf`)
      })
  }

  if(isLoading) return <Loader/>

  return (
    <div>
      <MetaData title={'Order Invoice'}/>
      <div className="order-invoice my-5">
        <div className="row d-flex justify-content-center mb-5">
          <button className="btn btn-success col-md-5" onClick={handleDownload}>
            <i className="fa fa-print"></i> Download Invoice
          </button>
        </div>
        <div id="order_invoice" className="p-3 border border-secondary">
          <header className="clearfix">
            <div id="logo">
              <img src={twenny_logo} alt="Company Logo" />
            </div>
            <h1>INVOICE #{order?._id}</h1>
            <div id="company" className="clearfix">
              <div>Twennys</div>
              <div>
                Jl. Fatmawati Blok A9 No 12
                <br />
                Bogor 16912, Indonesia
              </div>
              <div>0812-1456-2152</div>
              <div>
                <a href="mailto:info@shopit.com">twennysbogor@gmail.com</a>
              </div>
            </div>
            <div id="project">
              <div><span>Nama</span>{user?.name}</div>
              <div><span>Email</span>{user?.email}</div>
              <div><span>Nomor HP</span>{shippingInfo?.phoneNumber}</div>
              <div>
                <span>Alamat</span>
                  {shippingInfo?.address}, {shippingInfo?.city},{' '}
                  {shippingInfo?.zipCode}, {shippingInfo?.country}
              </div>
              <div><span>Waktu</span> {new Date(order?.createdAt).toLocaleString('en-US')}</div>
              <div><span>Status</span>{paymentInfo?.status}</div>
            </div>
          </header>
          <main>
            <table className="mt-5">
              <thead>
                <tr>
                  <th className="service">ID</th>
                  <th className="desc">Nama Barang</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item, i) => (
                  <tr key={i}>
                    <td className="service">{item?.product}</td>
                    <td className="desc">{item?.name}</td>
                    <td className="unit">{Number(item?.price).toLocaleString('id-ID', 
                  { style: 'decimal', minimumFractionDigits: 0 })}</td>
                    <td className="qty">{item?.quantity}</td>
                    <td className="total">Rp. {(item?.price * item?.quantity).toLocaleString('id-ID', 
                  { style: 'decimal', minimumFractionDigits: 0 })}</td>
                  </tr>
                ))}
                

                <tr>
                  <td colSpan="4">
                    <b>Subtotal</b>
                  </td>
                  <td className="total">Rp. {order?.itemsPrice.toLocaleString('id-ID', 
                  { style: 'decimal', minimumFractionDigits: 0 })}</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>PPN 11%</b>
                  </td>
                  <td className="total">Rp. {order?.taxAmount.toLocaleString('id-ID', 
                  { style: 'decimal', minimumFractionDigits: 0 })}</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>Ongkos Kirim</b>
                  </td>
                  <td className="total">Rp. {order?.shippingAmount.toLocaleString('id-ID', 
                  { style: 'decimal', minimumFractionDigits: 0 })}</td>
                </tr>

                <tr>
                  <td colSpan="4" className="grand total">
                    <b>Total Yang Harus Dibayar</b>
                  </td>
                  <td className="grand total">Rp. {order?.totalAmount.toLocaleString('id-ID', 
                  { style: 'decimal', minimumFractionDigits: 0 })}</td>
                </tr>
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
