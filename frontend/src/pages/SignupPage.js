import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, ChevronRight, Check } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    budget: '',
    surface: '',
    dossierLink: ''
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden" data-testid="signup-page">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-orange-500/15 via-orange-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-orange-600/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 80px)' }} />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 max-w-xl mx-auto">
        <button onClick={() => navigate('/')} className="text-neutral-400 hover:text-white flex items-center gap-2 text-sm transition-colors" data-testid="back-btn">
          <ArrowLeft size={16} />
          Retour
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="text-white font-semibold text-sm">Prems</span>
        </div>
      </div>

      {/* Form card */}
      <div className="relative z-10 max-w-xl mx-auto px-6 pb-20">
        <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 md:p-10 shadow-2xl">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s ? 'bg-orange-500 text-white' : 'bg-neutral-800 text-neutral-500'}`}>
                  {step > s ? <Check size={14} /> : s}
                </div>
                {s < 2 && <div className={`w-12 h-0.5 rounded-full transition-all ${step > s ? 'bg-orange-500' : 'bg-neutral-800'}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <h1 className="font-serif text-3xl text-white mb-2">
                Cr&eacute;ez votre compte
              </h1>
              <p className="text-neutral-400 text-sm mb-8">
                Rejoignez les 500+ locataires qui ont d&eacute;l&eacute;gu&eacute; leur recherche.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 text-xs mb-1.5 block">Pr&eacute;nom</label>
                    <input
                      data-testid="signup-firstname"
                      type="text"
                      value={formData.firstName}
                      onChange={e => updateField('firstName', e.target.value)}
                      placeholder="Jean"
                      className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs mb-1.5 block">Nom</label>
                    <input
                      data-testid="signup-lastname"
                      type="text"
                      value={formData.lastName}
                      onChange={e => updateField('lastName', e.target.value)}
                      placeholder="Dupont"
                      className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-neutral-400 text-xs mb-1.5 block">Email</label>
                  <input
                    data-testid="signup-email"
                    type="email"
                    value={formData.email}
                    onChange={e => updateField('email', e.target.value)}
                    placeholder="jean@email.com"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 text-xs mb-1.5 block">T&eacute;l&eacute;phone</label>
                  <input
                    data-testid="signup-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => updateField('phone', e.target.value)}
                    placeholder="06 12 34 56 78"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                  />
                </div>
                <div className="relative">
                  <label className="text-neutral-400 text-xs mb-1.5 block">Mot de passe</label>
                  <input
                    data-testid="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => updateField('password', e.target.value)}
                    placeholder="Minimum 8 caractères"
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all pr-12"
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[34px] text-neutral-500 hover:text-neutral-300 transition-colors" type="button">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                data-testid="signup-next-btn"
                onClick={() => setStep(2)}
                className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:shadow-orange-500/20 group"
              >
                Continuer
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="font-serif text-3xl text-white mb-2">
                Vos crit&egrave;res
              </h1>
              <p className="text-neutral-400 text-sm mb-8">
                L'IA utilisera ces informations pour cibler les bonnes annonces.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-neutral-400 text-xs mb-1.5 block">Ville(s) recherch&eacute;e(s)</label>
                  <input
                    data-testid="signup-city"
                    type="text"
                    value={formData.city}
                    onChange={e => updateField('city', e.target.value)}
                    placeholder="Paris, Lyon, Bordeaux..."
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 text-xs mb-1.5 block">Budget max (/mois)</label>
                    <input
                      data-testid="signup-budget"
                      type="text"
                      value={formData.budget}
                      onChange={e => updateField('budget', e.target.value)}
                      placeholder="1200€"
                      className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs mb-1.5 block">Surface min (m&sup2;)</label>
                    <input
                      data-testid="signup-surface"
                      type="text"
                      value={formData.surface}
                      onChange={e => updateField('surface', e.target.value)}
                      placeholder="30 m²"
                      className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-neutral-400 text-xs mb-1.5 block">Lien vers votre dossier (DossierFacile, Drive...)</label>
                  <input
                    data-testid="signup-dossier"
                    type="url"
                    value={formData.dossierLink}
                    onChange={e => updateField('dossierLink', e.target.value)}
                    placeholder="https://www.dossierfacile.fr/..."
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3.5 rounded-xl text-sm font-medium text-neutral-400 border border-neutral-700 hover:border-neutral-600 hover:text-white transition-all"
                  data-testid="signup-back-btn"
                >
                  Retour
                </button>
                <button
                  data-testid="signup-submit-btn"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:shadow-orange-500/20 group"
                >
                  Lancer l'Autopilote
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </>
          )}

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1">
              <Check size={12} className="text-green-500" /> Sans engagement
            </span>
            <span className="flex items-center gap-1">
              <Check size={12} className="text-green-500" /> Satisfait ou rembours&eacute;
            </span>
            <span className="flex items-center gap-1">
              <Check size={12} className="text-green-500" /> Config en 3 min
            </span>
          </div>
        </div>

        {/* Testimonial snippet */}
        <div className="mt-8 text-center">
          <p className="text-neutral-500 text-sm italic">"J'ai eu 3 visites en une semaine."</p>
          <p className="text-neutral-600 text-xs mt-1">Thomas & L&eacute;a - Couple &agrave; Bordeaux</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
