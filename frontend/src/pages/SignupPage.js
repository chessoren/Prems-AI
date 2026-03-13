import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Home, MapPin, Wrench, Calendar, User, Lock, Check, Copy, Share2, Gift, Sparkles, Building2, House, DoorOpen, ParkingCircle, TreePine, Accessibility, Dog, ChefHat, ArrowUpDown, Warehouse, Sun, Moon, Clock, Star } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* ============ SHARED COMPONENTS ============ */

const Chip = ({ label, selected, onClick, icon, badge, testId }) => (
  <motion.button
    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
    onClick={onClick} data-testid={testId}
    className={`relative flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-sm font-medium transition-all border ${selected ? 'bg-orange-500/10 border-orange-500/50 text-orange-400 shadow-sm shadow-orange-500/10' : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:border-neutral-600'}`}
  >
    {icon && <span className="text-base">{icon}</span>}
    {label}
    {selected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center ml-auto"><Check size={10} className="text-white" /></motion.div>}
    {badge && <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">{badge}</span>}
  </motion.button>
);

const FieldLabel = ({ children, optional }) => (
  <label className="text-neutral-400 text-xs mb-2 block font-medium">
    {children} {optional && <span className="text-neutral-600">(optionnel)</span>}
  </label>
);

const SkipButton = ({ onClick }) => (
  <button onClick={onClick} className="text-neutral-600 hover:text-neutral-400 text-xs transition-colors underline underline-offset-2" data-testid="skip-btn">
    Plus tard
  </button>
);

/* ============ STEP 1: HOUSING TYPE ============ */
const StepHousing = ({ data, update }) => {
  const types = [
    { value: 'Appartement', icon: <Building2 size={20} />, badge: 'Populaire' },
    { value: 'Maison', icon: <House size={20} /> },
    { value: 'Chambre', icon: <DoorOpen size={20} /> },
  ];
  const furnish = ['Indifférent', 'Non meublé', 'Meublé'];
  const rooms = ['Studio', 'T1', 'T2', 'T3', 'T4', '5+'];

  return (
    <div className="space-y-6">
      <div>
        <FieldLabel>Type de bien</FieldLabel>
        <div className="grid grid-cols-3 gap-3">
          {types.map(t => (
            <Chip key={t.value} label={t.value} icon={t.icon} selected={data.property_type === t.value}
              onClick={() => update('property_type', t.value)} badge={t.badge} testId={`housing-${t.value}`} />
          ))}
        </div>
      </div>
      <div>
        <FieldLabel>Meublé ?</FieldLabel>
        <div className="flex gap-2">
          {furnish.map(f => (
            <Chip key={f} label={f} selected={data.furnished === f}
              onClick={() => update('furnished', f)} testId={`furnish-${f}`} />
          ))}
        </div>
      </div>
      <div>
        <FieldLabel>Nombre de pièces minimum</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {rooms.map(r => (
            <Chip key={r} label={r} selected={data.min_rooms === r}
              onClick={() => update('min_rooms', r)} testId={`rooms-${r}`} />
          ))}
        </div>
      </div>
      <div>
        <FieldLabel>Surface minimum : <span className="text-orange-400 font-bold">{data.min_surface || 25} m²</span></FieldLabel>
        <input type="range" min="10" max="100" step="5" value={data.min_surface || 25}
          onChange={e => update('min_surface', parseInt(e.target.value))}
          className="w-full h-1.5 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-orange-500"
          data-testid="surface-slider" />
        <div className="flex justify-between text-[10px] text-neutral-600 mt-1">
          <span>10 m²</span><span>100 m²</span>
        </div>
      </div>
    </div>
  );
};

/* ============ STEP 2: LOCATION & BUDGET ============ */
const StepLocation = ({ data, update }) => {
  const locations = ['France métropolitaine', 'Outre-mer', "À l'étranger"];
  const deposits = ['Aucun dépôt', '1 mois de loyer'];

  return (
    <div className="space-y-5">
      <div>
        <FieldLabel>Ville ou département recherché</FieldLabel>
        <input type="text" value={data.search_cities || ''} onChange={e => update('search_cities', e.target.value)}
          placeholder="Paris, Lyon, 75011..." className="input-field" data-testid="search-cities" />
      </div>
      <div>
        <FieldLabel>Où habitez-vous actuellement ?</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {locations.map(l => (
            <Chip key={l} label={l} selected={data.current_location === l}
              onClick={() => update('current_location', l)} testId={`location-${l.slice(0,8)}`} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Budget min /mois</FieldLabel>
          <input type="text" value={data.budget_min || ''} onChange={e => update('budget_min', e.target.value)}
            placeholder="400 €" className="input-field" data-testid="budget-min" />
        </div>
        <div>
          <FieldLabel>Budget max /mois</FieldLabel>
          <input type="text" value={data.budget_max || ''} onChange={e => update('budget_max', e.target.value)}
            placeholder="1 200 €" className="input-field" data-testid="budget-max" />
        </div>
      </div>
      <div>
        <FieldLabel>Dépôt de garantie</FieldLabel>
        <div className="flex gap-2">
          {deposits.map(d => (
            <Chip key={d} label={d} selected={data.deposit === d}
              onClick={() => update('deposit', d)} testId={`deposit-${d.slice(0,5)}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============ STEP 3: EQUIPMENTS ============ */
const StepEquipments = ({ data, update }) => {
  const equips = [
    { value: 'Parking', icon: <ParkingCircle size={18} /> },
    { value: 'Balcon', icon: <Sun size={18} /> },
    { value: 'Ascenseur', icon: <ArrowUpDown size={18} /> },
    { value: 'Cuisine équipée', icon: <ChefHat size={18} /> },
    { value: 'Animaux OK', icon: <Dog size={18} /> },
    { value: 'Jardin', icon: <TreePine size={18} /> },
    { value: 'Cave', icon: <Warehouse size={18} /> },
    { value: 'PMR', icon: <Accessibility size={18} /> },
  ];

  const toggleEquip = (val) => {
    const current = data.equipments || [];
    update('equipments', current.includes(val) ? current.filter(e => e !== val) : [...current, val]);
  };

  return (
    <div className="space-y-5">
      <div>
        <FieldLabel>Équipements souhaités</FieldLabel>
        <div className="grid grid-cols-2 gap-2.5">
          {equips.map(eq => (
            <motion.button key={eq.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => toggleEquip(eq.value)} data-testid={`equip-${eq.value.slice(0,5)}`}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium border transition-all ${
                (data.equipments || []).includes(eq.value)
                  ? 'bg-orange-500/10 border-orange-500/50 text-orange-400'
                  : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:border-neutral-600'
              }`}
            >
              <span className={`transition-colors ${(data.equipments || []).includes(eq.value) ? 'text-orange-400' : 'text-neutral-600'}`}>{eq.icon}</span>
              {eq.value}
            </motion.button>
          ))}
        </div>
      </div>
      <div>
        <FieldLabel optional>Informations complémentaires</FieldLabel>
        <textarea value={data.additional_notes || ''} onChange={e => update('additional_notes', e.target.value)}
          placeholder="Précisez vos besoins..." rows={2}
          className="input-field resize-none" data-testid="additional-notes" />
      </div>
    </div>
  );
};

/* ============ STEP 4: CALENDAR ============ */
const StepCalendar = ({ data, update }) => {
  const urgencies = [
    { value: 'Urgent', desc: "Dans les 2 semaines", icon: '🔥' },
    { value: 'Normal', desc: "1 à 2 mois", icon: '📅' },
    { value: 'Flexible', desc: "Pas pressé", icon: '🌊' },
  ];
  const slots = [
    { value: 'Matin', icon: <Sun size={16} /> },
    { value: 'Après-midi', icon: <Clock size={16} /> },
    { value: 'Soir', icon: <Moon size={16} /> },
    { value: 'Week-end', icon: <Star size={16} /> },
  ];

  const toggleSlot = (val) => {
    const current = data.visit_availability || [];
    update('visit_availability', current.includes(val) ? current.filter(s => s !== val) : [...current, val]);
  };

  return (
    <div className="space-y-5">
      <div>
        <FieldLabel>Date d'emménagement souhaitée</FieldLabel>
        <input type="date" value={data.move_date || ''} onChange={e => update('move_date', e.target.value)}
          className="input-field" data-testid="move-date" />
      </div>
      <div>
        <FieldLabel>Niveau d'urgence</FieldLabel>
        <div className="space-y-2">
          {urgencies.map(u => (
            <motion.button key={u.value} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              onClick={() => update('urgency', u.value)} data-testid={`urgency-${u.value}`}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left border transition-all ${
                data.urgency === u.value
                  ? 'bg-orange-500/10 border-orange-500/50'
                  : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-600'
              }`}
            >
              <span className="text-xl">{u.icon}</span>
              <div>
                <p className={`text-sm font-semibold ${data.urgency === u.value ? 'text-orange-400' : 'text-neutral-300'}`}>{u.value}</p>
                <p className="text-[11px] text-neutral-500">{u.desc}</p>
              </div>
              {data.urgency === u.value && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                  <Check size={12} className="text-white" />
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
            <Chip key={s.value} label={s.value} icon={s.icon} selected={(data.visit_availability || []).includes(s.value)}
              onClick={() => toggleSlot(s.value)} testId={`slot-${s.value}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============ STEP 5: PROFILE ============ */
const StepProfile = ({ data, update }) => {
  const proStatuses = ['Salarié(e)', 'Indépendant(e)', 'Étudiant(e)', 'Fonctionnaire', 'Retraité(e)', 'Autre'];
  const guarantors = ['Aucun', 'Parents', 'Visale', 'Autre personne', 'Entreprise'];
  const hearSources = ['Réseaux sociaux', 'Bouche à oreille', 'Google', 'Article / Presse', 'Un ami', 'Autre'];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Prénom</FieldLabel>
          <input type="text" value={data.first_name || ''} onChange={e => update('first_name', e.target.value)}
            placeholder="Jean" className="input-field" data-testid="firstname" />
        </div>
        <div>
          <FieldLabel>Nom</FieldLabel>
          <input type="text" value={data.last_name || ''} onChange={e => update('last_name', e.target.value)}
            placeholder="Dupont" className="input-field" data-testid="lastname" />
        </div>
      </div>
      <div>
        <FieldLabel>Email</FieldLabel>
        <input type="email" value={data.email || ''} onChange={e => update('email', e.target.value)}
          placeholder="jean@email.com" className="input-field" data-testid="email" />
      </div>
      <div>
        <FieldLabel>Téléphone</FieldLabel>
        <input type="tel" value={data.phone || ''} onChange={e => update('phone', e.target.value)}
          placeholder="06 12 34 56 78" className="input-field" data-testid="phone" />
      </div>
      <div>
        <FieldLabel>Situation professionnelle</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {proStatuses.map(s => (
            <Chip key={s} label={s} selected={data.professional_status === s}
              onClick={() => update('professional_status', s)} testId={`pro-${s.slice(0,5)}`} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Revenus nets /mois</FieldLabel>
          <input type="text" value={data.monthly_income || ''} onChange={e => update('monthly_income', e.target.value)}
            placeholder="2 500 €" className="input-field" data-testid="income" />
        </div>
        <div>
          <FieldLabel>Type de garant</FieldLabel>
          <select value={data.guarantor_type || ''} onChange={e => update('guarantor_type', e.target.value)}
            className="input-field" data-testid="guarantor">
            <option value="">Sélectionner</option>
            {guarantors.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>
      <div>
        <FieldLabel>Comment avez-vous entendu parler de nous ?</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {hearSources.map(h => (
            <Chip key={h} label={h} selected={data.how_heard === h}
              onClick={() => update('how_heard', h)} testId={`heard-${h.slice(0,5)}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============ STEP 6: ACCOUNT ============ */
const StepAccount = ({ data, update }) => {
  const pwd = data.password || '';
  const checks = [
    { label: '8 caractères minimum', ok: pwd.length >= 8 },
    { label: 'Une majuscule', ok: /[A-Z]/.test(pwd) },
    { label: 'Un chiffre', ok: /[0-9]/.test(pwd) },
  ];
  const strength = checks.filter(c => c.ok).length;
  const strengthLabel = strength === 0 ? '' : strength === 1 ? 'Faible' : strength === 2 ? 'Moyen' : 'Excellent';
  const strengthColor = strength === 1 ? 'bg-red-500' : strength === 2 ? 'bg-yellow-500' : strength === 3 ? 'bg-green-500' : 'bg-neutral-800';

  return (
    <div className="space-y-5">
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 mb-2">
        <p className="text-neutral-500 text-xs">Inscription pour</p>
        <p className="text-white font-medium">{data.email || 'votre@email.com'}</p>
        {data.first_name && <p className="text-neutral-400 text-sm">{data.first_name} {data.last_name}</p>}
      </div>
      <div>
        <FieldLabel>Créez votre mot de passe</FieldLabel>
        <input type="password" value={pwd} onChange={e => update('password', e.target.value)}
          placeholder="Votre mot de passe sécurisé" className="input-field" data-testid="password" />
        {/* Strength bar */}
        <div className="flex gap-1 mt-3 mb-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-neutral-800'}`} />
          ))}
        </div>
        {pwd.length > 0 && (
          <p className={`text-xs font-medium ${strength === 3 ? 'text-green-400' : strength === 2 ? 'text-yellow-400' : 'text-red-400'}`}>
            {strengthLabel}
          </p>
        )}
        {/* Checks */}
        <div className="space-y-1.5 mt-3">
          {checks.map((c, i) => (
            <motion.div key={i} className="flex items-center gap-2 text-xs"
              animate={{ opacity: pwd.length > 0 ? 1 : 0.4 }}>
              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${c.ok ? 'bg-green-500' : 'bg-neutral-800'}`}>
                {c.ok && <Check size={8} className="text-white" />}
              </div>
              <span className={c.ok ? 'text-green-400' : 'text-neutral-500'}>{c.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <FieldLabel optional>Code de parrainage</FieldLabel>
        <input type="text" value={data.referral_code_used || ''} onChange={e => update('referral_code_used', e.target.value.toUpperCase())}
          placeholder="PREMS-XXXXX" className="input-field tracking-widest" data-testid="referral-input" />
      </div>
      <label className="flex items-start gap-3 cursor-pointer group" data-testid="cgu-check">
        <input type="checkbox" checked={data.cgu || false} onChange={e => update('cgu', e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-neutral-600 bg-neutral-800 accent-orange-500" />
        <span className="text-neutral-500 text-xs group-hover:text-neutral-400 transition-colors">
          J'accepte les <span className="text-orange-400 underline">conditions générales</span> et la <span className="text-orange-400 underline">politique de confidentialité</span>.
        </span>
      </label>
    </div>
  );
};

/* ============ WAITLIST CONFIRMATION ============ */
const WaitlistConfirmation = ({ status }) => {
  const [copied, setCopied] = useState(false);
  const shareText = `Je viens de m'inscrire sur Prems AI — le chasseur immobilier IA ! Utilise mon code ${status.referral_code} pour gagner des places : https://prems.ai`;

  const copyCode = () => { navigator.clipboard.writeText(status.referral_code); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="text-center py-6">
      <motion.div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center"
        initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.6, times: [0, 0.7, 1] }}>
        <Sparkles size={32} className="text-white" />
      </motion.div>
      <h2 className="font-serif text-3xl text-white mb-2">
        Merci{status.first_name ? `, ${status.first_name}` : ''} !
      </h2>
      <p className="text-neutral-400 text-sm mb-2">Vous êtes inscrit sur la waitlist de Prems AI.</p>
      <p className="text-neutral-500 text-xs mb-8">Les <span className="text-orange-400 font-bold">100 premiers</span> passeront en priorité à la prochaine ouverture.</p>

      <motion.div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-6 mb-5 max-w-xs mx-auto"
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Votre position</p>
        <motion.p className="text-5xl font-bold text-orange-400 font-serif"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          #{status.waitlist_position}
        </motion.p>
        <p className="text-neutral-500 text-xs mt-1">sur {status.total_waitlist} inscrits</p>
      </motion.div>

      <motion.div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 mb-5 max-w-xs mx-auto"
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Gift size={14} className="text-orange-400" />
          <p className="text-neutral-300 text-xs font-semibold">Votre code de parrainage</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span data-testid="referral-code" className="text-xl font-bold text-white tracking-wider font-mono">{status.referral_code}</span>
          <button onClick={copyCode} data-testid="copy-code-btn" className="p-1.5 rounded-lg hover:bg-neutral-800 transition-colors">
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-neutral-500" />}
          </button>
        </div>
        <p className="text-neutral-500 text-[11px] mt-2"><span className="text-orange-400 font-semibold">+10 places</span> par ami qui s'inscrit avec votre code</p>
      </motion.div>

      <motion.button
        onClick={() => { if (navigator.share) navigator.share({ text: shareText }); else { navigator.clipboard.writeText(shareText); setCopied(true); }}}
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:shadow-xl hover:shadow-orange-500/20"
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}
        data-testid="share-btn">
        <Share2 size={14} /> Inviter mes amis
      </motion.button>
    </motion.div>
  );
};

/* ============ STEPS CONFIG ============ */
const STEPS = [
  { key: 'housing', title: "Quel type de logement ?", icon: <Home size={18} />, skippable: false },
  { key: 'location', title: "Où et quel budget ?", icon: <MapPin size={18} />, skippable: true },
  { key: 'equipments', title: "Équipements souhaités", icon: <Wrench size={18} />, skippable: true },
  { key: 'calendar', title: "Votre calendrier", icon: <Calendar size={18} />, skippable: true },
  { key: 'profile', title: "Vos informations", icon: <User size={18} />, skippable: false },
  { key: 'account', title: "Créez votre compte", icon: <Lock size={18} />, skippable: false },
];

/* ============ MAIN SIGNUP PAGE ============ */
const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);
  const [waitlistStatus, setWaitlistStatus] = useState(null);
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
        ...data,
        min_surface: data.min_surface || null,
        equipments: data.equipments || [],
        visit_availability: data.visit_availability || [],
      });
      setWaitlistStatus(res.data);
      setCompleted(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Une erreur est survenue.");
    } finally { setLoading(false); }
  };

  const handleNext = () => {
    if (step === STEPS.length - 1) handleSubmit();
    else goNext();
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 })
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
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 py-6" data-testid="signup-page">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 80px)' }} />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => step > 0 ? goBack() : navigate('/')} className="text-neutral-600 hover:text-neutral-300 text-xs flex items-center gap-1 transition-colors" data-testid="back-btn">
            <ArrowLeft size={14} /> {step > 0 ? 'Retour' : 'Accueil'}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">P</span>
            </div>
            <span className="text-white font-semibold text-sm">Prems</span>
          </div>
        </div>

        {completed && waitlistStatus ? (
          <WaitlistConfirmation status={waitlistStatus} />
        ) : (
          <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Progress bar with step circles */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center justify-between mb-3">
                {STEPS.map((s, i) => (
                  <div key={i} className="flex items-center">
                    <motion.div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                        i < step ? 'bg-orange-500 border-orange-500 text-white' :
                        i === step ? 'bg-orange-500/20 border-orange-500 text-orange-400' :
                        'bg-neutral-800 border-neutral-700 text-neutral-500'
                      }`}
                      animate={i === step ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {i < step ? <Check size={12} /> : i + 1}
                    </motion.div>
                    {i < STEPS.length - 1 && (
                      <div className="w-4 sm:w-6 h-0.5 mx-0.5">
                        <motion.div className={`h-full rounded-full ${i < step ? 'bg-orange-500' : 'bg-neutral-800'}`}
                          animate={{ scaleX: i < step ? 1 : 0 }} style={{ transformOrigin: 'left' }}
                          transition={{ duration: 0.4, delay: 0.1 }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content area */}
            <div ref={formRef} className="px-6 pb-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={step} custom={direction} variants={slideVariants}
                  initial="enter" animate="center" exit="exit" transition={{ duration: 0.2, ease: "easeOut" }}>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                      {STEPS[step].icon}
                    </div>
                    <h2 className="font-serif text-xl text-white">{STEPS[step].title}</h2>
                  </div>
                  <div className="mb-5 h-px" />
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mt-4">
                  {error}
                </motion.p>
              )}
            </div>

            {/* Bottom actions */}
            <div className="px-6 py-4 border-t border-neutral-800/50 flex items-center gap-3">
              {STEPS[step].skippable && <SkipButton onClick={goNext} />}
              <motion.button
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
                onClick={handleNext}
                disabled={loading || (step >= 4 && !canSubmit())}
                data-testid="next-btn"
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-800 disabled:text-neutral-600 text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ml-auto"
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                ) : step === STEPS.length - 1 ? (
                  <>Créer mon compte <ArrowRight size={16} /></>
                ) : (
                  <>Continuer <ArrowRight size={16} /></>
                )}
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
