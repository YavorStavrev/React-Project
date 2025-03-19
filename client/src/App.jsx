import { Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/footer/footer'
import Header from './components/header/Header'
import Home from './components/home/Home'
import CreatePost from './components/create-post/CreatePost'

function App() {
  return (
    <>
      <Header />

    <main id='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/properties/create' element={<CreatePost />} />
        </Routes>
    </main>
      

      <Footer />
    </>
  )
}

export default App
