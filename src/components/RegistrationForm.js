import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../logo.svg';

// 1. استيراد قاعدة البيانات والدوال المطلوبة من Firebase
import { db } from '../firebaseConfig.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function RegistrationForm() {
  const { type } = useParams();
  const navigate = useNavigate();
  const isBelt = type === 'belt';

  // إنشاء الـ States لتجميع قيم حقول الإدخال حية
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // حقول ديناميكية تعتمد على نوع الاستمارة
  const [currentBelt, setCurrentBelt] = useState('');
  const [clubName, setClubName] = useState('');
  const [weightClass, setWeightClass] = useState('');
  const [logisticDate, setLogisticDate] = useState('');

  // 2. دالة إرسال البيانات الحية مباشرة إلى Firebase Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    // صياغة تفاصيل مخصصة بناءً على نوع الاستمارة لترسل لحقل التفاصيل
    const dynamicDetails = isBelt 
      ? `الحزام الحالي: ${currentBelt} | النادي: ${clubName || 'لا يوجد'} | العمر: ${age} | ملاحظات: ${notes || 'لا يوجد'}`
      : `فئة الوزن: ${weightClass} | تاريخ التوافر: ${logisticDate} | العمر: ${age} | ملاحظات: ${notes || 'لا يوجد'}`;

    try {
      // إرسال البيانات وحفظها في تجميعة 'registrations' داخل Firestore
      await addDoc(collection(db, "registrations"), {
        name: name,
        phone: phone,
        city: city,
        type: type, // سيرسل 'belt' أو 'course' تلقائياً حسب الرابط
        details: dynamicDetails,
        createdAt: serverTimestamp() // إضافة توقيت السيرفر التلقائي من الفايربيز
      });

      // إذا تم الحفظ بنجاح، ننتقل لصفحة النجاح الفاخرة المخصصة
      navigate('/success');

    } catch (error) {
      console.error("Error adding document to Firebase: ", error);
      alert('حدث خطأ أثناء إرسال طلبك إلى قاعدة البيانات: ' + error.message);
    }
  };

  return (
    <div className="form-page-wrapper">
      {/* نافبار علوي ثابت متناسق */}
      <header className="fixed-glass-navbar">
        <div className="brand-identity-block" onClick={() => navigate('/')}>
          <img src={logo} alt="Logo" className="circular-club-logo" />
          <div className="portal-main-title">جمعية <span>آفاق الرياضية</span></div>
        </div>
      </header>

      <div className="form-wrap">
        <button className="back-btn" onClick={() => navigate('/')}>→ العودة للرئيسية</button>
        
        <div className="form-title">
          {isBelt ? <>التسجيل في <span>دورة الأحزمة</span></> : <>التسجيل في <span>البطولة الوطنية</span></>}
        </div>
        <div className="form-sub">يرجى تعبئة البيانات التالية بدقة، سيتم التواصل معك لتأكيد طلبك وفحصه حياً.</div>

        <form onSubmit={handleSubmit}>
          <div className="field-grid">
            <div className="field">
              <label>الاسم الكامل</label>
              <input 
                required 
                placeholder="مثال: محمد أحمد" 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="field">
              <label>رقم الهاتف</label>
              <input 
                required 
                type="tel" 
                placeholder="06XXXXXXXX" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            
            <div className="field">
              <label>المدينة</label>
              <input 
                required 
                placeholder="مدينة الإقامة" 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            
            <div className="field">
              <label>العمر</label>
              <input 
                required 
                type="number" 
                min="1" 
                placeholder="العمر" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            
            <div className="field">
              <label>البريد الإلكتروني <span className="opt">(اختياري)</span></label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {isBelt ? (
              <>
                <div className="field">
                  <label>الحزام الحالي</label>
                  <select 
                    required 
                    value={currentBelt} 
                    onChange={(e) => setCurrentBelt(e.target.value)}
                  >
                    <option value="">اختر حزامك الحالي</option>
                    <option value="حزام أبيض">حزام أبيض</option>
                    <option value="حزام أزرق">حزام أزرق</option>
                    <option value="حزام بنفسجي">حزام بنفسجي</option>
                    <option value="حزام بني">حزام بني</option>
                  </select>
                </div>
                <div className="field">
                  <label>النادي أو الجمعية الحالية</label>
                  <input 
                    placeholder="اسم النادي الحالي" 
                    type="text" 
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="field">
                  <label>فئة الوزن المشارك به</label>
                  <select 
                    required 
                    value={weightClass} 
                    onChange={(e) => setWeightClass(e.target.value)}
                  >
                    <option value="">اختر فئة الوزن</option>
                    <option value="وزن الذبابة (Flyweight)">وزن الذبابة (Flyweight)</option>
                    <option value="وزن الديك (Bantamweight)">وزن الديك (Bantamweight)</option>
                    <option value="وزن الريشة (Featherweight)">وزن الريشة (Featherweight)</option>
                    <option value="الوزن الخفيف (Lightweight)">الوزن الخفيف (Lightweight)</option>
                    <option value="وزن ال웰تر (Welterweight)">وزن ال웰تر (Welterweight)</option>
                    <option value="الوزن المتوسط (Middleweight)">الوزن المتوسط (Middleweight)</option>
                  </select>
                </div>
                <div className="field">
                  <label>تاريخ التوافر اللوجستي</label>
                  <input 
                    required 
                    type="date" 
                    value={logisticDate}
                    onChange={(e) => setLogisticDate(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="field full">
              <label>ملاحظات إضافية</label>
              <textarea 
                placeholder="أي معلومات أو تفاصيل ترغب في إضافتها..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button className="submit-btn" type="submit">إرسال الطلب</button>
        </form>
      </div>
    </div>
  );
}