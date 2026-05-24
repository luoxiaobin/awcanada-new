import { useState } from 'react';
import { X } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

interface EligibilityQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const questionScores = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
];

const t = {
  zh: {
    stepIndicator: (step: number, total: number) => `第 ${step} 步，共${total}步`,
    resultsHeading: '评估结果',
    closeLabel: '关闭',
    questions: [
      {
        question: '您的最高学历是？',
        options: ['高中及以下', '本科学位', '硕士或博士'],
      },
      {
        question: '您有多少年工作经验？',
        options: ['不足1年', '1–3年', '3年以上'],
      },
      {
        question: '您的英语水平如何？',
        options: ['基础', '中级', '高级'],
      },
    ],
    results: {
      high: {
        badge: '🌟 高度符合条件',
        explanation: '您的申请资质非常优秀，可能符合快速通道或其他快捷移民途径。',
        badgeClass: 'bg-green-50 text-green-700',
      },
      moderate: {
        badge: '✅ 基本符合条件',
        explanation: '您的基础条件良好，部分途径可能需要额外准备，我们的顾问将为您提供指导。',
        badgeClass: 'bg-blue-50 text-brand-blue',
      },
      needs: {
        badge: '📋 需要个性化评估',
        explanation: '您的情况适合个性化指导，我们的顾问将为您找到最合适的移民途径。',
        badgeClass: 'bg-slate-50 text-slate-700',
      },
    },
    emailLabel: '通过邮件获取详细报告',
    emailPlaceholder: '您的邮箱',
    submitButton: '获取免费报告',
    successHeading: '报告已发送！',
    successBody: (email: string) =>
      `我们已将您的评估报告发送至 ${email}。我们的团队将在24小时内与您联系。`,
  },
  en: {
    stepIndicator: (step: number, total: number) => `Step ${step} of ${total}`,
    resultsHeading: 'Your Results',
    closeLabel: 'Close quiz',
    questions: [
      {
        question: 'What is your highest level of education?',
        options: ['High School or below', "Bachelor's Degree", "Master's or PhD"],
      },
      {
        question: 'How many years of work experience do you have?',
        options: ['Less than 1 year', '1–3 years', '3+ years'],
      },
      {
        question: 'How would you rate your English proficiency?',
        options: ['Basic', 'Intermediate', 'Advanced'],
      },
    ],
    results: {
      high: {
        badge: '🌟 High Eligibility',
        explanation:
          'Your profile looks strong for Canadian immigration. You may qualify for Express Entry or other fast-track pathways.',
        badgeClass: 'bg-green-50 text-green-700',
      },
      moderate: {
        badge: '✅ Moderate Eligibility',
        explanation:
          'You have a solid foundation. Some pathways may need additional preparation — our consultants can guide you.',
        badgeClass: 'bg-blue-50 text-brand-blue',
      },
      needs: {
        badge: '📋 Needs Assessment',
        explanation:
          'Your situation benefits from personalized guidance. Our consultants will identify the best pathway for you.',
        badgeClass: 'bg-slate-50 text-slate-700',
      },
    },
    emailLabel: 'Get your detailed report by email',
    emailPlaceholder: 'your@email.com',
    submitButton: 'Get My Free Report',
    successHeading: 'Report on its way!',
    successBody: (email: string) =>
      `We've sent your eligibility report to ${email}. Our team will be in touch within 24 hours.`,
  },
};

const EligibilityQuiz = ({ isOpen, onClose }: EligibilityQuizProps) => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLang();
  const tx = t[lang];

  const totalSteps = tx.questions.length;
  const isResults = step === totalSteps;
  const progress = isResults ? 100 : (step / totalSteps) * 100;
  const totalScore = scores.reduce((a, b) => a + b, 0);

  const result =
    totalScore >= 8 ? tx.results.high : totalScore >= 5 ? tx.results.moderate : tx.results.needs;

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
          aria-label={tx.closeLabel}
        >
          <X className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-slate-400">
          {isResults ? tx.resultsHeading : tx.stepIndicator(step + 1, totalSteps)}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-lg">
          {!isResults ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy text-center mb-10 leading-snug">
                {tx.questions[step].question}
              </h2>
              <div className="space-y-3">
                {tx.questions[step].options.map((option, i) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(questionScores[step][i])}
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
                    {tx.emailLabel}
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={tx.emailPlaceholder}
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-brand-amber focus:outline-none text-slate-700 transition-colors duration-200"
                  />
                  <button
                    onClick={() => email && setSubmitted(true)}
                    disabled={!email}
                    className="w-full py-3.5 rounded-full bg-brand-amber text-white font-semibold hover:bg-amber-500 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {tx.submitButton}
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="text-5xl mb-4">📬</div>
                  <p className="font-bold text-brand-navy text-xl mb-2">{tx.successHeading}</p>
                  <p className="text-slate-500 text-sm">{tx.successBody(email)}</p>
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
