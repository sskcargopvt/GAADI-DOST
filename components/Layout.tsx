import React from 'react';
import { 
  Home, 
  Map, 
  AlertTriangle, 
  Truck, 
  Calculator, 
  FileText, 
  Menu, 
  User, 
  Moon, 
  Sun,
  LogOut,
  Settings
} from 'lucide-react';
import { Language, Page, UserRole } from '../types';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  lang: Language;
  onToggleLang: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  role: UserRole;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  onNavigate, 
  lang, 
  onToggleLang, 
  darkMode, 
  onToggleTheme,
  role,
  onLogout
}) => {
  const t = TRANSLATIONS[lang];

  const NavItem = ({ page, icon: Icon, label }: { page: Page; icon: any; label: string }) => {
    const isActive = currentPage === page;
    return (
      <button
        onClick={() => onNavigate(page)}
        className={`flex flex-col items-center justify-center w-full p-2 transition-colors duration-200 ${
          isActive 
            ? 'text-primary-600 dark:text-primary-500' 
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        }`}
      >
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        <span className="text-[10px] mt-1 font-medium">{label}</span>
      </button>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''} bg-gray-50 dark:bg-dark-900`}>
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-red-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              G
            </div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight">Gadi Dost</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onToggleLang}
              className="px-2 py-1 text-xs font-bold border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {lang === Language.ENGLISH ? 'HI' : 'EN'}
            </button>
            <button 
              onClick={onToggleTheme}
              className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-400"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
                onClick={onLogout}
                className="p-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400"
            >
                <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center px-2 pb-safe z-50 md:hidden">
        <NavItem page={Page.DASHBOARD} icon={Home} label={t.home} />
        <NavItem page={Page.GPS_PANEL} icon={Map} label="GPS" />
        <NavItem page={Page.EMERGENCY} icon={AlertTriangle} label={t.emergency} />
        <NavItem page={Page.TRUCK_BOOKING} icon={Truck} label="Book" />
        <NavItem page={Page.CALCULATOR} icon={Calculator} label="Calc" />
      </nav>

      {/* Sidebar (Desktop - Optional enhancement) */}
      <div className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-700 p-4 space-y-2 z-40">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</h2>
          <button onClick={() => onNavigate(Page.DASHBOARD)} className={`flex items-center gap-3 p-3 rounded-lg w-full text-left ${currentPage === Page.DASHBOARD ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300'}`}>
            <Home size={20} /> {t.dashboard}
          </button>
          <button onClick={() => onNavigate(Page.GPS_PANEL)} className={`flex items-center gap-3 p-3 rounded-lg w-full text-left ${currentPage === Page.GPS_PANEL ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300'}`}>
            <Map size={20} /> {t.gps_marketplace}
          </button>
          <button onClick={() => onNavigate(Page.EMERGENCY)} className={`flex items-center gap-3 p-3 rounded-lg w-full text-left ${currentPage === Page.EMERGENCY ? 'bg-red-50 dark:bg-red-900/20 text-red-600' : 'hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300'}`}>
            <AlertTriangle size={20} /> {t.emergency}
          </button>
          <button onClick={() => onNavigate(Page.TRUCK_BOOKING)} className={`flex items-center gap-3 p-3 rounded-lg w-full text-left ${currentPage === Page.TRUCK_BOOKING ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300'}`}>
            <Truck size={20} /> {t.truck_booking}
          </button>
          <button onClick={() => onNavigate(Page.CALCULATOR)} className={`flex items-center gap-3 p-3 rounded-lg w-full text-left ${currentPage === Page.CALCULATOR ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300'}`}>
            <Calculator size={20} /> {t.load_calculator}
          </button>
          <button onClick={() => onNavigate(Page.BILTY)} className={`flex items-center gap-3 p-3 rounded-lg w-full text-left ${currentPage === Page.BILTY ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300'}`}>
            <FileText size={20} /> {t.bilty_book}
          </button>
          
          {role === UserRole.GUEST && (
             <div className="mt-auto p-4 bg-gray-100 dark:bg-dark-900 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Login to access full features</p>
                <button onClick={onLogout} className="w-full bg-primary-600 text-white py-2 rounded-md font-medium text-sm">Login</button>
             </div>
          )}
      </div>
    </div>
  );
};

export default Layout;