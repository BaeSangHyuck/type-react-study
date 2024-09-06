import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style/App.css';
import React from 'react';
import Signup from './component/Signup.tsx';
import Header from './component/Header.tsx';
import MainPage from './component/MainPage.tsx';
import Login from './component/Login.tsx';
import MyPage from './component/MyPage.tsx';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Header />
       <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main/:email" element={<MainPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my/:email" element={<MyPage />} />
       </Routes>
    </div>
 </BrowserRouter>
  );
}

export default App;
