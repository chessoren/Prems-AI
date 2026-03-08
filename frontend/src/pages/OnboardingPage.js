import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, Briefcase, MapPin, FileText, Megaphone, Check, Copy, Share2, Gift, ChevronRight, Sparkles } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* ========== STEP COMPONENTS ========== */

const StepIdentity = ({ data, update }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Prénom</label>
        <input data-testid="onb-firstname" type="text" value={data.first_name} onChange={e => update('first_name', e.target.value)} placeholder="Jean" className="input-field" />
      </div>
      <div>
        <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Nom</label>
        <input data-testid="onb-lastname" type="text" value={data.last_name} onChange={e => update('last_name', e.target.value)} placeholder="Dupont" className="input-field" />
      </div>
    </div>
    <div>
      <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Téléphone</label>
      <input data-testid="onb-phone" type="tel" value={data.phone} onChange={e => update('phone', e.target.value)} placeholder="06 12 34 56 78" className="input-field" />
    </div>
  </div>
);

const StepProfessional = ({ data, update }) => {
  const statuses = ['CDI', 'CDD', 'Freelance / Indépendant', 'Étudiant', 'Fonctionnaire', 'Retraité', 'Autre'];
  return (
    <div className="space-y-4">
      <div>
        <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Situation professionnelle</label>
        <div className="grid grid-cols-2 gap-2">
          {statuses.map(s => (
            <button key={s} type="button" data-testid={`onb-status-${s}`}
              onClick={() => update('professional_status', s)}
              className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all border ${data.professional_status === s ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Revenus mensuels nets</label>
        <input data-testid="onb-income" type="text" value={data.monthly_income} onChange={e => update('monthly_income', e.target.value)} placeholder="2 500 €" className="input-field" />
      </div>
      <div>
        <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Employeur <span className="text-neutral-600">(optionnel)</span></label>
        <input data-testid="onb-employer" type="text" value={data.employer} onChange={e => update('employer', e.target.value)} placeholder="Nom de l'entreprise" className="input-field" />
      </div>
    </div>
  );
};

const StepSearch = ({ data, update }) => {
  const types = ['Studio', 'T1', 'T2', 'T3', 'T4+', 'Colocation'];
  return (
    <div className="space-y-4">
      <div>
        <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Ville(s) recherchée(s)</label>
        <input data-testid="onb-cities" type="text" value={data.search_cities} onChange={e => update('search_cities', e.target.value)} placeholder="Paris, Lyon, Bordeaux..." className="input-field" />
      </div>
      <div>
        <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Type de bien</label>
        <div className="flex flex-wrap gap-2">
          {types.map(t => (
            <button key={t} type="button" data-testid={`onb-type-${t}`}
              onClick={() => update('property_type', t)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${data.property_type === t ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Budget max /mois</label>
          <input data-testid="onb-budget" type="text" value={data.max_budget} onChange={e => update('max_budget', e.target.value)} placeholder="1 200 €" className="input-field" />
        </div>
        <div>
          <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Surface minimum</label>
          <input data-testid="onb-surface" type="text" value={data.min_surface} onChange={e => update('min_surface', e.target.value)} placeholder="25 m²" className="input-field" />
        </div>
      </div>
      <div>
        <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Quartiers préférés <span className="text-neutral-600">(optionnel)</span></label>
        <input data-testid="onb-areas" type="text" value={data.preferred_areas} onChange={e => update('preferred_areas', e.target.value)} placeholder="11e, 12e, Bastille..." className="input-field" />
      </div>
    </div>
  );
};

const StepDossier = ({ data, update }) => (
  <div className="space-y-4">
    <div>
      <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Lien vers votre dossier locatif</label>
      <p className="text-neutral-600 text-[11px] mb-2">DossierFacile, Google Drive, Dropbox...</p>
      <input data-testid="onb-dossier" type="url" value={data.dossier_link} onChange={e => update('dossier_link', e.target.value)} placeholder="https://www.dossierfacile.fr/..." className="input-field" />
    </div>
    <div>
      <label className="text-neutral-400 text-xs mb-2 block font-medium">Avez-vous un garant ?</label>
      <div className="flex gap-3">
        {[true, false].map(v => (
          <button key={String(v)} type="button" data-testid={`onb-guarantor-${v}`}
            onClick={() => update('has_guarantor', v)}
            className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${data.has_guarantor === v ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700'}`}
          >
            {v ? 'Oui' : 'Non'}
          </button>
        ))}
      </div>
    </div>
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 mt-2">
      <p className="text-neutral-300 text-xs font-medium mb-1">Pas encore de dossier ?</p>
      <p className="text-neutral-500 text-[11px]">Créez votre dossier gratuitement sur <a href="https://www.dossierfacile.fr" target="_blank" rel="noreferrer" className="text-orange-400 hover:underline">DossierFacile.fr</a> — c'est gratuit et sécurisé.</p>
    </div>
  </div>
);

const StepDiscovery = ({ data, update }) => {
  const sources = ['Réseaux sociaux (TikTok, Instagram)', 'Bouche à oreille', 'Google', 'Article de presse', 'YouTube', 'Forum / Reddit', 'Un ami m\'a recommandé', 'Autre'];
  return (
    <div className="space-y-4">
      <div>
        <label className="text-neutral-400 text-xs mb-2 block font-medium">Comment avez-vous entendu parler de Prems ?</label>
        <div className="grid grid-cols-1 gap-2">
          {sources.map(s => (
            <button key={s} type="button" data-testid={`onb-heard-${s.slice(0,10)}`}
              onClick={() => update('how_heard', s)}
              className={`px-4 py-3 rounded-xl text-xs font-medium text-left transition-all border ${data.how_heard === s ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-2">
        <label className="text-neutral-400 text-xs mb-1.5 block font-medium">
          Code de parrainage <span className="text-neutral-600">(si quelqu'un vous a invité)</span>
        </label>
        <input data-testid="onb-referral-input" type="text" value={data.referred_by_code} onChange={e => update('referred_by_code', e.target.value.toUpperCase())} placeholder="PREMS-XXXXX" className="input-field tracking-widest" />
      </div>
    </div>
  );
};

/* ========== WAITLIST CONFIRMATION ========== */
const WaitlistConfirmation = ({ status }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(status.referral_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Je viens de m'inscrire sur Prems AI, le chasseur immobilier IA ! Utilise mon code ${status.referral_code} pour gagner des places. https://prems.ai`;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
      {/* Celebration animation */}
      <motion.div
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6, times: [0, 0.7, 1] }}
      >
        <Sparkles size={32} className="text-white" />
      </motion.div>

      <h2 className="font-serif text-3xl text-white mb-2">
        Bienvenue sur la waitlist{status.first_name ? `, ${status.first_name}` : ''} !
      </h2>
      <p className="text-neutral-400 text-sm mb-8">
        Les 100 premiers inscrits passeront en priorité à la prochaine ouverture.
      </p>

      {/* Position card */}
      <motion.div
        className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-6 mb-6 max-w-sm mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Votre position</p>
        <motion.p
          className="text-5xl font-bold text-orange-400 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          #{status.waitlist_position}
        </motion.p>
        <p className="text-neutral-500 text-xs mt-1">sur {status.total_waitlist} inscrits</p>
      </motion.div>

      {/* Referral code */}
      <motion.div
        className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 mb-6 max-w-sm mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Gift size={16} className="text-orange-400" />
          <p className="text-neutral-300 text-sm font-semibold">Votre code de parrainage</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span data-testid="referral-code" className="text-2xl font-bold text-white tracking-wider font-mono">{status.referral_code}</span>
          <button onClick={copyCode} data-testid="copy-code-btn" className="p-2 rounded-lg hover:bg-neutral-800 transition-colors">
            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-neutral-500" />}
          </button>
        </div>
        <p className="text-neutral-500 text-xs mt-3">
          <span className="text-orange-400 font-semibold">+10 places</span> gagnées pour chaque ami qui s'inscrit avec votre code
        </p>
      </motion.div>

      {/* Share button */}
      <motion.button
        onClick={() => {
          if (navigator.share) {
            navigator.share({ text: shareText });
          } else {
            navigator.clipboard.writeText(shareText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        }}
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:shadow-xl hover:shadow-orange-500/20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        data-testid="share-btn"
      >
        <Share2 size={16} /> Partager et gagner des places
      </motion.button>
    </motion.div>
  );
};

/* ========== MAIN ONBOARDING PAGE ========== */
const STEPS = [
  { key: 'identity', title: "Qui êtes-vous ?", subtitle: "On commence par les bases.", icon: <User size={18} />, required: ['first_name', 'last_name'] },
  { key: 'professional', title: "Votre situation", subtitle: "Pour adapter votre dossier.", icon: <Briefcase size={18} />, required: [] },
  { key: 'search', title: "Votre recherche", subtitle: "Dites-nous ce que vous cherchez.", icon: <MapPin size={18} />, required: [] },
  { key: 'dossier', title: "Votre dossier", subtitle: "Pour postuler automatiquement.", icon: <FileText size={18} />, required: [] },
  { key: 'discovery', title: "Dernière étape !", subtitle: "On veut mieux vous connaître.", icon: <Megaphone size={18} />, required: [] },
];

const OnboardingPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const userId = params.get('user_id');
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [waitlistStatus, setWaitlistStatus] = useState(null);
  const [direction, setDirection] = useState(1);

  const [data, setData] = useState({
    first_name: '', last_name: '', phone: '',
    professional_status: '', monthly_income: '', employer: '',
    search_cities: '', property_type: '', max_budget: '', min_surface: '', preferred_areas: '',
    dossier_link: '', has_guarantor: false,
    how_heard: '', referred_by_code: ''
  });

  const update = (field, value) => setData(prev => ({ ...prev, [field]: value }));

  useEffect(() => {
    if (!userId) navigate('/signup');
  }, [userId, navigate]);

  const canProceed = () => {
    const required = STEPS[step]?.required || [];
    return required.every(f => data[f]?.trim());
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep(s => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(s => Math.max(0, s - 1));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${API}/waitlist/complete-profile`, { user_id: userId, ...data });
      const res = await axios.get(`${API}/waitlist/status/${userId}`);
      setWaitlistStatus(res.data);
      setCompleted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 })
  };

  const renderStep = () => {
    switch (step) {
      case 0: return <StepIdentity data={data} update={update} />;
      case 1: return <StepProfessional data={data} update={update} />;
      case 2: return <StepSearch data={data} update={update} />;
      case 3: return <StepDossier data={data} update={update} />;
      case 4: return <StepDiscovery data={data} update={update} />;
      default: return null;
    }
  };

  if (!userId) return null;

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 py-8 relative" data-testid="onboarding-page">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 80px)' }} />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Back to home */}
        <button onClick={() => navigate('/')} className="text-neutral-600 hover:text-neutral-400 text-xs mb-6 flex items-center gap-1 transition-colors" data-testid="back-home">
          <ArrowLeft size={14} /> Retour
        </button>

        {completed && waitlistStatus ? (
          <WaitlistConfirmation status={waitlistStatus} />
        ) : (
          <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl">
            {/* Progress bar */}
            <div className="h-1 bg-neutral-800 rounded-full mb-8 overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1.5">
                {STEPS.map((s, i) => (
                  <motion.div key={i} className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-orange-500 w-6' : i < step ? 'bg-orange-500/40' : 'bg-neutral-700'}`} layout />
                ))}
              </div>
              <span className="text-neutral-600 text-xs ml-auto">{step + 1}/{STEPS.length}</span>
            </div>

            {/* Step header */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={`header-${step}`} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                    {STEPS[step].icon}
                  </div>
                  <h2 className="font-serif text-2xl text-white">{STEPS[step].title}</h2>
                </div>
                <p className="text-neutral-500 text-sm mb-6 ml-11">{STEPS[step].subtitle}</p>
              </motion.div>
            </AnimatePresence>

            {/* Step content */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={`content-${step}`} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 mt-8">
              {step > 0 && (
                <button onClick={handleBack} data-testid="onb-back-btn" className="px-5 py-3 rounded-xl text-sm font-medium text-neutral-400 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-all">
                  <ArrowLeft size={16} />
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={loading || (STEPS[step].required.length > 0 && !canProceed())}
                data-testid="onb-next-btn"
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-800 disabled:text-neutral-600 text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:shadow-orange-500/20 active:scale-[0.98]"
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                ) : step === STEPS.length - 1 ? (
                  <>Rejoindre la waitlist <ChevronRight size={16} /></>
                ) : (
                  <>Continuer <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
