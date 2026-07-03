import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import logo from '../logo.svg';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setFetching(true);
    
    try {
      console.log("جاري محاولة تسجيل الدخول للمستخدم:", username);
      
      const q = query(
        collection(db, 'admins'), 
        where('username', '==', username), 
        where('password', '==', password)
      );
      
      const querySnapshot = await getDocs(q);
      
      console.log("هل تم العثور على حساب متطابق؟", !querySnapshot.empty);

      if (!querySnapshot.empty) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        console.log("تم حفظ الجلسة بنجاح، جاري التوجه للوحة التحكم...");
        navigate('/admin');
      } else {
        alert('خطأ في اسم المستخدم أو كلمة المرور الخاصة بالإدارة!');
      }
    } catch (error) {
      console.error("تفاصيل الخطأ القادم من Firebase:", error);
      alert('حدث خطأ أثناء الاتصال بقاعدة البيانات: ' + error.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-title">بوابة الإدارة الرياضية</h2>
        <p className="login-subtitle">سجل الدخول عبر قاعدة بيانات آفاق</p>
        
        <form onSubmit={handleLogin}>
          <div className="field">
            <label>اسم المسؤول</label>
            <input 
              type="text" 
              required 
              placeholder="أدخل اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={fetching}
            />
          </div>
          <div className="field">
            <label>كلمة المرور</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={fetching}
            />
          </div>
          <button type="submit" className="login-btn" disabled={fetching}>
            {fetching ? 'جاري التحقق...' : 'دخول لوحة التحكم'}
          </button>
        </form>
      </div>
    </div>
  );
}