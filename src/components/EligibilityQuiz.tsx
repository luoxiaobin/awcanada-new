import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import './EligibilityQuiz.css';

interface EligibilityQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const EligibilityQuiz: React.FC<EligibilityQuizProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    education: '',
    experience: '',
    language: ''
  });

  const handleNext = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setStep(step + 1);
  };

  const reset = () => {
    setStep(1);
    setFormData({ education: '', experience: '', language: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <section className="section quiz-section bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="container">
        <div className="quiz-container">
          <div className="quiz-info">
            <h2>Not sure which visa is right for you?</h2>
            <p>Take our 60-second interactive assessment to discover your best pathway to Canada. No commitments required.</p>
            <div className="quiz-benefits">
              <div className="benefit">
                <CheckCircle2 className="benefit-icon" size={20} />
                <span>Instant personalized recommendation</span>
              </div>
              <div className="benefit">
                <CheckCircle2 className="benefit-icon" size={20} />
                <span>100% Free assessment</span>
              </div>
            </div>
          </div>
          
          <div className="quiz-card">
            {step === 1 && (
              <div className="quiz-step fade-in">
                <div className="step-indicator">Step 1 of 3</div>
                <h3>What is your highest level of education?</h3>
                <div className="options">
                  <button onClick={() => handleNext('education', 'highschool')}>High School Diploma</button>
                  <button onClick={() => handleNext('education', 'bachelors')}>Bachelor's Degree</button>
                  <button onClick={() => handleNext('education', 'masters')}>Master's Degree or higher</button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="quiz-step fade-in">
                <div className="step-indicator">Step 2 of 3</div>
                <h3>Do you have skilled work experience?</h3>
                <div className="options">
                  <button onClick={() => handleNext('experience', 'none')}>Less than 1 year</button>
                  <button onClick={() => handleNext('experience', '1-3')}>1 to 3 years</button>
                  <button onClick={() => handleNext('experience', '3+')}>More than 3 years</button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="quiz-step fade-in">
                <div className="step-indicator">Step 3 of 3</div>
                <h3>How would you rate your English or French?</h3>
                <div className="options">
                  <button onClick={() => handleNext('language', 'basic')}>Basic</button>
                  <button onClick={() => handleNext('language', 'intermediate')}>Intermediate</button>
                  <button onClick={() => handleNext('language', 'advanced')}>Fluent / Advanced</button>
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div className="quiz-step fade-in result-step">
                <div className="success-icon"><CheckCircle2 size={48} /></div>
                <h3>Great News!</h3>
                <p>Based on your answers, you are a strong candidate for the <strong>Express Entry Program</strong>.</p>
                
                <div className="lead-capture">
                  <p className="small-text">Enter your email to get a detailed breakdown and next steps from our experts.</p>
                  <div className="input-group">
                    <input type="email" placeholder="Your email address" />
                    <button className="btn-primary">Get My Report <ArrowRight size={16} /></button>
                  </div>
                </div>
                
                <button className="btn-link mt-4" onClick={reset}>Retake Quiz</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default EligibilityQuiz;
