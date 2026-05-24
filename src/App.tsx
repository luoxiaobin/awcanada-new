import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import EligibilityQuiz from './components/EligibilityQuiz';
import SocialMedia from './components/SocialMedia';
import './index.css';

const App: React.FC = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-bg font-sans">
      <Navbar onOpenQuiz={() => setQuizOpen(true)} />
      <main>
        <Hero onOpenQuiz={() => setQuizOpen(true)} />
        <ServicesGrid />
        <SocialMedia />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-brand-amber font-bold text-lg mb-3">Allied Immigration</h3>
              <p className="text-slate-400 text-sm mb-2">CICC Certified Consultancy</p>
              <a href="mailto:info@awcanada.com" className="text-slate-400 text-sm hover:text-brand-amber transition-colors duration-200">
                info@awcanada.com
              </a>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-2">
                {['Express Entry', 'Family Sponsorship', 'Study Visas', 'Work Permits'].map(s => (
                  <li key={s}>
                    <a href="#services" className="text-slate-400 text-sm hover:text-brand-amber transition-colors duration-200">{s}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="mailto:info@awcanada.com" className="hover:text-brand-amber transition-colors duration-200">Email us</a></li>
                <li>WeChat (scan QR above)</li>
                <li>WhatsApp (scan QR above)</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Allied Immigration. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA — hidden on md+ */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-slate-100 shadow-lg px-4 py-3 z-30">
        <div className="flex gap-3">
          <a
            href="#contact"
            className="flex-1 py-3 rounded-full border-2 border-brand-navy text-brand-navy font-semibold text-sm text-center hover:bg-brand-navy hover:text-white transition-all duration-200"
          >
            💬 Chat with Us
          </a>
          <button
            onClick={() => setQuizOpen(true)}
            className="flex-1 py-3 rounded-full bg-brand-amber text-white font-semibold text-sm hover:bg-amber-500 transition-all duration-200"
          >
            ✅ Free Assessment
          </button>
        </div>
      </div>

      {/* Quiz Modal */}
      <EligibilityQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
};

export default App;
