import Nav from './component/Nav';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './component/Footer';
import SignUP from './component/SignUP';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<h1>Product Listing Component</h1>} />
        <Route path="/add" element={<h1>Add Product Component</h1>} />
        <Route path="/update" element={<h1>Update Product Component</h1>} />
        <Route path="/logout" element={<h1> Logout Component</h1>} />
        <Route path="/profile" element={<h1> Proile Component</h1>} />
        <Route path="/signup" element={<SignUP />} />
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
