// استيراد المكتبات والأدوات اللازمة من رياكت
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useParams } from 'react-router-dom';

// استيراد الأيقونات التي سنستخدمها
import {
    FaMoon, FaSun, FaCompassDrafting, FaPeopleGroup, FaBullhorn, FaFileLines,
    FaGears, FaChartLine, FaUsers, FaArrowUpRightFromSquare, FaShareNodes,
    FaMagnifyingGlass, FaUserTie, FaXmark, FaIdCard, FaFileSignature, FaHandshake,
    FaPersonWalkingArrowRight, FaAddressCard
} from 'react-icons/fa6';

// ✨ الخطوة 1: استيراد الصور المحلية من مجلد assets
import logo from './assets/logo.png';
import mohLogo from './assets/moh-logo.png';
import visionLogo from './assets/vision-logo.png';
import videoPoster from './assets/video-poster.jpg';

// استيراد ملف التصميم
import './App.css';

// ===================================================================
// قسم البيانات: هنا نضع كل معلومات النماذج والروابط
// ===================================================================
const servicesData = {
    planning: {
        title: "قسم التخطيط",
        description: "نماذج التوجيه، السير الذاتية، وإقرارات العمل.",
        forms: [
            { id: 1, icon: 'fa-compass-drafting', title: 'التوجيه الإداري', description: 'نموذج التوجيه الإداري للموظفين الجدد والمنقولين.', url: 'https://my-card.top/arar/card.php?id=58' },
            { id: 2, icon: 'fa-id-card', title: 'السيرة الذاتية', description: 'نموذج موحد لتقديم وتحديث السير الذاتية.', url: 'https://my-card.top/arar/card.php?id=60' },
            { id: 3, icon: 'fa-file-signature', title: 'إقرار السرية', description: 'إقرار المحافظة على سرية المعلومات والبيانات.', url: 'https://my-card.top/arar/card.php?id=56' },
            { id: 4, icon: 'fa-handshake', title: 'موافقة العمل', description: 'نموذج الموافقة على بدء أو استئناف العمل.', url: 'https://my-card.top/arar/card.php?id=59' },
        ]
    },
    operations: {
        title: "قسم عمليات الموارد",
        description: "نماذج مباشرة العمل والعمليات التشغيلية للموظفين.",
        forms: [
            { id: 5, icon: 'fa-person-walking-arrow-right', title: 'نموذج مباشرة', description: 'نموذج رسمي لمباشرة العمل بعد التعيين أو الإجازة.', url: 'https://my-card.top/arar/card.php?id=48' },
        ]
    },
    communication: {
        title: "قسم التواصل الداخلي",
        description: "إصدار بطاقات العمل وخدمات التواصل الداخلي.",
        forms: [
            { id: 6, icon: 'fa-address-card', title: 'إصدار بطاقة عمل', description: 'طلب إصدار أو تجديد بطاقة العمل التعريفية.', url: 'https://my-card.top/arar/card.php?id=52' },
        ]
    }
};
const allForms = Object.values(servicesData).flatMap(dept => dept.forms);

const iconMap = {
    'fa-compass-drafting': <FaCompassDrafting />, 'fa-id-card': <FaIdCard />, 'fa-file-signature': <FaFileSignature />,
    'fa-handshake': <FaHandshake />, 'fa-person-walking-arrow-right': <FaPersonWalkingArrowRight />, 'fa-address-card': <FaAddressCard />
};

// ===================================================================
// المكونات
// ===================================================================

const Header = ({ isDarkMode, onThemeChange }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="main-nav">
                <div className="nav-logos">
                    {/* ✨ الخطوة 2: استخدام الصور المحلية */}
                    <img src={logo} alt="شعار تجمع تبوك الصحي" className="logo" />
                </div>
                <ul className="nav-links">
                    <li><NavLink to="/" end>الرئيسية</NavLink></li>
                    <li><NavLink to="/department/planning">التخطيط</NavLink></li>
                    <li><NavLink to="/department/operations">عمليات الموارد</NavLink></li>
                    <li><NavLink to="/department/communication">التواصل الداخلي</NavLink></li>
                </ul>
                <div className="nav-actions">
                    <button onClick={onThemeChange} className="theme-toggle" aria-label="Toggle dark mode">
                        {isDarkMode ? <FaSun color="#f39c12" /> : <FaMoon />}
                    </button>
                </div>
            </nav>
        </header>
    );
};

