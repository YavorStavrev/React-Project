import { Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/footer/footer'
import Header from './components/header/Header'
import Home from './components/home/Home'
import CreatePost from './components/create-post/CreatePost'
import Login from './components/login/Login'
import Catalog from './components/catalog/Catalog'
import Register from './components/register/Register'
import { useState } from 'react'
import Details from './components/details/Details'
import EditPost from './components/edit-post/EditPost'
import Error from './components/error/Error'

function App() {
  const [email, setEmail] = useState('');

  const userLoginHandler = (email) => {
    setEmail(email);
  };

  return (
    <>
      <Header />

    <main id='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/properties/create' element={<CreatePost />} />
          <Route path='/properties/:propertyId/details' element={<Details email={email}/>} />
          <Route path='properties/:propertyId/edit' element={<EditPost />} />
          <Route path='/login' element={<Login onLogin={userLoginHandler}/>} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Error />}/>
        </Routes>
    </main>
      

      <Footer />
    </>
  )
}

export default App
