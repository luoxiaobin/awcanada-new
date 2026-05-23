import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1>Your Pathway to a <span className="highlight">New Life</span> in Canada</h1>
        <p>Expert immigration consultation with a proven track record. We guide you through every step of Express Entry, Family Sponsorship, and Study Visas.</p>
        <div className="hero-actions">
          <button className="btn-primary hero-btn">Start Free Assessment</button>
          <button className="btn-outline hero-btn">View Our Services</button>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <h3>10,000+</h3>
            <p>Visas Approved</p>
          </div>
          <div className="stat-item">
            <h3>98%</h3>
            <p>Success Rate</p>
          </div>
          <div className="stat-item">
            <h3>15+ Years</h3>
            <p>Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
