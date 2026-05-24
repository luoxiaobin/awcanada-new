import React, { useState } from 'react';
import { Globe, Menu, X, ChevronDown, Plus, Minus } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

interface SubMenuItem {
  title: string;
  link: string;
}

interface MenuItem {
  key: string;
  zhTitle: string;
  enTitle: string;
  link?: string;
  subMenu?: SubMenuItem[];
}

const menuData: MenuItem[] = [
  { key: 'home', zhTitle: '首页', enTitle: 'Home', link: '#' },
  {
    key: 'immigration',
    zhTitle: '移民',
    enTitle: 'Immigration',
    subMenu: [
      { title: '担保父母/祖父母移民', link: '#' },
      { title: '担保配偶/同居伙伴移民', link: '#' },
      { title: '担保子女移民', link: '#' },
      { title: '自雇人士移民计划', link: '#' },
      { title: '留学生转移民', link: '#' },
    ],
  },
  {
    key: 'study',
    zhTitle: '留学',
    enTitle: 'Study',
    subMenu: [
      { title: '加拿大留学申请', link: '#' },
      { title: '留学生对配偶（大签）', link: '#' },
      { title: '留学生陪同人员签证（小签）', link: '#' },
      { title: '毕业工作签证PGWP', link: '#' },
    ],
  },
  {
    key: 'visit',
    zhTitle: '访问',
    enTitle: 'Visit',
    subMenu: [
      { title: '访问签证转工签计划', link: '#' },
      { title: '超级签证', link: '#' },
      { title: '旅伴延期、身分恢复', link: '#' },
    ],
  },
  {
    key: 'prcard',
    zhTitle: '枫叶卡',
    enTitle: 'PR Card',
    subMenu: [
      { title: '枫叶卡更新', link: '#' },
      { title: '枫叶卡更新 (加急)', link: '#' },
      { title: '枫叶卡遗失补办', link: '#' },
      { title: '永久居民旅行文件PRTD', link: '#' },
      { title: '放弃加拿大永久居民身份', link: '#' },
    ],
  },
  {
    key: 'citizenship',
    zhTitle: '入籍',
    enTitle: 'Citizenship',
    subMenu: [
      { title: '成年人入籍申请', link: '#' },
      { title: '未成年人入籍申请', link: '#' },
    ],
  },
  { key: 'contact', zhTitle: '联系我们', enTitle: 'Contact Us', link: '#contact' },
];

interface NavbarProps {
  onOpenQuiz: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});
  const { lang, setLang } = useLang();

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const cta = lang === 'zh' ? '免费评估' : 'Free Assessment';
  const toggleLabel = lang === 'zh' ? 'EN | 中文' : '中文 | EN';
  const handleToggleLang = () => setLang(lang === 'zh' ? 'en' : 'zh');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="font-bold text-xl text-brand-navy flex-shrink-0">
              Allied <span className="text-brand-amber">Immigration</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {menuData.map(item =>
                item.subMenu ? (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 text-slate-600 hover:text-brand-navy font-medium text-sm transition-colors duration-200">
                      {lang === 'zh' ? item.zhTitle : item.enTitle}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {activeDropdown === item.key && (
                      <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-lg border border-slate-100 py-2 z-50">
                        {item.subMenu.map(sub => (
                          <a
                            key={sub.title}
                            href={sub.link}
                            className="block px-4 py-2 text-sm text-slate-600 hover:text-brand-navy hover:bg-brand-bg transition-colors duration-200"
                          >
                            {sub.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.key}
                    href={item.link}
                    className="text-slate-600 hover:text-brand-navy font-medium text-sm transition-colors duration-200"
                  >
                    {lang === 'zh' ? item.zhTitle : item.enTitle}
                  </a>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleLang}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-sm text-slate-600 hover:border-brand-sky hover:text-brand-sky transition-all duration-200"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5" />
                {toggleLabel}
              </button>
              <button
                onClick={onOpenQuiz}
                className="hidden lg:block px-5 py-2 rounded-full bg-brand-amber text-white font-semibold text-sm hover:bg-amber-500 transition-all duration-200 shadow-sm"
              >
                {cta}
              </button>
              <button
                onClick={() => setSheetOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors duration-200"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSheetOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <span className="font-bold text-brand-navy text-lg">
                Allied <span className="text-brand-amber">Immigration</span>
              </span>
              <button
                onClick={() => setSheetOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors duration-200"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-4 space-y-1">
              {menuData.map(item =>
                item.subMenu ? (
                  <div key={item.key}>
                    <button
                      onClick={() => toggleAccordion(item.key)}
                      className="w-full flex items-center justify-between py-3 text-slate-700 font-medium border-b border-slate-50"
                    >
                      {lang === 'zh' ? item.zhTitle : item.enTitle}
                      {openAccordions[item.key] ? (
                        <Minus className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    {openAccordions[item.key] && (
                      <div className="pl-4 pb-2 space-y-1">
                        {item.subMenu.map(sub => (
                          <a
                            key={sub.title}
                            href={sub.link}
                            onClick={() => setSheetOpen(false)}
                            className="block py-2 text-sm text-slate-600 hover:text-brand-navy transition-colors duration-200"
                          >
                            {sub.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.key}
                    href={item.link}
                    onClick={() => setSheetOpen(false)}
                    className="block py-3 text-slate-700 font-medium border-b border-slate-50"
                  >
                    {lang === 'zh' ? item.zhTitle : item.enTitle}
                  </a>
                )
              )}
            </div>

            <div className="px-6 pb-10 pt-3 space-y-3">
              <button
                onClick={handleToggleLang}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 text-slate-600 text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                {toggleLabel}
              </button>
              <button
                onClick={() => { setSheetOpen(false); setTimeout(() => onOpenQuiz(), 250); }}
                className="w-full py-3 rounded-full bg-brand-amber text-white font-semibold text-sm hover:bg-amber-500 transition-all duration-200"
              >
                {cta}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
