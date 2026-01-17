import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, SENSORS } from '../constants';
import { MapPin, Navigation, Settings, Shield, Zap, Plus, Check } from 'lucide-react';

interface GPSPanelProps {
  lang: Language;
}

const GPSPanel: React.FC<GPSPanelProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<'MAP' | 'STORE'>('MAP');

  return (
    <div className="space-y-4">
      <div className="flex gap-2 bg-gray-100 dark:bg-dark-800 p-1 rounded-lg w-fit">
        <button 
          onClick={() => setActiveTab('MAP')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'MAP' ? 'bg-white dark:bg-dark-700 shadow text-primary-600' : 'text-gray-500'}`}
        >
          Live Tracking
        </button>
        <button 
          onClick={() => setActiveTab('STORE')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'STORE' ? 'bg-white dark:bg-dark-700 shadow text-primary-600' : 'text-gray-500'}`}
        >
          GPS Store
        </button>
      </div>

      {activeTab === 'MAP' ? (
        <div className="space-y-4">
           {/* Mock Map */}
           <div className="relative w-full h-80 bg-gray-200 dark:bg-dark-800 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center">
              <div className="absolute inset-0 opacity-30 bg-[url('https://picsum.photos/800/600')] bg-cover bg-center grayscale" />
              <div className="z-10 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-6 rounded-xl text-center shadow-xl">
                <Navigation className="mx-auto text-primary-600 mb-2 animate-pulse" size={32} />
                <h3 className="font-bold text-gray-900 dark:text-white">Vehicle: MH-12-GJ-4589</h3>
                <p className="text-sm text-gray-500">Currently at Pune-Mumbai Expy</p>
                <div className="flex gap-4 mt-4 text-xs font-semibold text-gray-600 dark:text-gray-300">
                   <span className="flex items-center gap-1"><Zap size={14} className="text-yellow-500"/> 65 km/h</span>
                   <span className="flex items-center gap-1"><Shield size={14} className="text-green-500"/> Safe</span>
                </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-3">
              <button className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-left hover:border-primary-500 transition-colors">
                 <div className="bg-primary-50 dark:bg-primary-900/20 w-8 h-8 rounded-lg flex items-center justify-center text-primary-600 mb-2">
                    <Navigation size={18} />
                 </div>
                 <span className="font-semibold text-sm block">{t.route_history || 'Route History'}</span>
              </button>
              <button className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-left hover:border-primary-500 transition-colors">
                 <div className="bg-red-50 dark:bg-red-900/20 w-8 h-8 rounded-lg flex items-center justify-center text-red-600 mb-2">
                    <Shield size={18} />
                 </div>
                 <span className="font-semibold text-sm block">Geofencing</span>
              </button>
           </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-2xl shadow-xl">
             <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-xl font-bold">Premium GPS Kit</h3>
                  <p className="text-gray-400 text-sm mt-1 mb-4">Real-time tracking + Anti-theft engine lock</p>
                  <div className="text-2xl font-bold text-primary-500">₹4,999</div>
               </div>
               <div className="bg-white/10 p-3 rounded-full">
                  <Settings size={24} />
               </div>
             </div>
             <button className="mt-4 w-full bg-white text-gray-900 font-bold py-2.5 rounded-lg text-sm hover:bg-gray-100">
               {t.buy} & {t.schedule}
             </button>
          </div>

          <div>
             <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">{t.sensors} Marketplace</h3>
             <div className="grid gap-3">
               {SENSORS.map(sensor => (
                 <div key={sensor.id} className="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300">
                         {/* Placeholder icon logic */}
                         <Zap size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white">{sensor.name}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1">{sensor.description}</p>
                        <span className="text-primary-600 font-bold text-sm">₹{sensor.price}</span>
                      </div>
                    </div>
                    <button className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 p-2 rounded-lg hover:bg-primary-100 transition-colors">
                      <Plus size={20} />
                    </button>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GPSPanel;