import { Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/footer/footer'
import Header from './components/header/Header'
import Home from './components/home/Home'
import CreatePost from './components/create-post/CreatePost'
import Login from './components/login/Login'
import Catalog from './components/catalog/Catalog'
import Register from './components/register/Register'

function App() {
  return (
    <>
      <Header />

    <main id='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/properties' element={<Catalog />} />
          <Route path='/properties/create' element={<CreatePost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
    </main>
      

      <Footer />
    </>
  )
}

export default App