const HeroSection = () => (
    <section className="hero-section">
        {/* ✨ الخطوة 2: استخدام الصور المحلية */}
        <video autoPlay muted loop playsInline className="hero-video" poster={videoPoster}>
            <source src="https://cdn.coverr.co/videos/coverr-a-scientist-working-in-a-lab-7213/1080p.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content animate-on-load">
            <h1>منصة "مسار" الرقمية</h1>
            <p>البوابة الموحدة لنماذج وخدمات الموارد البشرية في تجمع تبوك الصحي</p>
        </div>
    </section>
);

const MainCards = () => (
    <section className="main-cards-section">
        <Link to="/department/planning" className="main-card">
            <div className="card-icon"><FaCompassDrafting /></div>
            <h3>قسم التخطيط</h3>
            <p>نماذج التوجيه، السير الذاتية، وإقرارات العمل.</p>
        </Link>
        <Link to="/department/operations" className="main-card">
            <div className="card-icon"><FaPeopleGroup /></div>
            <h3>قسم عمليات الموارد</h3>
            <p>نماذج مباشرة العمل والعمليات التشغيلية.</p>
        </Link>
        <Link to="/department/communication" className="main-card">
            <div className="card-icon"><FaBullhorn /></div>
            <h3>قسم التواصل الداخلي</h3>
            <p>إصدار بطاقات العمل وخدمات التواصل.</p>
        </Link>
    </section>
);

const Counter = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = target;
                    const duration = 2000;
                    const increment = end / (duration / 16);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.ceil(start));
                        }
                    }, 16);
                    observer.unobserve(ref.current);
                }
            }, { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref} className="counter">{count}{suffix}</span>;
};

const Achievements = () => (
    <section className="achievements-section">
        <div className="achievement-item"><FaFileLines /><Counter target={allForms.length} /><p>نموذج وخدمة متاحة</p></div>
        <div className="achievement-item"><FaGears /><Counter target={1250} suffix="+" /><p>عملية تمت اليوم</p></div>
        <div className="achievement-item"><FaChartLine /><Counter target={98} suffix="%" /><p>نسبة الإنجاز</p></div>
        <div className="achievement-item"><FaUsers /><Counter target={1500} suffix="+" /><p>موظف مستفيد</p></div>
    </section>
);

const VisionSection = () => (
    <section className="vision-section">
        <div className="vision-logo">
            {/* ✨ الخطوة 2: استخدام الصور المحلية */}
            <img src={visionLogo} alt="شعار رؤية 2030" />
        </div>
        <div className="vision-text">
            <h3>دعم مستهدفات رؤية المملكة 2030</h3>
            <p>تأتي هذه المنصة تحقيقًا لأهداف التحول الرقمي في القطاع الحكومي، ورفع كفاءة الخدمات، وتحسين بيئة العمل بما يتماشى مع رؤية المملكة الطموحة.</p>
        </div>
    </section>
);

const ServiceCard = ({ form }) => {
    const handleOpenLink = (url) => {
        if (window.confirm("سيتم تحويلك الآن إلى صفحة النموذج. هل ترغب في المتابعة؟")) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };
    const handleShare = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
            alert('تم نسخ رابط النموذج بنجاح!');
        } catch (err) {
            alert('فشلت عملية نسخ الرابط.');
        }
    };

    return (
        <div className="service-card">
            <div className="service-card-header">
                <div className="icon">{iconMap[form.icon] || <FaFileLines />}</div>
                <h3>{form.title}</h3>
            </div>
            <p>{form.description}</p>
            <div className="service-card-actions">
                <button onClick={() => handleOpenLink(form.url)} className="btn btn-primary">
                    <FaArrowUpRightFromSquare /> فتح النموذج
                </button>
                <button onClick={() => handleShare(form.url)} className="btn btn-secondary">
                    <FaShareNodes /> مشاركة
                </button>
            </div>
        </div>
    );
};

