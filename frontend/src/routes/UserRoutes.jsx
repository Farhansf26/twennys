import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Signup from '../components/auth/Signup';
import Cart from '../components/cart/Cart';
import ConfirmOrder from '../components/cart/ConfirmOrder';
import Payment from '../components/cart/Payment';
import Shipping from '../components/cart/Shipping';
import Home from '../components/Home';
import Invoice from '../components/order/Invoice';
import MyOrders from '../components/order/MyOrder';
import OrderDetails from '../components/order/OrderDetail';
import ProductDetail from '../components/product/ProductDetail';
import Profile from '../components/Profile';

const UserRoutes = () => {
  return (
    <>
      <Route path='/' element={<Home/>}/>
      <Route path='/products/:id' element={<ProductDetail/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>

      <Route path='/me' element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      }/>

      <Route path='/cart' element={<Cart/>}/>

      <Route path='/shipping' element={
        <ProtectedRoute>
          <Shipping/>
        </ProtectedRoute>
      }/>

      <Route path='/confirm_order' element={
        <ProtectedRoute>
          <ConfirmOrder/>
        </ProtectedRoute>
      }/>

      <Route path='/payment' element={
        <ProtectedRoute>
          <Payment/>
        </ProtectedRoute>
      }/>

      <Route path='/me/orders' element={
        <ProtectedRoute>
          <MyOrders/>
        </ProtectedRoute>
      }/>

      <Route path='/me/order/:id' element={
        <ProtectedRoute>
          <OrderDetails/>
        </ProtectedRoute>
      }/>

      <Route path='/invoice/order/:id' element={
        <ProtectedRoute>
          <Invoice/>
        </ProtectedRoute>
      }/>
    </>
  );
}

export default UserRoutes;
