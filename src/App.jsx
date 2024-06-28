import { Route, Routes } from 'react-router-dom';
import Homepage from './component/Homepage/Homepage';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import Cart from './component/Cart/Cart';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>

  )
}

export default App;
