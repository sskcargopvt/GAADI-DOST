import React, { useState } from 'react';
import { Language, LoadEstimate } from '../types';
import { TRANSLATIONS } from '../constants';
import { getLoadEstimate } from '../services/geminiService';
import { Calculator, Truck, Fuel, IndianRupee, Info } from 'lucide-react';

interface LoadCalculatorProps {
  lang: Language;
}

const LoadCalculator: React.FC<LoadCalculatorProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [material, setMaterial] = useState('');
  const [weight, setWeight] = useState('');
  const [distance, setDistance] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LoadEstimate | null>(null);

  const handleCalculate = async () => {
    if (!material || !weight || !distance) return;
    
    setLoading(true);
    setResult(null);
    try {
      const estimate = await getLoadEstimate(material, weight, distance);
      setResult(estimate);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calculator /> {t.load_calculator}
        </h2>
        <p className="text-white/80 text-sm mt-1">AI-Powered logistics estimator for India.</p>
      </div>

      <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.material}</label>
           <input 
             type="text" 
             value={material}
             onChange={(e) => setMaterial(e.target.value)}
             placeholder="e.g. Steel Pipes, Furniture, Rice Bags"
             className="w-full p-3 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none dark:text-white"
           />
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.weight}</label>
              <input 
                type="text" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 5 tons"
                className="w-full p-3 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.distance}</label>
              <input 
                type="number" 
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="e.g. 350"
                className="w-full p-3 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none dark:text-white"
              />
            </div>
         </div>

         <button 
           onClick={handleCalculate}
           disabled={loading}
           className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center"
         >
           {loading ? (
             <span className="animate-spin mr-2 border-2 border-current border-t-transparent rounded-full w-5 h-5"></span>
           ) : null}
           {loading ? t.calculating : t.estimate}
         </button>
      </div>

      {result && (
        <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-gray-50 dark:bg-dark-700 px-6 py-4 border-b border-gray-100 dark:border-gray-600">
             <h3 className="font-bold text-gray-800 dark:text-white">Estimate Result</h3>
          </div>
          <div className="p-6 grid gap-6">
             <div className="flex items-start gap-4">
               <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl text-green-600 dark:text-green-400">
                 <IndianRupee size={24} />
               </div>
               <div>
                 <p className="text-xs text-gray-500 uppercase font-semibold">Estimated Cost</p>
                 <p className="text-xl font-bold text-gray-900 dark:text-white">{result.estimatedCost}</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400">
                 <Truck size={24} />
               </div>
               <div>
                 <p className="text-xs text-gray-500 uppercase font-semibold">Recommended Truck</p>
                 <p className="text-lg font-bold text-gray-900 dark:text-white">{result.recommendedTruck}</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl text-orange-600 dark:text-orange-400">
                 <Fuel size={24} />
               </div>
               <div>
                 <p className="text-xs text-gray-500 uppercase font-semibold">Fuel & Toll</p>
                 <p className="text-sm font-medium text-gray-900 dark:text-white">Fuel: {result.fuelEstimate} | Toll: {result.tollEstimate}</p>
               </div>
             </div>
             
             <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl flex gap-3 text-sm text-blue-800 dark:text-blue-200">
                <Info size={18} className="shrink-0 mt-0.5" />
                <p>{result.explanation}</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadCalculator;