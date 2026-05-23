import React from 'react';
import { Plane, Users, GraduationCap, Briefcase } from 'lucide-react';
import './ServicesGrid.css';

const ServicesGrid: React.FC = () => {
  const services = [
    {
      icon: <Plane size={32} />,
      title: "Express Entry",
      description: "Fast-track your immigration with Canada's points-based system for skilled workers."
    },
    {
      icon: <Users size={32} />,
      title: "Family Sponsorship",
      description: "Reunite with your loved ones by sponsoring your spouse, partner, or parents."
    },
    {
      icon: <GraduationCap size={32} />,
      title: "Study Visas",
      description: "Access world-class education. We handle the paperwork so you can focus on studying."
    },
    {
      icon: <Briefcase size={32} />,
      title: "Work Permits",
      description: "Secure the necessary documentation to work legally in Canada as a temporary resident."
    }
  ];

  return (
    <section className="section bg-light" id="services">
      <div className="container">
        <div className="section-header">
          <h2>Our Core Services</h2>
          <p>We provide comprehensive immigration solutions tailored to your unique profile and goals.</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button className="btn-link">Learn more &rarr;</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
