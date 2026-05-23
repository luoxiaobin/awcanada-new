import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, ChevronDown, Plus, Minus } from 'lucide-react';
import './Navbar.css';

interface SubMenuItem {
  title: string;
  link: string;
}

interface MenuItem {
  title: string;
  link?: string;
  subMenu?: SubMenuItem[];
}

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuData: MenuItem[] = [
    { title: '首页', link: '#' },
    {
      title: '移民',
      subMenu: [
        { title: '担保父母/祖父母移民', link: '#' },
        { title: '担保配偶/同居伙伴移民', link: '#' },
        { title: '担保子女移民', link: '#' },
        { title: '自雇人士移民计划', link: '#' },
        { title: '留学生转移民', link: '#' }
      ]
    },
    {
      title: '留学',
      subMenu: [
        { title: '加拿大留学申请', link: '#' },
        { title: '留学生对配偶（大签）', link: '#' },
        { title: '留学生陪同人员签证（小签）', link: '#' },
        { title: '毕业工作签证PGWP', link: '#' }
      ]
    },
    {
      title: '访问',
      subMenu: [
        { title: '访问签证转工签计划', link: '#' },
        { title: '超级签证', link: '#' },
        { title: '旅伴延期、身分恢复', link: '#' }
      ]
    },
    {
      title: '枫叶卡',
      subMenu: [
        { title: '枫叶卡更新', link: '#' },
        { title: '枫叶卡更新 (加急)', link: '#' },
        { title: '枫叶卡遗失补办', link: '#' },
        { title: '永久居民旅行文件PRTD', link: '#' },
        { title: '枫叶卡更新-顾问分析', link: '#' },
        { title: '放弃加拿大永久居民身份', link: '#' }
      ]
    },
    {
      title: '入籍',
      subMenu: [
        { title: '成年人入籍申请', link: '#' },
        { title: '未成年人入籍申请', link: '#' }
      ]
    },
    { title: '联系我们', link: '#contact' }
  ];

  const toggleAccordion = (title: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo">
            <span className="logo-accent">Allied</span> Immigration
          </div>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {menuData.map((item, idx) => (
              <div 
                key={idx} 
                className="nav-item-container"
                onMouseEnter={() => item.subMenu && setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.subMenu ? (
                  <button className="nav-link-btn">
                    {item.title} <ChevronDown size={14} />
                  </button>
                ) : (
                  <a href={item.link}>{item.title}</a>
                )}

                {item.subMenu && activeDropdown === item.title && (
                  <div className="dropdown-menu">
                    {item.subMenu.map((sub, sIdx) => (
                      <a key={sIdx} href={sub.link} className="dropdown-item">
                        {sub.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="language-selector">
              <Globe size={18} />
              <span>EN</span>
              <span className="separator">|</span>
              <span className="inactive">中文</span>
            </div>

            <button className="btn-primary nav-cta">Free Assessment</button>
          </nav>

          <button className="mobile-toggle" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar Drawer */}
      <div className={`sidebar-drawer ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="sidebar-content">
          {menuData.map((item, idx) => (
            <div key={idx} className="sidebar-item-container">
              {item.subMenu ? (
                <>
                  <button 
                    className="sidebar-accordion-header"
                    onClick={() => toggleAccordion(item.title)}
                  >
                    <span>{item.title}</span>
                    {openAccordions[item.title] ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                  <div className={`sidebar-accordion-content ${openAccordions[item.title] ? 'expanded' : ''}`}>
                    {item.subMenu.map((sub, sIdx) => (
                      <a key={sIdx} href={sub.link} className="sidebar-sub-item" onClick={() => setSidebarOpen(false)}>
                        {sub.title}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a href={item.link} className="sidebar-direct-link" onClick={() => setSidebarOpen(false)}>
                  {item.title}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
