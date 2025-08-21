import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { persistor} from './Store/store'   // 👈 make sure you have store configured
import { PersistGate } from 'redux-persist/integration/react';
import BusIfNot from './Components/Add_Business/AddBusinessPage.jsx'

import App from './App.jsx'
import './App.css'

import { Layout, HomePage, LoginPage, SignupPage, CompanyRegistrationPage, BusinessAccountRegister, CompanyProfilePage } from "./index.js"
import ProfilePage from './pages/userPages/ProfilePage.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>   {/* 👈 wrap your app */}
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="comp-signup" element={<CompanyRegistrationPage />} />
            <Route path="register-business" element={<BusinessAccountRegister />} />
            <Route path="/add-business/:id" element={<BusIfNot />} />
            <Route path="add-business" element={<BusIfNot />} />
             <Route path="user-prof/:id" element={<ProfilePage/>} />
             <Route path='comp-profilepage' element={<CompanyProfilePage />}/>
    </Route>
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)