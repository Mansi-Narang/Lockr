import DashboardNavbar from "../dashboard/Navbar.jsx";
import { Outlet } from "react-router";
import { Toaster } from 'react-hot-toast'

function DashboardLayout() {
    return ( 
        <>
        <DashboardNavbar/>
        <Toaster toastOptions={{
        style : {
          background: '#f0f4ff',
          color: '#312e81',
          border: '1px solid #e0e0e0',
          padding: '12px 16px',
          fontWeight: '500',
          fontSize: '14px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
        }
      }}></Toaster>
        <main><Outlet/></main>
        </>
     );
}

export default DashboardLayout;