import React from 'react'
import { Outlet } from 'react-router-dom';
import {Header , Footer } from "./index"

function Layout() {
  return (
   <>
   <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto ">
        <Outlet /> {/* This is where nested routes will render */}
      </main>
      <Footer />
    </div>
   
   </>
  )
}

export default Layout