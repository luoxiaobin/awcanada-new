import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import EligibilityQuiz from './components/EligibilityQuiz';
import SocialMedia from './components/SocialMedia';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <ServicesGrid />
        <EligibilityQuiz />
        <SocialMedia />
      </main>
      
      <footer style={{ backgroundColor: '#002244', color: 'white', padding: '3rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: '#d4af37', marginBottom: '1rem' }}>Allied Immigration</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>Member of CICC | info@awcanada.com</p>
          <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>
            &copy; {new Date().getFullYear()} Allied Immigration. All rights reserved. Mockup demonstration.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
