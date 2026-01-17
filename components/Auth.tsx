import React, { useState } from 'react';
import { UserRole, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Truck, Shield, Users, Briefcase, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface AuthProps {
  onLogin: (role: UserRole) => void;
  lang: Language;
  setLang: (l: Language) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, lang, setLang }) => {
  const [mode, setMode] = useState<'SIGN_IN' | 'SIGN_UP'>('SIGN_IN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.DRIVER);
  const t = TRANSLATIONS[lang];

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    // Simulate authentication
    if (email.includes('@') && password.length > 5) {
      onLogin(selectedRole);
    } else {
      alert("Please enter a valid email and a password with at least 6 characters.");
    }
  };

  const roles = [
    { key: UserRole.DRIVER, label: t.driver, icon: Truck },
    { key: UserRole.FLEET_OWNER, label: t.fleet_owner, icon: Users },
    { key: UserRole.TRANSPORTER, label: t.transporter, icon: Briefcase },
    { key: UserRole.CUSTOMER, label: t.customer, icon: UserRole },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 text-white">
      <div className="absolute top-6 right-6">
        <button 
          onClick={() => setLang(lang === Language.ENGLISH ? Language.HINDI : Language.ENGLISH)}
          className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 text-sm font-semibold"
        >
          {lang === Language.ENGLISH ? 'हिंदी में बदलें' : 'Switch to English'}
        </button>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary-500 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-primary-500/30">
            <Truck size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Gadi Dost</h1>
          <p className="text-gray-400">{t.login_subtitle}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleAuth} className="space-y-6">
             {/* Role Selection */}
             <div className="grid grid-cols-2 gap-3 mb-6">
                {roles.map((r) => (
                  <button
                    type="button"
                    key={r.key}
                    onClick={() => setSelectedRole(r.key)}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      selectedRole === r.key 
                        ? 'bg-primary-600 border-primary-500 text-white' 
                        : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {r.key === UserRole.CUSTOMER ? <Shield size={20} /> : <r.icon size={20} />}
                    <span className="text-xs font-medium">{r.label}</span>
                  </button>
                ))}
             </div>

             {/* Email Input */}
             <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.email}</label>
                <div className="flex bg-gray-900/50 border border-gray-600 rounded-xl overflow-hidden focus-within:border-primary-500 transition-colors">
                  <span className="px-4 py-3 text-gray-400 bg-gray-800 border-r border-gray-700 flex items-center">
                    <Mail size={18} />
                  </span>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-3 outline-none text-white placeholder-gray-500"
                    placeholder="you@example.com"
                  />
                </div>
             </div>

             {/* Password Input */}
             <div>
                <div className="flex justify-between items-center mb-2">
                   <label className="text-sm font-medium text-gray-300">{t.password}</label>
                   {mode === 'SIGN_IN' && (
                     <button type="button" className="text-xs text-primary-400 hover:text-primary-300">
                       {t.forgot_password}
                     </button>
                   )}
                </div>
                <div className="flex bg-gray-900/50 border border-gray-600 rounded-xl overflow-hidden focus-within:border-primary-500 transition-colors">
                  <span className="px-4 py-3 text-gray-400 bg-gray-800 border-r border-gray-700 flex items-center">
                    <Lock size={18} />
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-3 outline-none text-white placeholder-gray-500"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-4 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
             </div>

             {/* Submit Button */}
             <button 
               type="submit"
               className="w-full bg-primary-600 hover:bg-primary-500 active:scale-95 transition-all text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-600/20"
             >
               {mode === 'SIGN_IN' ? t.sign_in : t.sign_up}
             </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
             <p className="text-gray-400 text-sm">
               {mode === 'SIGN_IN' ? t.no_account : t.have_account}{' '}
               <button 
                 onClick={() => setMode(mode === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN')}
                 className="text-primary-400 font-bold hover:text-primary-300 transition-colors ml-1"
               >
                 {mode === 'SIGN_IN' ? t.sign_up : t.sign_in}
               </button>
             </p>
          </div>
        </div>
        
        <p className="text-center text-xs text-gray-500 mt-8">
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;