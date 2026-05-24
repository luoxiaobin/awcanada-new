import React from 'react';

interface HeroProps {
  onOpenQuiz: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenQuiz }) => {
  return (
    <section className="min-h-screen grid lg:grid-cols-2 pt-16">
      {/* Left column */}
      <div className="bg-brand-bg flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-24">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sky/10 text-brand-sky text-sm font-semibold mb-6 w-fit">
          ⭐ Trusted by 10,000+ Clients
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-brand-navy leading-tight mb-5">
          Your Pathway to a<br />
          <span className="text-brand-amber">New Life</span> in Canada
        </h1>

        {/* Subtext */}
        <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md">
          Expert immigration consultation with a proven track record. CICC-certified consultants guiding you every step of the way.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <button
            onClick={onOpenQuiz}
            className="px-8 py-3.5 rounded-full bg-brand-amber text-white font-semibold hover:bg-amber-500 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Start Free Assessment
          </button>
          <a
            href="#services"
            className="px-8 py-3.5 rounded-full border-2 border-brand-navy text-brand-navy font-semibold hover:bg-brand-navy hover:text-white transition-all duration-200 text-center"
          >
            View Our Services
          </a>
        </div>

        {/* Mobile trust strip — visible only below lg */}
        <div className="flex flex-wrap items-center gap-4 lg:hidden">
          {['98% Success Rate', 'CICC Certified', '15+ Years'].map(item => (
            <div key={item} className="flex items-center gap-1.5 text-sm text-slate-600">
              <span className="text-green-500">✅</span> {item}
            </div>
          ))}
        </div>
      </div>

      {/* Right column — desktop only */}
      <div className="relative hidden lg:block">
        <img
          src="/hero_background.png"
          alt="Life in Canada"
          className="w-full h-full object-cover"
        />
        {/* Floating trust card */}
        <div className="absolute bottom-12 -left-6 bg-white rounded-2xl shadow-xl p-5 min-w-[210px]">
          <div className="space-y-3">
            {['98% Success Rate', 'CICC Certified', '15+ Years Experience'].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <span className="text-green-500 text-base">✅</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile image — stacks below text */}
      <div className="lg:hidden h-56 sm:h-72">
        <img
          src="/hero_background.png"
          alt="Life in Canada"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
