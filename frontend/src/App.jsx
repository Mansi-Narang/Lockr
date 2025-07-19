import Footer from './landingPage/Footer'
import Home from './landingPage/Home'
import Navbar from './landingPage/navbar'
import Signup from './components/Signup'
import LogIn from './components/LogIn'
import {BrowserRouter, Routes, Route} from "react-router"
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './landingPage/context/authContext'
import ProtectedRoute from './landingPage/context/ProtectedRoute'

function App() {

  return (
    <>
      <BrowserRouter>
      <AuthProvider>
      <Navbar/>
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
      <Routes>
        <Route index element = 
        {<ProtectedRoute>
            <Home/>
        </ProtectedRoute>} />
        <Route path='/signup' element = {<Signup/>} />
        <Route path='login' element = {<LogIn />} />
      </Routes>
      <Footer/>
      </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
