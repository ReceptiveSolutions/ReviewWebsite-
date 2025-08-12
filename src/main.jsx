import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './App.css'; //

import {Layout, HomePage, LoginPage, SignupPage} from "./index.js"

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={< Layout/>}>
       <Route index element={<HomePage/>} />
       <Route path="login" element={<LoginPage/>} />
       <Route path="signup" element={<SignupPage/>} />


    </Route>
   </Routes>
   </BrowserRouter>
  </React.StrictMode>,
)
