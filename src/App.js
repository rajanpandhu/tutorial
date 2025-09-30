// File: src/App.js
// Ye main App component hai - sabse important file

import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import logo from './assets/logo.png';

import Home from './components/pages/Home';
import About from './components/pages/About';

function App() {

  
  return (
     <BrowserRouter>
    <div className="App">
      {/* Header Section */}
      <Header 
        logo={logo}
        title="FOOD FIND"
        backgroundColor="#34495e"
        showBorder={true}
        borderColor="#3498db"
       
      />
    <Navigation />
       {/* Main Content with Routes */}
        <main style={{ minHeight: '70vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<About />} />
          </Routes>
        </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#34495e',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <p>© 2024 Tasty Bites Restaurant | Made with React ⚛️</p>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;