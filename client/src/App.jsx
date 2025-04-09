import { Route, Routes } from 'react-router'

import UserProvider from './providers/UserProvider'

import Footer from './components/footer/footer'
import Header from './components/header/Header'
import Home from './components/home/Home'
import CreatePost from './components/create-post/CreatePost'
import Login from './components/login/Login'
import Catalog from './components/catalog/Catalog'
import Register from './components/register/Register'
import Details from './components/details/Details'
import EditPost from './components/edit-post/EditPost'
import Error from './components/error/Error'
import AuthGuard from './components/guards/AuthGuard'
import './App.css'
import GuestGuard from './components/guards/GuestGuard'
import Logout from './components/logout/Logout'
import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <UserProvider>
      <Header />

      <main id='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/properties/:propertyId/details' element={<Details />} />
          <Route element={<AuthGuard />}>
            <Route path='/properties/create' element={<CreatePost />} />
            <Route path='properties/:propertyId/edit' element={<EditPost />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route element={<GuestGuard />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
      </main>


      <Footer />

      <ToastContainer />


    </UserProvider>
  )
}

export default App
