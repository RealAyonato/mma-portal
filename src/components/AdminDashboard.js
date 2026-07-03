import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد الانتقال بين الصفحات
import { db } from '../firebaseConfig.js';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // نظام حماية: إذا حاول شخص دخول لوحة التحكم بدون تسجيل دخول يتم طرده
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/admin-login');
    }
  }, [navigate]);

  // جلب البيانات الحية والتحديث الفوري من Firebase
  useEffect(() => {
    const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRegistrations(data);
      setLoading(false);
    }, (error) => {
      console.error("Error listening to registrations updates:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // دالة تسجيل الخروج الآمن
  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated'); // مسح جلسة الدخول
    navigate('/admin-login'); // التوجيه لصفحة تسجيل الدخول
  };

  // دالة فلترة البحث
  const filteredData = registrations.filter(row => 
    (row.name && row.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (row.phone && row.phone.includes(searchTerm))
  );

  if (loading) {
    return <div style={{ color: 'var(--paper)', textAlign: 'center', padding: '100px' }}>جاري جلب البيانات الحية من Firebase...</div>;
  }

  return (
    <div className="admin-page-wrapper dash">
      {/* الـ Header العلوي المحدث بالنص الجديد وزر تسجيل الخروج */}
      <div className="dash-top" style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
        <div>
          {/* النص التوضيحي المطلوب في الأعلى */}
          <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>بوابة الإدارة الرسمية</span>
          <h2 className="dash-title" style={{ marginTop: '5px', fontSize: '1.8rem' }}>لوحة تحكم إداريي أكاديمية آفاق الرياضية</h2>
        </div>
        
        {/* زر تسجيل الخروج الأنيق */}
        <button 
          onClick={handleLogout} 
          className="logout-btn"
          style={{
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: '0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#bd2130'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
        >
          ↩ تسجيل الخروج
        </button>
      </div>

      {/* بطاقات الإحصاء الفورية الديناميكية القادمة من Firebase */}
      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-num">{registrations.length}</div>
          <div className="stat-label">إجمالي الطلبات</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{registrations.filter(r => r.type === 'belt').length}</div>
          <div className="stat-label">طلبات اختبارات الأحزمة</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{registrations.filter(r => r.type === 'course').length}</div>
          <div className="stat-label">طلبات البطولات الوطنية</div>
        </div>
      </div>

      {/* شريط البحث وتصفية البيانات */}
      <div className="table-toolbar">
        <input 
          type="text" 
          placeholder="ابحث باسم المسجل أو رقم الهاتف..." 
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* جدول استعراض البيانات المستضافة الحية */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>الاسم الكامل</th>
              <th>رقم الهاتف</th>
              <th>المدينة</th>
              <th>نوع الطلب</th>
              <th>التفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: 'var(--paper-dim)' }}>لا توجد سجلات مطابقة حالياً في قاعدة بيانات Firebase.</td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.phone}</td>
                  <td>{row.city}</td>
                  <td>
                    <span className={`badge ${row.type}`}>
                      {row.type === 'belt' ? 'دورة أحزمة' : 'بطولة وطنية'}
                    </span>
                  </td>
                  <td>{row.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}