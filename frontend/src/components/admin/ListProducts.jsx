import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useGetAdminProductsQuery } from '../../redux/api/productApi';
import AdminLayout from '../layout/AdminLayout';

const ListProducts = () => {
  const { data, isLoading, error } = useGetAdminProductsQuery()


  useEffect(() => {
    if(error){
      toast.error(error?.data?.message)
    }
  }, [error])

  const setProducts = () => {
    const products = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Nama Produk',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Stock',
          field: 'stock',
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

    data?.products?.forEach((product) => {
      products?.rows.push({
        id: product?._id,
        name: `${product?.name?.substring(0, 35)}...`,
        stock: product?.stock,
        actions: <>
          <Link to={`/admin/products/${product?._id}`} className='btn btn-outline-primary'><i className='fa fa-pencil'></i></Link>
        </>
      })
    })

    return products
  }

  if(isLoading) return <Loader/>

  return (
    <AdminLayout>
      <MetaData title={'All Products'}/>
      <h1 className='my-5'>{data?.products?.length} Products</h1>

      <MDBDataTable
        data={setProducts()}
        className='px-3'
        bordered
        striped
        hover
      />
    </AdminLayout>
  );
}

export default ListProducts;
