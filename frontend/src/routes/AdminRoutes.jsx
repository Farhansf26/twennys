import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../components/admin/Dashboard';
import ListOrders from '../components/admin/ListOrders';
import ListProducts from '../components/admin/ListProducts';
import ListUsers from '../components/admin/ListUser';
import ProcessOrder from '../components/admin/ProcessOrder';
import ProductReviews from '../components/admin/ProductReviews';
import UpdateProduct from '../components/admin/UpdateProduct';
import UpdateUser from '../components/admin/UpdateUser';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AdminRoutes = () => {
  return (
    <>
      <Route path='/admin/dashboard' element={
        <ProtectedRoute admin={true}>
          <Dashboard/>
        </ProtectedRoute>
      }/>

      <Route path='/admin/products' element={
        <ProtectedRoute admin={true}>
          <ListProducts/>
        </ProtectedRoute>
      }/>

      <Route path='/admin/products/:id' element={
        <ProtectedRoute admin={true}>
          <UpdateProduct/>
        </ProtectedRoute>
      }/>

      <Route path='/admin/orders' element={
        <ProtectedRoute admin={true}>
          <ListOrders/>
        </ProtectedRoute>
      }/>

      <Route path='/admin/orders/:id' element={
        <ProtectedRoute admin={true}>
          <ProcessOrder/>
        </ProtectedRoute>
      }/>

      <Route path='/admin/users' element={
        <ProtectedRoute admin={true}>
          <ListUsers/>
        </ProtectedRoute>
      }/>

      <Route path="/admin/users/:id" element={
        <ProtectedRoute admin={true}>
          <UpdateUser/>
        </ProtectedRoute>
      }/>

      <Route path="/admin/reviews" element={
        <ProtectedRoute admin={true}>
          <ProductReviews/>
        </ProtectedRoute>
      }/>
    </>
  );
}

export default AdminRoutes;
