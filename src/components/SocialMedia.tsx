import React from 'react';
import './SocialMedia.css';

const SocialMedia: React.FC = () => {
  return (
    <section className="social-section" id="contact">
      <div className="container social-container">
        <h2 className="social-title">加拿大联合移民</h2>
        <p className="social-subtitle">Member of CICC</p>
        
        <div className="target-icon-container">
          <svg className="target-svg" viewBox="0 0 100 100">
            {/* Target Outer Rings */}
            <circle cx="50" cy="50" r="40" className="target-ring ring-red" />
            <circle cx="50" cy="50" r="30" className="target-ring ring-orange" />
            <circle cx="50" cy="50" r="20" className="target-ring ring-yellow" />
            <circle cx="50" cy="50" r="10" className="target-ring ring-center" />
            {/* Cyan Arrow */}
            <line x1="85" y1="15" x2="52" y2="48" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
            <polygon points="50,50 50,42 58,50" fill="#38bdf8" />
            {/* Arrow fletching */}
            <line x1="85" y1="15" x2="90" y2="10" stroke="#38bdf8" strokeWidth="4" />
            <line x1="80" y1="20" x2="85" y2="25" stroke="#38bdf8" strokeWidth="4" />
          </svg>
        </div>

        <div className="social-grid">
          <div className="social-card">
            <h4>微信</h4>
            <div className="qr-wrapper">
              <img src="/wechat_qr.png" alt="WeChat QR Code" className="qr-image" />
            </div>
          </div>

          <div className="social-card">
            <h4>YouTube频道 (英文)</h4>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="youtube-button">
              <div className="yt-circle">
                <span className="yt-text-top">You</span>
                <span className="yt-text-bottom">Tube</span>
              </div>
            </a>
          </div>

          <div className="social-card">
            <h4>YouTube频道 (中文)</h4>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="youtube-button">
              <div className="yt-circle">
                <span className="yt-text-top">You</span>
                <span className="yt-text-bottom">Tube</span>
              </div>
            </a>
          </div>

          <div className="social-card">
            <h4>WhatsApp</h4>
            <div className="qr-wrapper">
              <img src="/whatsapp_qr.png" alt="WhatsApp QR Code" className="qr-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
