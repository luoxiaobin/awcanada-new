import { type FC } from 'react';
import { FileText, Users, GraduationCap, Briefcase } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

const icons = [FileText, Users, GraduationCap, Briefcase];

const t = {
  zh: {
    sectionLabel: '我们的服务',
    heading: '我们能为您做什么？',
    services: [
      { title: '快速通道', description: '面向技术移民的最快加拿大永居途径。', learnMore: '了解详情 →' },
      { title: '家庭团聚', description: '通过加拿大家庭担保计划，与您的亲人重聚。', learnMore: '了解详情 →' },
      { title: '留学签证', description: '在专业指导下，进入加拿大顶级院校学习。', learnMore: '了解详情 →' },
      { title: '工作签证', description: '根据您的情况，申请最合适的加拿大工作签证。', learnMore: '了解详情 →' },
    ],
  },
  en: {
    sectionLabel: 'What We Do',
    heading: 'How Can We Help You?',
    services: [
      { title: 'Express Entry', description: 'The fastest route to Canadian permanent residency for skilled workers.', learnMore: 'Learn more →' },
      { title: 'Family Sponsorship', description: "Reunite with your loved ones through Canada's family sponsorship program.", learnMore: 'Learn more →' },
      { title: 'Study Visas', description: 'Study at world-class Canadian institutions with expert visa guidance.', learnMore: 'Learn more →' },
      { title: 'Work Permits', description: 'Start your Canadian career with the right work permit for your situation.', learnMore: 'Learn more →' },
    ],
  },
};

const ServicesGrid: FC = () => {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-brand-sky text-sm font-semibold uppercase tracking-wider mb-3">
            {tx.sectionLabel}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-navy">
            {tx.heading}
          </h2>
        </div>

        {/* Cards: horizontal scroll on mobile, 4-col grid on desktop */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {tx.services.map(({ title, description, learnMore }, i) => {
            const Icon = icons[i];
            return (
              <div
                key={title}
                className="snap-start flex-shrink-0 w-72 lg:w-auto bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 p-7 flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-brand-amber" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">{description}</p>
                <a
                  href="#contact"
                  className="mt-5 text-sm font-semibold text-brand-blue hover:text-brand-navy transition-colors duration-200 inline-flex items-center gap-1"
                >
                  {learnMore}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
