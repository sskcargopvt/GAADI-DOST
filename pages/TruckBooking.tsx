import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { MapPin, Truck, Star, Clock } from 'lucide-react';

interface TruckBookingProps {
    lang: Language;
}

const TruckBooking: React.FC<TruckBookingProps> = ({ lang }) => {
    const t = TRANSLATIONS[lang];
    const [searching, setSearching] = useState(false);

    // Mock trucks
    const trucks = [
        { id: 1, name: "Tata Ace Gold", driver: "Ramesh Kumar", rating: 4.8, eta: "5 min", price: "₹450" },
        { id: 2, name: "Mahindra Bolero", driver: "Suresh Yadav", rating: 4.5, eta: "12 min", price: "₹650" },
        { id: 3, name: "Eicher 14ft", driver: "Vikram Singh", rating: 4.9, eta: "25 min", price: "₹1200" },
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 relative bg-gray-200 dark:bg-dark-800 rounded-t-2xl overflow-hidden min-h-[300px]">
                {/* Map Placeholder */}
                <div className="absolute inset-0 bg-[url('https://picsum.photos/800/800')] bg-cover bg-center grayscale opacity-50" />
                
                {/* Pulse effect for user location */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-primary-600 rounded-full animate-ping absolute"></div>
                    <div className="w-4 h-4 bg-primary-600 rounded-full relative border-2 border-white shadow-lg"></div>
                </div>

                {/* Mock Truck icons on map */}
                <div className="absolute top-1/3 left-1/3 text-gray-800 bg-white p-1 rounded-full shadow-md"><Truck size={16}/></div>
                <div className="absolute bottom-1/3 right-1/4 text-gray-800 bg-white p-1 rounded-full shadow-md"><Truck size={16}/></div>
            </div>

            <div className="bg-white dark:bg-dark-900 -mt-4 rounded-t-3xl p-6 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-10">
                <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6" />
                
                <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-dark-800 p-3 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-green-500 ml-2" />
                        <input type="text" placeholder={t.pickup} className="bg-transparent w-full outline-none text-sm dark:text-white" />
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-dark-800 p-3 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-red-500 ml-2" />
                        <input type="text" placeholder={t.drop} className="bg-transparent w-full outline-none text-sm dark:text-white" />
                    </div>
                </div>

                {!searching ? (
                    <button 
                        onClick={() => setSearching(true)}
                        className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl text-lg hover:scale-[1.01] transition-transform"
                    >
                        {t.find_trucks}
                    </button>
                ) : (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-10">
                        <h3 className="font-bold text-gray-800 dark:text-white mb-2">Available Nearby</h3>
                        {trucks.map(truck => (
                            <div key={truck.id} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-primary-500 cursor-pointer transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 dark:bg-dark-700 p-2 rounded-lg">
                                        <Truck size={24} className="text-gray-600 dark:text-gray-300"/>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm dark:text-white">{truck.name}</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <span className="flex items-center gap-0.5"><Star size={10} className="fill-yellow-400 text-yellow-400" /> {truck.rating}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-0.5"><Clock size={10} /> {truck.eta}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg dark:text-white">{truck.price}</p>
                                    <button className="text-xs bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full font-medium">Book</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TruckBooking;