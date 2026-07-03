import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessView() {
  const navigate = useNavigate();
  return (
    <div className="form-page-wrapper" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className="success-wrap">
        <div className="success-ring">✓</div>
        <div className="success-msg">تم تسجيل طلبكم بنجاح في أنظمة الجمعية، وسيتم التواصل معكم قريباً.</div>
        <button className="ghost-btn" onClick={() => navigate('/')}>العودة للصفحة الرئيسية</button>
      </div>
    </div>
  );
}