import React, { useEffect, useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalesChart from './SalesChart'
import { useLazyGetDashboardSalesQuery } from '../../redux/api/orderApi';
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData';

const Dashboard = () => {
  
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());

  const [getDashboardSales, { data, error, isLoading }] = useLazyGetDashboardSalesQuery()

  console.log(data);

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message)
    }

    if(startDate && endDate && !data){
      getDashboardSales({
        startDate: new Date(startDate).toISOString(),
        endDate: endDate.toISOString()
      })
    }
  }, [error])

  const submitHandler = () => {
    getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString()
    })
  }

  if(isLoading) return <Loader />

  return (
    <AdminLayout>
      <MetaData title={'Admin Dashboard'}/>
      <div className="d-flex justify-content-start align-items-center">
        <div className="mb-3 me-4">
          <label className="form-label d-block">Tanggal Awal</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className='form-control'
          />
        </div>
        <div className="mb-3">
          <label className="form-label d-block">Tanggal Akhir</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className='form-control'
          />
        </div>
        <button className="btn fetch-btn ms-4 mt-3 px-5" onClick={submitHandler}>Cari</button>
      </div>

      <div className="row pr-4 my-5">
        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white bg-success o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Hasil Penjualan
                <br />
                <b>Rp. {data?.totalSales.toLocaleString('id-ID', 
                    { style: 'decimal', minimumFractionDigits: 0 })}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white bg-danger o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Jumlah Pesanan
                <br />
                <b>{data?.totalNumOrders}</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SalesChart salesData={data?.sales}/>

      <div className="mb-5"></div>
    </AdminLayout>
  );
}

export default Dashboard;