import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg'; 

export default function Home() {
  const navigate = useNavigate();

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="premium-homepage">
      {/* 1. النافبار الزجاجي الثابت الموحد (تمت إزالة زر لوحة التحكم) */}
      <header className="fixed-glass-navbar">
        <div className="brand-identity-block" onClick={handleScrollToTop}>
          <img src={logo} alt="Logo" className="circular-club-logo" />
          <div className="portal-main-title">جمعية <span>آفاق الرياضية</span></div>
        </div>
      </header>

      {/* 2. قسم الهيرو العريض للنصوص الجديدة */}
      <section className="premium-hero-section">
        <div className="gold-eyebrow-text">بوابة التسجيل</div>
        <h1 className="hero-main-headline">دورة الأحزمة والبطولة الوطنية</h1>
        <p className="hero-sub-lede">
          صفحة تمكنك من الانخراط في دورة الأحزمة أو الانضمام إلى البطولة الوطنية.
        </p>

        {/* 3. صناديق الخيارات وبداخلها الأزرار الصفراء الحقيقية */}
        <div className="action-cards-container">
          
          {/* صندوق دورة الأحزمة */}
          <div className="premium-action-card">
            <div className="card-top-content">
              <span className="combat-icon">🥋</span>
              <h3 className="card-heading">دورة الأحزمة</h3>
              <p className="card-paragraph">سجّل مشاركتك في اختبار الترقية للحصول على حزامك التالي.</p>
            </div>
            <button className="solid-yellow-action-btn" onClick={() => navigate('/register/belt')}>
              التسجيل في الدورة
            </button>
          </div>

          {/* صندوق البطولة الوطنية */}
          <div className="premium-action-card">
            <div className="card-top-content">
              <span className="combat-icon">🏆</span>
              <h3 className="card-heading">البطولة الوطنية</h3>
              <p className="card-paragraph">سجّل مشاركتك في البطولة الوطنية وتنافس على اللقب.</p>
            </div>
            <button className="solid-yellow-action-btn" onClick={() => navigate('/register/course')}>
              التسجيل في البطولة
            </button>
          </div>

        </div>
      </section>

      {/* 4. الفوتر الفاخر */}
      <footer className="premium-site-footer">
        <div className="brand-identity-block" onClick={handleScrollToTop}>
          <img src={logo} alt="Logo" className="circular-club-logo" />
          <div className="portal-main-title">جمعية <span>آفاق الرياضية</span></div>
        </div>
        <div className="copyright-notice">بوابة التسجيل الإلكترونية — جميع الحقوق محفوظة © 2026</div>
      </footer>
    </div>
  );
}