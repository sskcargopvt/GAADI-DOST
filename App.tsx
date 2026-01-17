import React, { useState, useEffect } from 'react';
import { UserRole, Language, Page } from './types';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Dashboard from './pages/Dashboard';
import GPSPanel from './pages/GPSPanel';
import EmergencyPanel from './pages/EmergencyPanel';
import LoadCalculator from './pages/LoadCalculator';
import TruckBooking from './pages/TruckBooking';
import { FileText, ExternalLink } from 'lucide-react';

// Bilty component (simple placeholder)
const BiltyBook = ({ lang }: { lang: Language }) => (
    <div className="text-center p-8 bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/20 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Bilty Book Integration</h2>
        <p className="text-gray-500 mb-6">Manage all your transport receipts (Bilty) and Proof of Delivery (POD) in one place.</p>
        
        <div className="bg-gray-50 dark:bg-dark-900 p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 mb-6">
            <p className="text-sm font-medium text-gray-400">Drag & Drop Bilty PDF here</p>
        </div>

        <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary-600 font-bold hover:underline"
            onClick={(e) => { e.preventDefault(); alert("Redirecting to your Bilty Book ERP..."); }}
        >
            Access Full Bilty Dashboard <ExternalLink size={16} />
        </a>
    </div>
);

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [lang, setLang] = useState<Language>(Language.ENGLISH);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
    }
  }, []);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentPage(Page.DASHBOARD);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage(Page.LOGIN);
  };

  // Render content based on current page
  const renderContent = () => {
    switch (currentPage) {
      case Page.DASHBOARD:
        return <Dashboard onNavigate={setCurrentPage} lang={lang} role={userRole!} />;
      case Page.GPS_PANEL:
        return <GPSPanel lang={lang} />;
      case Page.EMERGENCY:
        return <EmergencyPanel lang={lang} />;
      case Page.CALCULATOR:
        return <LoadCalculator lang={lang} />;
      case Page.TRUCK_BOOKING:
        return <TruckBooking lang={lang} />;
      case Page.BILTY:
        return <BiltyBook lang={lang} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} lang={lang} role={userRole!} />;
    }
  };

  if (!userRole) {
    return (
        <div className={darkMode ? 'dark' : ''}>
            <Auth onLogin={handleLogin} lang={lang} setLang={setLang} />
        </div>
    );
  }

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      lang={lang}
      onToggleLang={() => setLang(lang === Language.ENGLISH ? Language.HINDI : Language.ENGLISH)}
      darkMode={darkMode}
      onToggleTheme={() => setDarkMode(!darkMode)}
      role={userRole}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;