import React, { useState } from 'react';
import { X } from 'lucide-react';

interface EligibilityQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    question: 'What is your highest level of education?',
    options: ['High School or below', "Bachelor's Degree", "Master's or PhD"],
    scores: [1, 2, 3],
  },
  {
    question: 'How many years of work experience do you have?',
    options: ['Less than 1 year', '1–3 years', '3+ years'],
    scores: [1, 2, 3],
  },
  {
    question: 'How would you rate your English proficiency?',
    options: ['Basic', 'Intermediate', 'Advanced'],
    scores: [1, 2, 3],
  },
];

function getResult(score: number) {
  if (score >= 8) {
    return {
      badge: '🌟 High Eligibility',
      explanation:
        'Your profile looks strong for Canadian immigration. You may qualify for Express Entry or other fast-track pathways.',
      badgeClass: 'bg-green-50 text-green-700',
    };
  }
  if (score >= 5) {
    return {
      badge: '✅ Moderate Eligibility',
      explanation:
        'You have a solid foundation. Some pathways may need additional preparation — our consultants can guide you.',
      badgeClass: 'bg-blue-50 text-brand-blue',
    };
  }
  return {
    badge: '📋 Needs Assessment',
    explanation:
      'Your situation benefits from personalized guidance. Our consultants will identify the best pathway for you.',
    badgeClass: 'bg-slate-50 text-slate-700',
  };
}

const EligibilityQuiz: React.FC<EligibilityQuizProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isResults = step === steps.length;
  const progress = isResults ? 100 : (step / steps.length) * 100;
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);

  const handleSelect = (score: number) => {
    setScores(prev => [...prev, score]);
    setTimeout(() => setStep(s => s + 1), 250);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setScores([]);
      setEmail('');
      setSubmitted(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
        <button
          onClick={handleClose}
          className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all duration-200"
          aria-label="Close quiz"
        >
          <X className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-slate-400">
          {isResults ? 'Your Results' : `Step ${step + 1} of ${steps.length}`}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-lg">
          {!isResults ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy text-center mb-10 leading-snug">
                {steps[step].question}
              </h2>
              <div className="space-y-3">
                {steps[step].options.map((option, i) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(steps[step].scores[i])}
                    className="w-full min-h-14 px-6 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-medium text-left hover:border-brand-amber hover:bg-amber-50 active:bg-amber-100 transition-all duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold mb-6 ${result.badgeClass}`}>
                {result.badge}
              </div>
              <p className="text-slate-600 leading-relaxed mb-10 text-base max-w-sm mx-auto">
                {result.explanation}
              </p>

              {!submitted ? (
                <div className="space-y-3 text-left">
                  <p className="text-sm font-semibold text-slate-500 text-center mb-2">
                    Get your detailed report by email
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-brand-amber focus:outline-none text-slate-700 transition-colors duration-200"
                  />
                  <button
                    onClick={() => email && setSubmitted(true)}
                    disabled={!email}
                    className="w-full py-3.5 rounded-full bg-brand-amber text-white font-semibold hover:bg-amber-500 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Get My Free Report
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="text-5xl mb-4">📬</div>
                  <p className="font-bold text-brand-navy text-xl mb-2">Report on its way!</p>
                  <p className="text-slate-500 text-sm">
                    We've sent your eligibility report to <strong>{email}</strong>. Our team will be in touch within 24 hours.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 pb-8 flex-shrink-0">
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div
            className="bg-brand-amber h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default EligibilityQuiz;
