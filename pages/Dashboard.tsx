import React from 'react';
import { Page, Language, UserRole } from '../types';
import { TRANSLATIONS } from '../constants';
import { Map, Truck, Calculator, AlertTriangle, FileText, ChevronRight, Activity, TrendingUp } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  lang: Language;
  role: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, lang, role }) => {
  const t = TRANSLATIONS[lang];

  const StatCard = ({ label, value, color }: { label: string; value: string; color: string }) => (
    <div className="bg-white dark:bg-dark-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide">{label}</p>
      <div className={`text-2xl font-bold mt-1 ${color}`}>{value}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.welcome}</h2>
          <p className="text-gray-500 dark:text-gray-400">{role === UserRole.DRIVER ? 'Keep moving safely.' : 'Manage your logistics efficiently.'}</p>
        </div>
        
        {/* Quick actions for Driver */}
        {role === UserRole.DRIVER && (
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                <Activity size={16} /> Status: Available
            </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Trips" value="124" color="text-blue-600" />
        <StatCard label="Earnings" value="₹45k" color="text-green-600" />
        <StatCard label="Distance" value="3.2k km" color="text-orange-600" />
        <StatCard label="Rating" value="4.8 ★" color="text-yellow-500" />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-8 mb-4">Quick Access</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* GPS Card */}
        <button 
          onClick={() => onNavigate(Page.GPS_PANEL)}
          className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-95"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
            <Map size={60} />
          </div>
          <div className="relative z-10 flex flex-col items-start h-full">
            <div className="bg-white/20 p-2 rounded-lg mb-3">
              <Map size={24} />
            </div>
            <h3 className="text-xl font-bold mb-1">{t.gps_marketplace}</h3>
            <p className="text-blue-100 text-sm mb-4 text-left">Track vehicles, buy sensors & premium GPS.</p>
            <div className="mt-auto bg-white/20 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
              {t.gps_install} <ChevronRight size={12} />
            </div>
          </div>
        </button>

        {/* Emergency Card */}
        <button 
          onClick={() => onNavigate(Page.EMERGENCY)}
          className="group relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-95"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
            <AlertTriangle size={60} />
          </div>
          <div className="relative z-10 flex flex-col items-start h-full">
            <div className="bg-white/20 p-2 rounded-lg mb-3">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold mb-1">{t.emergency}</h3>
            <p className="text-red-100 text-sm mb-4 text-left">Mechanic, Towing, Police & Medical help.</p>
            <div className="mt-auto bg-white text-red-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
              {t.emergency_help} <ChevronRight size={12} />
            </div>
          </div>
        </button>

        {/* Load Calculator Card */}
        <button 
          onClick={() => onNavigate(Page.CALCULATOR)}
          className="group relative overflow-hidden bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm transition-all hover:border-primary-500 dark:hover:border-primary-500"
        >
          <div className="flex items-start justify-between mb-4">
             <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-3 rounded-xl">
               <Calculator size={24} />
             </div>
             <TrendingUp className="text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{t.load_calculator}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 text-left">AI-powered estimates for cost & fuel.</p>
        </button>

         {/* Truck Booking Card */}
         <button 
          onClick={() => onNavigate(Page.TRUCK_BOOKING)}
          className="group relative overflow-hidden bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm transition-all hover:border-primary-500 dark:hover:border-primary-500"
        >
          <div className="flex items-start justify-between mb-4">
             <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-3 rounded-xl">
               <Truck size={24} />
             </div>
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{t.truck_booking}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-left">Find loads or book trucks instantly.</p>
        </button>
        
        {/* Bilty Book Card */}
        <button 
          onClick={() => onNavigate(Page.BILTY)}
          className="group relative overflow-hidden bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm transition-all hover:border-primary-500 dark:hover:border-primary-500 md:col-span-2 lg:col-span-1"
        >
          <div className="flex items-start justify-between mb-4">
             <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 p-3 rounded-xl">
               <FileText size={24} />
             </div>
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{t.bilty_book}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-left">Manage invoices and PODs digitally.</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;