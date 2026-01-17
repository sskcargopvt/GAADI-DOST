import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, EMERGENCY_SERVICES } from '../constants';
import { Phone, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';

interface EmergencyPanelProps {
  lang: Language;
}

const EmergencyPanel: React.FC<EmergencyPanelProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [requestSent, setRequestSent] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  if (requestSent) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Help is on the way!</h2>
          <p className="text-gray-500 mt-2">Connecting you to nearest {selectedService}...</p>
        </div>
        
        <div className="bg-white dark:bg-dark-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 w-full max-w-sm">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full bg-[url('https://picsum.photos/100')] bg-cover"></div>
              <div className="text-left">
                <p className="font-bold dark:text-white">Raju Mechanic</p>
                <p className="text-xs text-gray-500">4.9 ★ • 2.5 km away</p>
              </div>
              <span className="ml-auto text-primary-600 font-bold">15 min</span>
           </div>
           <div className="flex gap-2">
             <button className="flex-1 bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600">
               <Phone size={18} /> Call
             </button>
             <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600">
               <MessageCircle size={18} /> Chat
             </button>
           </div>
        </div>

        <button 
          onClick={() => setRequestSent(false)} 
          className="text-gray-500 underline text-sm"
        >
          Cancel Request
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-4 rounded-xl flex items-start gap-3">
         <MapPin className="text-red-500 shrink-0 mt-1" />
         <div>
           <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Current Location</p>
           <p className="text-gray-800 dark:text-gray-200 font-medium text-sm">NH-48, Near Vadodara Bypass, Gujarat</p>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {EMERGENCY_SERVICES.map((service) => (
          <button
            key={service.id}
            onClick={() => {
              setSelectedService(service.name);
              // In a real app, we would confirm before sending
              setTimeout(() => setRequestSent(true), 500); 
            }}
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-dark-800 border-2 border-transparent hover:border-red-500 rounded-2xl shadow-sm transition-all active:scale-95 space-y-3"
          >
             {/* Using standard icons based on name for now */}
             <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 flex items-center justify-center">
               <span className="text-2xl font-bold capitalize">{service.name.charAt(0)}</span>
             </div>
             <span className="font-bold text-gray-800 dark:text-white text-sm">{service.name}</span>
             <span className="text-xs text-gray-400 bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded">{service.eta}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-red-600/30 animate-pulse hover:animate-none hover:bg-red-700 transition-colors">
           SOS - CALL POLICE
        </button>
      </div>
    </div>
  );
};

export default EmergencyPanel;