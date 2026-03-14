import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Home, MapPin, Wrench, Calendar, User, Lock,
  Check, Building2, House, DoorOpen, ParkingCircle, TreePine, Accessibility,
  Dog, ChefHat, ArrowUpDown, Warehouse, Sun, Moon, Clock, Star, Zap
} from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* ============ SHARED ============ */
const Chip = ({ label, selected, onClick, icon, subtitle, badge, testId }) => (
  <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}
    onClick={onClick} data-testid={testId}
    className={`relative flex flex-col items-center gap-2 px-6 py-5 rounded-2xl text-sm font-medium transition-all border ${
      selected
        ? 'bg-orange-50 border-orange-300 text-orange-700 shadow-sm shadow-orange-100'
        : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:shadow-sm'
    }`}>
    {icon && <span className="text-2xl mb-1">{icon}</span>}
    <span className="font-semibold">{label}</span>
    {subtitle && <span className="text-[11px] text-neutral-400 font-normal">{subtitle}</span>}
    {selected && (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shadow-sm">
        <Check size={11} className="text-white" />
      </motion.div>
    )}
    {badge && (
      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[9px] px-2.5 py-0.5 rounded-full font-bold shadow-sm">
        {badge}
      </span>
    )}
  </motion.button>
);

const SmallChip = ({ label, selected, onClick, icon, testId }) => (
  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
    onClick={onClick} data-testid={testId}
    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
      selected
        ? 'bg-orange-50 border-orange-300 text-orange-700'
        : 'bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300'
    }`}>
    {icon && <span>{icon}</span>}
    {label}
    {selected && <Check size={12} className="text-orange-500 ml-1" />}
  </motion.button>
);

const FieldLabel = ({ children, optional }) => (
  <label className="text-neutral-500 text-xs tracking-wide mb-2 block font-semibold uppercase">
    {children} {optional && <span className="text-neutral-400 normal-case lowercase font-normal">(optionnel)</span>}
  </label>
);

const InputField = ({ testId, ...props }) => (
  <input {...props} data-testid={testId}
    className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-800 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" />
);

/* ============ STEPS ============ */
const StepHousing = ({ data, update }) => (
  <div className="space-y-8">
    <div>
      <FieldLabel>Type de bien</FieldLabel>
      <div className="grid grid-cols-3 gap-3">
        <Chip label="Appartement" subtitle="Studio à T5+" icon={<Building2 size={28} className="text-orange-500" />}
          selected={data.property_type === 'Appartement'} onClick={() => update('property_type', 'Appartement')}
          badge="Populaire" testId="housing-Appartement" />
        <Chip label="Maison" subtitle="Avec ou sans jardin" icon={<House size={28} className="text-orange-400" />}
          selected={data.property_type === 'Maison'} onClick={() => update('property_type', 'Maison')} testId="housing-Maison" />
        <Chip label="Chambre" subtitle="Colocation ou chez l'habitant" icon={<DoorOpen size={28} className="text-orange-400" />}
          selected={data.property_type === 'Chambre'} onClick={() => update('property_type', 'Chambre')} testId="housing-Chambre" />
      </div>
    </div>
    <div>
      <FieldLabel>Meublé ?</FieldLabel>
      <div className="flex flex-wrap gap-2">
        {['Indifférent', 'Non meublé', 'Meublé'].map(f => (
          <SmallChip key={f} label={f} selected={data.furnished === f} onClick={() => update('furnished', f)} testId={`furnish-${f}`} />
        ))}
      </div>
    </div>
    <div>
      <FieldLabel>Nombre de pièces minimum</FieldLabel>
      <div className="flex flex-wrap gap-2">
        {['Studio', 'T1', 'T2', 'T3', 'T4', '5+'].map(r => (
          <SmallChip key={r} label={r} selected={data.min_rooms === r} onClick={() => update('min_rooms', r)} testId={`rooms-${r}`} />
        ))}
      </div>
    </div>
    <div>
      <FieldLabel>Surface minimum : <span className="text-orange-500 font-bold normal-case">{data.min_surface || 25} m²</span></FieldLabel>
      <input type="range" min="10" max="100" step="5" value={data.min_surface || 25}
        onChange={e => update('min_surface', parseInt(e.target.value))}
        className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-orange-500 mt-2"
        data-testid="surface-slider" />
      <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
        <span>10 m²</span><span>100 m²</span>
      </div>
    </div>
  </div>
);

const StepLocation = ({ data, update }) => (
  <div className="space-y-8">
    <div>
      <FieldLabel>Ville ou département recherché</FieldLabel>
      <InputField type="text" value={data.search_cities || ''} onChange={e => update('search_cities', e.target.value)}
        placeholder="Paris, Lyon, 75011..." testId="search-cities" />
    </div>
    <div>
      <FieldLabel>Où habitez-vous actuellement ?</FieldLabel>
      <div className="flex flex-wrap gap-2">
        {['France métropolitaine', 'Outre-mer', "À l'étranger"].map(l => (
          <SmallChip key={l} label={l} selected={data.current_location === l}
            onClick={() => update('current_location', l)} testId={`location-${l.slice(0,8)}`} />
        ))}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <FieldLabel>Budget min /mois</FieldLabel>
        <InputField type="text" value={data.budget_min || ''} onChange={e => update('budget_min', e.target.value)}
          placeholder="400 €" testId="budget-min" />
      </div>
      <div>
        <FieldLabel>Budget max /mois</FieldLabel>
        <InputField type="text" value={data.budget_max || ''} onChange={e => update('budget_max', e.target.value)}
          placeholder="1 200 €" testId="budget-max" />
      </div>
    </div>
    <div>
      <FieldLabel>Dépôt de garantie</FieldLabel>
      <div className="flex gap-2">
        {['Aucun dépôt', '1 mois de loyer'].map(d => (
          <SmallChip key={d} label={d} selected={data.deposit === d} onClick={() => update('deposit', d)} testId={`deposit-${d.slice(0,5)}`} />
        ))}
      </div>
    </div>
  </div>
);

const StepEquipments = ({ data, update }) => {
  const equips = [
    { value: 'Parking', icon: <ParkingCircle size={20} /> }, { value: 'Balcon', icon: <Sun size={20} /> },
    { value: 'Ascenseur', icon: <ArrowUpDown size={20} /> }, { value: 'Cuisine équipée', icon: <ChefHat size={20} /> },
    { value: 'Animaux OK', icon: <Dog size={20} /> }, { value: 'Jardin', icon: <TreePine size={20} /> },
    { value: 'Cave', icon: <Warehouse size={20} /> }, { value: 'PMR', icon: <Accessibility size={20} /> },
  ];
  const toggleEquip = (val) => {
    const current = data.equipments || [];
    update('equipments', current.includes(val) ? current.filter(e => e !== val) : [...current, val]);
  };
  return (
    <div className="space-y-8">
      <div>
        <FieldLabel>Équipements souhaités</FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          {equips.map(eq => (
            <SmallChip key={eq.value} label={eq.value} icon={eq.icon}
              selected={(data.equipments || []).includes(eq.value)}
              onClick={() => toggleEquip(eq.value)} testId={`equip-${eq.value.slice(0,5)}`} />
          ))}
        </div>
      </div>
      <div>
        <FieldLabel optional>Informations complémentaires</FieldLabel>
        <textarea value={data.additional_notes || ''} onChange={e => update('additional_notes', e.target.value)}
          placeholder="Précisez vos besoins..." rows={3} data-testid="additional-notes"
          className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-800 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none" />
      </div>
    </div>
  );
};

const StepCalendar = ({ data, update }) => {
  const urgencies = [
    { value: 'Urgent', desc: "Dans les 2 semaines", icon: <Zap size={18} className="text-red-500" /> },
    { value: 'Normal', desc: "1 à 2 mois", icon: <Calendar size={18} className="text-orange-500" /> },
    { value: 'Flexible', desc: "Pas pressé", icon: <Clock size={18} className="text-blue-500" /> },
  ];
  const slots = [
    { value: 'Matin', icon: <Sun size={16} /> }, { value: 'Après-midi', icon: <Clock size={16} /> },
    { value: 'Soir', icon: <Moon size={16} /> }, { value: 'Week-end', icon: <Star size={16} /> },
  ];
  const toggleSlot = (val) => {
    const current = data.visit_availability || [];
    update('visit_availability', current.includes(val) ? current.filter(s => s !== val) : [...current, val]);
  };
  return (
    <div className="space-y-8">
      <div>
        <FieldLabel>Date d'emménagement souhaitée</FieldLabel>
        <InputField type="date" value={data.move_date || ''} onChange={e => update('move_date', e.target.value)} testId="move-date" />
      </div>
      <div>
        <FieldLabel>Niveau d'urgence</FieldLabel>
        <div className="space-y-3">
          {urgencies.map(u => (
            <motion.button key={u.value} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              onClick={() => update('urgency', u.value)} data-testid={`urgency-${u.value}`}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left border transition-all ${
                data.urgency === u.value ? 'bg-orange-50 border-orange-300 shadow-sm' : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}>
              <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center">{u.icon}</div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${data.urgency === u.value ? 'text-orange-700' : 'text-neutral-700'}`}>{u.value}</p>
                <p className="text-[12px] text-neutral-400 mt-0.5">{u.desc}</p>
              </div>
              {data.urgency === u.value && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                  <Check size={13} className="text-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
      <div>
        <FieldLabel>Disponibilités pour les visites</FieldLabel>
        <div className="grid grid-cols-2 gap-2">
          {slots.map(s => (
            <SmallChip key={s.value} label={s.value} icon={s.icon}
              selected={(data.visit_availability || []).includes(s.value)}
              onClick={() => toggleSlot(s.value)} testId={`slot-${s.value}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StepProfile = ({ data, update }) => (
  <div className="space-y-7">
    <div className="grid grid-cols-2 gap-4">
      <div><FieldLabel>Prénom</FieldLabel><InputField type="text" value={data.first_name || ''} onChange={e => update('first_name', e.target.value)} placeholder="Jean" testId="firstname" /></div>
      <div><FieldLabel>Nom</FieldLabel><InputField type="text" value={data.last_name || ''} onChange={e => update('last_name', e.target.value)} placeholder="Dupont" testId="lastname" /></div>
    </div>
    <div><FieldLabel>Email</FieldLabel><InputField type="email" value={data.email || ''} onChange={e => update('email', e.target.value)} placeholder="jean@email.com" testId="email" /></div>
    <div><FieldLabel>Téléphone</FieldLabel><InputField type="tel" value={data.phone || ''} onChange={e => update('phone', e.target.value)} placeholder="06 12 34 56 78" testId="phone" /></div>
    <div>
      <FieldLabel>Situation professionnelle</FieldLabel>
      <div className="flex flex-wrap gap-2">
        {['Salarié(e)', 'Indépendant(e)', 'Étudiant(e)', 'Fonctionnaire', 'Retraité(e)', 'Autre'].map(s => (
          <SmallChip key={s} label={s} selected={data.professional_status === s} onClick={() => update('professional_status', s)} testId={`pro-${s.slice(0,5)}`} />
        ))}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div><FieldLabel>Revenus nets /mois</FieldLabel><InputField type="text" value={data.monthly_income || ''} onChange={e => update('monthly_income', e.target.value)} placeholder="2 500 €" testId="income" /></div>
      <div><FieldLabel>Type de garant</FieldLabel>
        <select value={data.guarantor_type || ''} onChange={e => update('guarantor_type', e.target.value)} data-testid="guarantor"
          className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-800 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all">
          <option value="">Sélectionner</option>
          {['Aucun', 'Parents', 'Visale', 'Autre personne', 'Entreprise'].map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>
    </div>
    <div>
      <FieldLabel>Comment avez-vous entendu parler de nous ?</FieldLabel>
      <div className="flex flex-wrap gap-2">
        {['Réseaux sociaux', 'Bouche à oreille', 'Google', 'Article / Presse', 'Un ami', 'Autre'].map(h => (
          <SmallChip key={h} label={h} selected={data.how_heard === h} onClick={() => update('how_heard', h)} testId={`heard-${h.slice(0,5)}`} />
        ))}
      </div>
    </div>
  </div>
);

const StepAccount = ({ data, update }) => {
  const pwd = data.password || '';
  const checks = [
    { label: '8 caractères minimum', ok: pwd.length >= 8 },
    { label: 'Une majuscule', ok: /[A-Z]/.test(pwd) },
    { label: 'Un chiffre', ok: /[0-9]/.test(pwd) },
  ];
  const strength = checks.filter(c => c.ok).length;
  const strengthLabel = strength === 1 ? 'Faible' : strength === 2 ? 'Moyen' : strength === 3 ? 'Excellent' : '';
  const strengthColor = strength === 1 ? 'bg-red-400' : strength === 2 ? 'bg-yellow-400' : strength === 3 ? 'bg-green-400' : 'bg-neutral-200';
  return (
    <div className="space-y-8">
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
        <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Inscription pour</p>
        <p className="text-neutral-900 font-semibold text-lg">{data.email || 'votre@email.com'}</p>
        {data.first_name && <p className="text-neutral-500 text-sm mt-0.5">{data.first_name} {data.last_name}</p>}
      </div>
      <div>
        <FieldLabel>Créez votre mot de passe</FieldLabel>
        <InputField type="password" value={pwd} onChange={e => update('password', e.target.value)} placeholder="Votre mot de passe sécurisé" testId="password" />
        <div className="flex gap-1.5 mt-3 mb-1.5">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= strength ? strengthColor : 'bg-neutral-200'}`} />
          ))}
        </div>
        {pwd.length > 0 && <p className={`text-xs font-semibold ${strength === 3 ? 'text-green-600' : strength === 2 ? 'text-yellow-600' : 'text-red-500'}`}>{strengthLabel}</p>}
        <div className="space-y-1.5 mt-3">
          {checks.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${c.ok ? 'bg-green-400' : 'bg-neutral-200'}`}>
                {c.ok && <Check size={9} className="text-white" />}
              </div>
              <span className={c.ok ? 'text-green-700' : 'text-neutral-400'}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <FieldLabel optional>Code de parrainage</FieldLabel>
        <InputField type="text" value={data.referral_code_used || ''} onChange={e => update('referral_code_used', e.target.value.toUpperCase())}
          placeholder="PREMS-XXXXX" testId="referral-input" />
      </div>
      <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-xl border border-neutral-200 hover:border-orange-300 transition-all bg-white" data-testid="cgu-check">
        <input type="checkbox" checked={data.cgu || false} onChange={e => update('cgu', e.target.checked)}
          className="mt-0.5 w-5 h-5 rounded accent-orange-500" />
        <span className="text-neutral-500 text-sm leading-relaxed">
          J'accepte les <span className="text-orange-500 underline underline-offset-2">conditions générales</span> et la <span className="text-orange-500 underline underline-offset-2">politique de confidentialité</span>.
        </span>
      </label>
    </div>
  );
};

/* ============ STEPS CONFIG ============ */
const STEPS = [
  { key: 'housing', title: "Quel type de logement ?", subtitle: "Prems trouvera les annonces parfaites pour vous", icon: <Home size={22} />, label: "Type", skippable: false },
  { key: 'location', title: "Où et quel budget ?", subtitle: "Définissez votre zone de recherche", icon: <MapPin size={22} />, label: "Location", skippable: true },
  { key: 'equipments', title: "Équipements souhaités", subtitle: "Ce qui compte pour votre quotidien", icon: <Wrench size={22} />, label: "Équipements", skippable: true },
  { key: 'calendar', title: "Votre calendrier", subtitle: "Quand souhaitez-vous emménager", icon: <Calendar size={22} />, label: "Calendrier", skippable: true },
  { key: 'profile', title: "Vos informations", subtitle: "Pour personnaliser votre recherche", icon: <User size={22} />, label: "Profil", skippable: false },
  { key: 'account', title: "Créez votre compte", subtitle: "Dernière étape, on y est presque", icon: <Lock size={22} />, label: "Compte", skippable: false },
];

/* ============ MAIN SIGNUP ============ */
const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [direction, setDirection] = useState(1);
  const formRef = useRef(null);

  const [data, setData] = useState({
    property_type: '', furnished: '', min_rooms: '', min_surface: 25,
    search_cities: '', current_location: '', budget_min: '', budget_max: '', deposit: '',
    equipments: [], additional_notes: '',
    move_date: '', urgency: '', visit_availability: [],
    first_name: '', last_name: '', email: '', phone: '',
    professional_status: '', monthly_income: '', guarantor_type: '', how_heard: '',
    password: '', referral_code_used: '', cgu: false,
  });

  const update = (field, value) => { setData(prev => ({ ...prev, [field]: value })); setError(''); };
  const canSubmit = () => {
    if (step === 4) return data.email && data.first_name && data.last_name;
    if (step === 5) return data.password?.length >= 8 && data.cgu;
    return true;
  };
  const goNext = () => { setDirection(1); setStep(s => Math.min(s + 1, STEPS.length - 1)); };
  const goBack = () => { setDirection(-1); setStep(s => Math.max(0, s - 1)); };

  const handleSubmit = async () => {
    if (!canSubmit()) return;
    setLoading(true); setError('');
    try {
      const res = await axios.post(`${API}/auth/register`, {
        ...data, min_surface: data.min_surface || null,
        equipments: data.equipments || [], visit_availability: data.visit_availability || [],
      });
      navigate('/dashboard', { state: { user: res.data, fresh: true } });
    } catch (err) {
      setError(err.response?.data?.detail || "Une erreur est survenue.");
    } finally { setLoading(false); }
  };

  const handleNext = () => { if (step === STEPS.length - 1) handleSubmit(); else goNext(); };

  const slideVariants = {
    enter: (dir) => ({ y: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir) => ({ y: dir > 0 ? -40 : 40, opacity: 0 })
  };

  const renderStep = () => {
    switch (step) {
      case 0: return <StepHousing data={data} update={update} />;
      case 1: return <StepLocation data={data} update={update} />;
      case 2: return <StepEquipments data={data} update={update} />;
      case 3: return <StepCalendar data={data} update={update} />;
      case 4: return <StepProfile data={data} update={update} />;
      case 5: return <StepAccount data={data} update={update} />;
      default: return null;
    }
  };

  useEffect(() => { if (formRef.current) formRef.current.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/80 via-amber-50/40 to-orange-100/30" data-testid="signup-page">
      {/* Top nav */}
      <div className="flex items-center justify-between px-8 py-5 max-w-5xl mx-auto">
        <button onClick={() => step > 0 ? goBack() : navigate('/')} data-testid="back-btn"
          className="text-neutral-500 hover:text-neutral-700 text-sm flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} /> {step > 0 ? 'Retour' : 'Accueil'}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="text-neutral-800 font-bold text-lg">Prems</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-full text-xs font-semibold">
            Étape <span className="text-neutral-900 font-bold">{step + 1}/{STEPS.length}</span>
          </span>
          <button onClick={() => navigate('/login')} className="text-neutral-500 hover:text-orange-500 text-sm font-medium transition-colors" data-testid="login-link">
            Se connecter
          </button>
        </div>
      </div>

      {/* Step indicator */}
      <div className="max-w-3xl mx-auto px-8 pt-4 pb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <motion.div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i < step ? 'bg-orange-500 text-white shadow-md shadow-orange-200' :
                  i === step ? 'bg-orange-500 text-white shadow-lg shadow-orange-300 scale-110' :
                  'bg-white text-neutral-400 border border-neutral-200'
                }`}
                  animate={i === step ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}>
                  {i < step ? <Check size={14} /> : i + 1}
                </motion.div>
                <span className={`text-[10px] font-medium ${i <= step ? 'text-orange-600' : 'text-neutral-400'}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-8 sm:w-16 lg:w-24 h-0.5 mx-1 sm:mx-2">
                  <div className={`h-full rounded-full transition-all duration-500 ${i < step ? 'bg-orange-400' : 'bg-neutral-200'}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content card */}
      <div className="max-w-2xl mx-auto px-6 pb-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-orange-100/30 border border-white/60 overflow-hidden">
          {/* Step icon + title */}
          <div className="text-center pt-10 pb-2 px-8">
            <motion.div key={`icon-${step}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-5 text-orange-500">
              {STEPS[step].icon}
            </motion.div>
            <motion.h2 key={`title-${step}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="font-serif text-2xl md:text-3xl text-neutral-900 mb-2">
              {STEPS[step].title}
            </motion.h2>
            <motion.p key={`sub-${step}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-neutral-400 text-sm">
              {STEPS[step].subtitle}
            </motion.p>
          </div>

          {/* Form */}
          <div ref={formRef} className="px-8 lg:px-12 pt-8 pb-6 max-h-[55vh] overflow-y-auto">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={step} custom={direction} variants={slideVariants}
                initial="enter" animate="center" exit="exit" transition={{ duration: 0.25, ease: "easeOut" }}>
                {renderStep()}
              </motion.div>
            </AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3 mt-6">
                {error}
              </motion.p>
            )}
          </div>

          {/* Bottom actions */}
          <div className="px-8 lg:px-12 py-6 border-t border-neutral-100 flex items-center gap-4">
            {STEPS[step].skippable && (
              <button onClick={goNext} data-testid="skip-btn"
                className="text-neutral-400 hover:text-neutral-600 text-sm font-medium transition-colors">
                Passer
              </button>
            )}
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              onClick={handleNext} disabled={loading || (step >= 4 && !canSubmit())} data-testid="next-btn"
              className="flex-1 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl ml-auto">
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
              ) : step === STEPS.length - 1 ? (
                <>Créer mon compte <ArrowRight size={18} /></>
              ) : (
                <>Continuer <ArrowRight size={18} /></>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
