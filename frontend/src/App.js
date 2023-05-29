import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import Highlights from "./screens/Highlights";
import LikedScreen from './screens/LikedScreen';



const App = () => {
  return (
    <Router>
    <Header/>
    <div>
      <br/>
      <br/>
      <br/>
      <br/>y
    </div>
      <main>
        <div className="paddings">
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/liked" element={<LikedScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/highlight/:id/:index" element={<Highlights />} />
            <Route path="liked/highlight/:id/:index" element={<Highlights />} />
            <Route path="/cart/:id" exact element={<CartScreen />} />
            <Route path="/cart/" element={<CartScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id" element={<UserEditScreen />} />
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
            <Route
              path="/admin/products/:id/edit"
              element={<ProductEditScreen />}
            />
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
