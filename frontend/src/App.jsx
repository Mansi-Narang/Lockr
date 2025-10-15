import Home from './landingPage/Home'
import Signup from './components/Signup'
import LogIn from './components/LogIn'
import {BrowserRouter, Routes, Route} from "react-router"
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './context/ProtectedRoute'
import Hero from './dashboard/Hero'
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'

function App() {

  return (
    <>
      <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route element = {<PublicLayout/>}>
            <Route index element = {<Home/>} />
            <Route path='/signup' element = {<Signup/>} />
            <Route path='/login' element = {<LogIn />} />
        </Route>
        <Route element = {<ProtectedRoute><DashboardLayout/></ProtectedRoute>}>
          <Route path='/dashboard' element = {<Hero/>} />
        </Route>
      </Routes>
      </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
