import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home.js';
import RegistrationForm from './components/RegistrationForm.js';
import SuccessView from './components/SuccessView.js';
import AdminLogin from './components/AdminLogin.js';
import AdminDashboard from './components/AdminDashboard.js';

// مكوّن وسيط لحماية مسار /admin والتحقق من التحديث
const ProtectedAdminRoute = () => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin-login" replace />;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* الصفحة الرئيسية */}
          <Route path="/" element={<Home />} />
          
          {/* صفحات التسجيل الديناميكية */}
          <Route path="/register/:type" element={<RegistrationForm />} />
          <Route path="/success" element={<SuccessView />} />
          
          {/* الإدارة وحماية المسار المباشر يدوياً */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdminRoute />} />
          
          {/* إعادة التوجيه التلقائي لأي مسار خاطئ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;