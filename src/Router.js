import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Login from './pages/Login/Login';
import Oauth from './pages/Login/Oauth';
import Signup from './pages/Login/Signup';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import PayResult from './pages/Pay/PayResult';
import Pay from './pages/Pay/Pay';
import MyPage from './pages/Mypage/MyPage';
import MyOrder from './pages/Mypage/MyOrder';
import MyProfile from './pages/Mypage/MyProfile';
import Like from './pages/Like/Like';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth" element={<Oauth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/payResult" element={<PayResult />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/order" element={<MyOrder />} />
        <Route path="/mypage/info" element={<MyProfile />} />
        <Route path="/mypage/like" element={<Like />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
