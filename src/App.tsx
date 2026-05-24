import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import EligibilityQuiz from './components/EligibilityQuiz';
import SocialMedia from './components/SocialMedia';
import { useLang } from './contexts/LanguageContext';
import './index.css';

const year = new Date().getFullYear();

const t = {
  zh: {
    cicc: 'CICC认证移民顾问',
    servicesHeading: '服务项目',
    services: ['快速通道', '家庭团聚', '留学签证', '工作签证'],
    contactHeading: '联系我们',
    emailUs: '发送邮件',
    wechat: '微信（扫描上方二维码）',
    whatsapp: 'WhatsApp（扫描上方二维码）',
    copyright: `© ${year} Allied Immigration. 版权所有。`,
    chat: '💬 联系我们',
    assessment: '✅ 免费评估',
  },
  en: {
    cicc: 'CICC Certified Consultancy',
    servicesHeading: 'Services',
    services: ['Express Entry', 'Family Sponsorship', 'Study Visas', 'Work Permits'],
    contactHeading: 'Contact',
    emailUs: 'Email us',
    wechat: 'WeChat (scan QR above)',
    whatsapp: 'WhatsApp (scan QR above)',
    copyright: `© ${year} Allied Immigration. All rights reserved.`,
    chat: '💬 Chat with Us',
    assessment: '✅ Free Assessment',
  },
};

const App: React.FC = () => {
  const [quizOpen, setQuizOpen] = useState(false);
  const { lang } = useLang();
  const tx = t[lang];

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
              <p className="text-slate-400 text-sm mb-2">{tx.cicc}</p>
              <a href="mailto:info@awcanada.com" className="text-slate-400 text-sm hover:text-brand-amber transition-colors duration-200">
                info@awcanada.com
              </a>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">{tx.servicesHeading}</h4>
              <ul className="space-y-2">
                {tx.services.map(s => (
                  <li key={s}>
                    <a href="#services" className="text-slate-400 text-sm hover:text-brand-amber transition-colors duration-200">{s}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">{tx.contactHeading}</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="mailto:info@awcanada.com" className="hover:text-brand-amber transition-colors duration-200">{tx.emailUs}</a></li>
                <li>{tx.wechat}</li>
                <li>{tx.whatsapp}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center">
            <p className="text-slate-500 text-sm">{tx.copyright}</p>
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
            {tx.chat}
          </a>
          <button
            onClick={() => setQuizOpen(true)}
            className="flex-1 py-3 rounded-full bg-brand-amber text-white font-semibold text-sm hover:bg-amber-500 transition-all duration-200"
          >
            {tx.assessment}
          </button>
        </div>
      </div>

      <EligibilityQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
};

export default App;
