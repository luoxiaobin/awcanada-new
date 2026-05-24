import React from 'react';
import { FileText, Users, GraduationCap, Briefcase } from 'lucide-react';

const services = [
  {
    Icon: FileText,
    title: 'Express Entry',
    description: 'The fastest route to Canadian permanent residency for skilled workers.',
  },
  {
    Icon: Users,
    title: 'Family Sponsorship',
    description: "Reunite with your loved ones through Canada's family sponsorship program.",
  },
  {
    Icon: GraduationCap,
    title: 'Study Visas',
    description: 'Study at world-class Canadian institutions with expert visa guidance.',
  },
  {
    Icon: Briefcase,
    title: 'Work Permits',
    description: 'Start your Canadian career with the right work permit for your situation.',
  },
];

const ServicesGrid: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-brand-sky text-sm font-semibold uppercase tracking-wider mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-navy">
            How Can We Help You?
          </h2>
        </div>

        {/* Cards: horizontal scroll on mobile, 4-col grid on desktop */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {services.map(({ Icon, title, description }) => (
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
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