const AzzamAssistant = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsVisible(window.scrollY > 420);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleOpenLink = (url) => {
        if (window.confirm("سيتم تحويلك الآن إلى صفحة النموذج. هل ترغب في المتابعة؟")) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <>
            <button className={`azzam-fab ${isVisible ? 'visible' : ''}`} onClick={() => setIsPanelOpen(true)} aria-label="Open Azzam Assistant">
                <FaUserTie />
            </button>
            <div className={`azzam-panel ${isPanelOpen ? 'visible' : ''}`}>
                <div className="azzam-header">
                    <h3>المساعد الشخصي عزّام</h3>
                    <button onClick={() => setIsPanelOpen(false)} className="close-azzam-btn" aria-label="Close Azzam Assistant"><FaXmark /></button>
                </div>
                <div className="azzam-body">
                    <p>أهلاً بك! أنا هنا لمساعدتك في الوصول السريع للخدمات.</p>
                    <div className="quick-links">
                        {allForms.map(form => (
                            <button key={form.id} onClick={() => handleOpenLink(form.url)}>{form.title}</button>
                        ))}
                    </div>
                </div>
                <div className="azzam-footer">
                    <p>إجمالي النماذج: <span>{allForms.length}</span></p>
                    <p>آخر تحديث: أغسطس 2025</p>
                </div>
            </div>
        </>
    );
};

const Footer = () => (
    <footer className="main-footer">
        <div className="footer-logos">
            {/* ✨ الخطوة 2: استخدام الصور المحلية */}
            <img src={logo} alt="شعار المستشفى والتجمع" />
            <img src={mohLogo} alt="شعار وزارة الصحة" />
        </div>
        <div className="footer-text">
            <p>جميع الحقوق محفوظة &copy; 2025 - تجمع تبوك الصحي</p>
            <p className="tagline">تصميم تفاعلي متقدم — نسخة تجريبية</p>
        </div>
    </footer>
);

const HomePage = () => (
    <>
        <HeroSection />
        <div className="container">
            <MainCards />
            <Achievements />
            <VisionSection />
        </div>
    </>
);

const DepartmentPage = () => {
    const { deptKey } = useParams();
    const department = servicesData[deptKey];
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [deptKey]);

    if (!department) return (
        <div className="container" style={{textAlign: 'center', padding: '5rem 0'}}>
            <h2>القسم غير موجود</h2>
        </div>
    );

    const filteredForms = department.forms.filter(form =>
        form.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <section className="department-header-section animate-on-load">
                <h1>{department.title}</h1>
                <p>{department.description}</p>
                <div className="search-filter-bar">
                    <div className="search-wrapper">
                        <span className="search-icon"><FaMagnifyingGlass /></span>
                        <input
                            type="search"
                            id="service-search"
                            placeholder="ابحث عن نموذج أو خدمة..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>
            <section className="services-grid">
                {filteredForms.length > 0 ? (
                    filteredForms.map(form => <ServiceCard key={form.id} form={form} />)
                ) : (
                    <p style={{textAlign: 'center', width: '100%'}}>لا توجد نتائج مطابقة لبحثك.</p>
                )}
            </section>
        </div>
    );
};

// ===================================================================
// التطبيق الرئيسي
// ===================================================================
function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('darkMode') === 'enabled';
        setIsDarkMode(savedTheme);
    }, []);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return (
        <Router>
            <Header isDarkMode={isDarkMode} onThemeChange={toggleTheme} />
            <main className="page-wrapper">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/department/:deptKey" element={<DepartmentPage />} />
                </Routes>
            </main>
            <AzzamAssistant />
            <Footer />
        </Router>
    );
}

export default App;