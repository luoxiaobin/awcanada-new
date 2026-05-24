import React from 'react';

const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const SocialMedia: React.FC = () => {
  return (
    <section className="py-24 bg-brand-navy" id="contact">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Ready to Start Your Journey?
        </h2>
        <p className="text-slate-300 text-lg mb-12">Book a free consultation with our team</p>

        {/* QR Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
          <div className="rounded-3xl bg-white/10 border border-white/20 p-6 sm:p-8 flex flex-col items-center">
            <p className="text-white font-semibold mb-5 text-sm sm:text-base">💬 WeChat</p>
            <img
              src="/wechat_qr.png"
              alt="WeChat QR Code"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl object-cover mb-3"
            />
            <p className="text-slate-300 text-xs sm:text-sm">Scan to chat</p>
          </div>

          <div className="rounded-3xl bg-white/10 border border-white/20 p-6 sm:p-8 flex flex-col items-center">
            <p className="text-white font-semibold mb-5 text-sm sm:text-base">📱 WhatsApp</p>
            <img
              src="/whatsapp_qr.png"
              alt="WhatsApp QR Code"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl object-cover mb-3"
            />
            <p className="text-slate-300 text-xs sm:text-sm">Scan to chat</p>
          </div>
        </div>

        {/* YouTube link */}
        <a
          href="https://youtube.com/@awcanada"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white hover:text-brand-amber transition-colors duration-200 font-medium"
        >
          <YoutubeIcon className="w-5 h-5 text-red-400" />
          Watch our client stories on YouTube →
        </a>
      </div>
    </section>
  );
};

export default SocialMedia;
