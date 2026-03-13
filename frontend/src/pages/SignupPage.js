import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Home, MapPin, Wrench, Calendar, User, Lock,
  Check, Copy, Share2, Gift, Sparkles, Building2, House, DoorOpen,
  ParkingCircle, TreePine, Accessibility, Dog, ChefHat, ArrowUpDown,
  Warehouse, Sun, Moon, Clock, Star, CheckCircle2, Zap, Send, Shield
} from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* ============ CLIPBOARD HELPER ============ */
const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
};

/* ============ SHARED ============ */
const Chip = ({ label, selected, onClick, icon, badge, testId }) => (
  <motion.button
    whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.96 }}
    onClick={onClick} data-testid={testId}
    className={`relative flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-medium transition-all border backdrop-blur-sm ${
      selected
        ? 'bg-orange-500/12 border-orange-400/40 text-orange-300 shadow-lg shadow-orange-500/5'
        : 'bg-white/[0.03] border-white/[0.06] text-neutral-400 hover:border-white/[0.12] hover:bg-white/[0.05]'
    }`}
  >
    {icon && <span className="text-lg">{icon}</span>}
    {label}
    {selected && (
      <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
        className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center ml-auto">
        <Check size={11} className="text-white" />
      </motion.div>
    )}
    {badge && (
      <span className="absolute -top-2.5 -right-2 bg-orange-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold shadow-lg shadow-orange-500/30">
        {badge}
      </span>
    )}
  </motion.button>
);

const FieldLabel = ({ children, optional }) => (
  <label className="text-neutral-400 text-xs tracking-wide mb-2.5 block font-medium uppercase">
    {children} {optional && <span className="text-neutral-600 normal-case lowercase">(optionnel)</span>}
  </label>
);

const SkipButton = ({ onClick }) => (
  <button onClick={onClick} data-testid="skip-btn"
    className="text-neutral-500 hover:text-neutral-300 text-sm transition-colors font-medium">
    Plus tard
  </button>
);

/* ============ LEFT PANEL ILLUSTRATIONS ============ */
const StepIllustration = ({ step }) => {
  const illustrations = [
    /* Step 0: Housing */
    <div key="housing" className="relative flex items-center justify-center h-full">
      <motion.div className="relative" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 border border-orange-500/10 flex items-center justify-center backdrop-blur-xl">
          <Building2 size={64} className="text-orange-400/60" />
        </div>
        {[
          { x: -80, y: -60, icon: <House size={20} />, delay: 0.3 },
          { x: 80, y: -40, icon: <DoorOpen size={20} />, delay: 0.5 },
          { x: -60, y: 60, icon: <Warehouse size={18} />, delay: 0.7 },
        ].map((orb, i) => (
          <motion.div key={i} className="absolute top-1/2 left-1/2 w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-orange-400/40"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: orb.x, y: orb.y, opacity: 1 }}
            transition={{ delay: orb.delay, duration: 0.6, type: "spring" }}>
            {orb.icon}
          </motion.div>
        ))}
      </motion.div>
    </div>,

    /* Step 1: Location */
    <div key="location" className="relative flex items-center justify-center h-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="relative w-56 h-56">
          <motion.div className="absolute inset-0 rounded-full border border-orange-500/10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
          <motion.div className="absolute inset-4 rounded-full border border-orange-500/15"
            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.2, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
          <motion.div className="absolute inset-8 rounded-full border border-orange-500/20"
            animate={{ scale: [1, 1.03, 1], opacity: [0.5, 0.3, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/30 to-orange-600/10 flex items-center justify-center border border-orange-500/20">
              <MapPin size={28} className="text-orange-400" />
            </div>
          </div>
          {['Paris', 'Lyon', 'Bordeaux'].map((city, i) => (
            <motion.div key={city} className="absolute text-[11px] text-neutral-500 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-full"
              style={{ top: `${20 + i * 30}%`, left: i % 2 === 0 ? '-30%' : '80%' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.3 }}>
              {city}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>,

    /* Step 2: Equipment */
    <div key="equip" className="relative flex items-center justify-center h-full">
      <motion.div className="grid grid-cols-3 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {[
          { icon: <ParkingCircle size={22} />, delay: 0 },
          { icon: <Sun size={22} />, delay: 0.1 },
          { icon: <ArrowUpDown size={22} />, delay: 0.2 },
          { icon: <ChefHat size={22} />, delay: 0.3 },
          { icon: <Dog size={22} />, delay: 0.4 },
          { icon: <TreePine size={22} />, delay: 0.5 },
        ].map((item, i) => (
          <motion.div key={i} className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-orange-400/40"
            initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: item.delay, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, borderColor: 'rgba(249,115,22,0.3)' }}>
            {item.icon}
          </motion.div>
        ))}
      </motion.div>
    </div>,

    /* Step 3: Calendar */
    <div key="calendar" className="relative flex items-center justify-center h-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="w-52 rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-neutral-400 text-xs font-medium">Mars 2026</span>
            <Calendar size={14} className="text-orange-400/60" />
          </div>
          <div className="p-3 grid grid-cols-7 gap-1">
            {['L','M','M','J','V','S','D'].map(d => (
              <span key={d} className="text-[9px] text-neutral-600 text-center">{d}</span>
            ))}
            {Array.from({length: 31}, (_, i) => i + 1).map(d => (
              <motion.div key={d} className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] ${
                d === 15 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                d > 15 && d < 20 ? 'bg-white/[0.03] text-neutral-500' : 'text-neutral-600'
              }`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: d * 0.02 }}>
                {d}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>,

    /* Step 4: Profile */
    <div key="profile" className="relative flex items-center justify-center h-full">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/5 border border-orange-500/15 flex items-center justify-center">
            <User size={32} className="text-orange-400/50" />
          </div>
          <div className="space-y-2 w-40">
            {[60, 80, 45].map((w, i) => (
              <motion.div key={i} className="h-2 rounded-full bg-white/[0.04]"
                initial={{ width: 0 }} animate={{ width: `${w}%` }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}>
                <motion.div className="h-full rounded-full bg-orange-500/20"
                  initial={{ width: 0 }} animate={{ width: '100%' }}
                  transition={{ delay: 0.6 + i * 0.2, duration: 0.4 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>,

    /* Step 5: Account */
    <div key="account" className="relative flex items-center justify-center h-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-5">
        <motion.div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 border border-orange-500/15 flex items-center justify-center"
          animate={{ rotateY: [0, 180, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <Shield size={28} className="text-orange-400/60" />
        </motion.div>
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <motion.div key={i} className="w-3 h-3 rounded-full"
              initial={{ scale: 0, backgroundColor: 'rgba(64,64,64,1)' }}
              animate={{ scale: 1, backgroundColor: 'rgba(249,115,22,0.5)' }}
              transition={{ delay: i * 0.3, duration: 0.4 }} />
          ))}
        </div>
        <span className="text-neutral-600 text-[11px] tracking-wider">SÉCURISÉ</span>
      </motion.div>
    </div>,
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }} className="h-full flex items-center justify-center">
        {illustrations[step]}
      </motion.div>
    </AnimatePresence>
  );
};

/* ============ STEP 1: HOUSING ============ */
const StepHousing = ({ data, update }) => {
  const types = [
    { value: 'Appartement', icon: <Building2 size={22} />, badge: 'Populaire' },
    { value: 'Maison', icon: <House size={22} /> },
    { value: 'Chambre', icon: <DoorOpen size={22} /> },
  ];
  const furnish = ['Indifférent', 'Non meublé', 'Meublé'];
  const rooms = ['Studio', 'T1', 'T2', 'T3', 'T4', '5+'];

  return (
    <div className="space-y-8">
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
        <div className="flex flex-wrap gap-3">
          {furnish.map(f => (
            <Chip key={f} label={f} selected={data.furnished === f}
              onClick={() => update('furnished', f)} testId={`furnish-${f}`} />
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>Nombre de pièces minimum</FieldLabel>
        <div className="flex flex-wrap gap-3">
          {rooms.map(r => (
            <Chip key={r} label={r} selected={data.min_rooms === r}
              onClick={() => update('min_rooms', r)} testId={`rooms-${r}`} />
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>
          Surface minimum : <span className="text-orange-400 font-bold normal-case">{data.min_surface || 25} m²</span>
        </FieldLabel>
        <div className="relative mt-2">
          <input type="range" min="10" max="100" step="5" value={data.min_surface || 25}
            onChange={e => update('min_surface', parseInt(e.target.value))}
            className="w-full h-2 bg-white/[0.06] rounded-full appearance-none cursor-pointer accent-orange-500"
            data-testid="surface-slider" />
          <div className="flex justify-between text-[11px] text-neutral-600 mt-2">
            <span>10 m²</span><span>100 m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============ STEP 2: LOCATION ============ */
const StepLocation = ({ data, update }) => {
  const locations = ['France métropolitaine', 'Outre-mer', "À l'étranger"];
  const deposits = ['Aucun dépôt', '1 mois de loyer'];

  return (
    <div className="space-y-8">
      <div>
        <FieldLabel>Ville ou département recherché</FieldLabel>
        <input type="text" value={data.search_cities || ''} onChange={e => update('search_cities', e.target.value)}
          placeholder="Paris, Lyon, 75011..." className="input-field" data-testid="search-cities" />
      </div>

      <div>
        <FieldLabel>Où habitez-vous actuellement ?</FieldLabel>
        <div className="flex flex-wrap gap-3">
          {locations.map(l => (
            <Chip key={l} label={l} selected={data.current_location === l}
              onClick={() => update('current_location', l)} testId={`location-${l.slice(0,8)}`} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
        <div className="flex gap-3">
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
    { value: 'Parking', icon: <ParkingCircle size={20} /> },
    { value: 'Balcon', icon: <Sun size={20} /> },
    { value: 'Ascenseur', icon: <ArrowUpDown size={20} /> },
    { value: 'Cuisine équipée', icon: <ChefHat size={20} /> },
    { value: 'Animaux OK', icon: <Dog size={20} /> },
    { value: 'Jardin', icon: <TreePine size={20} /> },
    { value: 'Cave', icon: <Warehouse size={20} /> },
    { value: 'PMR', icon: <Accessibility size={20} /> },
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
            <motion.button key={eq.value} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
              onClick={() => toggleEquip(eq.value)} data-testid={`equip-${eq.value.slice(0,5)}`}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-medium border transition-all ${
                (data.equipments || []).includes(eq.value)
                  ? 'bg-orange-500/12 border-orange-400/40 text-orange-300'
                  : 'bg-white/[0.03] border-white/[0.06] text-neutral-400 hover:border-white/[0.12]'
              }`}>
              <span className={`transition-colors ${(data.equipments || []).includes(eq.value) ? 'text-orange-400' : 'text-neutral-600'}`}>
                {eq.icon}
              </span>
              {eq.value}
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <FieldLabel optional>Informations complémentaires</FieldLabel>
        <textarea value={data.additional_notes || ''} onChange={e => update('additional_notes', e.target.value)}
          placeholder="Précisez vos besoins..." rows={3}
          className="input-field resize-none" data-testid="additional-notes" />
      </div>
    </div>
  );
};

/* ============ STEP 4: CALENDAR ============ */
const StepCalendar = ({ data, update }) => {
  const urgencies = [
    { value: 'Urgent', desc: "Dans les 2 semaines", icon: <Zap size={18} className="text-red-400" /> },
    { value: 'Normal', desc: "1 à 2 mois", icon: <Calendar size={18} className="text-orange-400" /> },
    { value: 'Flexible', desc: "Pas pressé", icon: <Clock size={18} className="text-blue-400" /> },
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
    <div className="space-y-8">
      <div>
        <FieldLabel>Date d'emménagement souhaitée</FieldLabel>
        <input type="date" value={data.move_date || ''} onChange={e => update('move_date', e.target.value)}
          className="input-field" data-testid="move-date" />
      </div>

      <div>
        <FieldLabel>Niveau d'urgence</FieldLabel>
        <div className="space-y-3">
          {urgencies.map(u => (
            <motion.button key={u.value} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              onClick={() => update('urgency', u.value)} data-testid={`urgency-${u.value}`}
              className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-left border transition-all ${
                data.urgency === u.value
                  ? 'bg-orange-500/10 border-orange-400/40'
                  : 'bg-white/[0.03] border-white/[0.06] hover:border-white/[0.12]'
              }`}>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center">
                {u.icon}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${data.urgency === u.value ? 'text-orange-300' : 'text-neutral-300'}`}>{u.value}</p>
                <p className="text-[12px] text-neutral-500 mt-0.5">{u.desc}</p>
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
        <div className="grid grid-cols-2 gap-3">
          {slots.map(s => (
            <Chip key={s.value} label={s.value} icon={s.icon}
              selected={(data.visit_availability || []).includes(s.value)}
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
    <div className="space-y-7">
      <div className="grid grid-cols-2 gap-4">
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
        <div className="flex flex-wrap gap-3">
          {proStatuses.map(s => (
            <Chip key={s} label={s} selected={data.professional_status === s}
              onClick={() => update('professional_status', s)} testId={`pro-${s.slice(0,5)}`} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
        <div className="flex flex-wrap gap-3">
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
  const strengthColor = strength === 1 ? 'bg-red-500' : strength === 2 ? 'bg-yellow-500' : strength === 3 ? 'bg-green-500' : 'bg-white/[0.06]';

  return (
    <div className="space-y-8">
      <motion.div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-neutral-600 text-xs uppercase tracking-wider mb-1">Inscription pour</p>
        <p className="text-white font-medium text-lg">{data.email || 'votre@email.com'}</p>
        {data.first_name && <p className="text-neutral-400 text-sm mt-0.5">{data.first_name} {data.last_name}</p>}
      </motion.div>

      <div>
        <FieldLabel>Créez votre mot de passe</FieldLabel>
        <input type="password" value={pwd} onChange={e => update('password', e.target.value)}
          placeholder="Votre mot de passe sécurisé" className="input-field" data-testid="password" />
        <div className="flex gap-1.5 mt-4 mb-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= strength ? strengthColor : 'bg-white/[0.06]'}`} />
          ))}
        </div>
        {pwd.length > 0 && (
          <p className={`text-xs font-semibold ${strength === 3 ? 'text-green-400' : strength === 2 ? 'text-yellow-400' : 'text-red-400'}`}>
            {strengthLabel}
          </p>
        )}
        <div className="space-y-2 mt-4">
          {checks.map((c, i) => (
            <motion.div key={i} className="flex items-center gap-2.5 text-xs"
              animate={{ opacity: pwd.length > 0 ? 1 : 0.3 }}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${c.ok ? 'bg-green-500' : 'bg-white/[0.06]'}`}>
                {c.ok && <Check size={9} className="text-white" />}
              </div>
              <span className={c.ok ? 'text-green-400' : 'text-neutral-500'}>{c.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <FieldLabel optional>Code de parrainage</FieldLabel>
        <input type="text" value={data.referral_code_used || ''}
          onChange={e => update('referral_code_used', e.target.value.toUpperCase())}
          placeholder="PREMS-XXXXX" className="input-field tracking-[0.2em]" data-testid="referral-input" />
      </div>

      <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-2xl border border-white/[0.04] hover:border-white/[0.08] transition-all" data-testid="cgu-check">
        <input type="checkbox" checked={data.cgu || false} onChange={e => update('cgu', e.target.checked)}
          className="mt-0.5 w-5 h-5 rounded border-neutral-600 bg-neutral-800 accent-orange-500" />
        <span className="text-neutral-500 text-sm group-hover:text-neutral-400 transition-colors leading-relaxed">
          J'accepte les <span className="text-orange-400 underline underline-offset-2">conditions générales</span> et la <span className="text-orange-400 underline underline-offset-2">politique de confidentialité</span>.
        </span>
      </label>
    </div>
  );
};

/* ============ WAITLIST CONFIRMATION ============ */
const WaitlistConfirmation = ({ status }) => {
  const [copied, setCopied] = useState(false);
  const shareText = `Je viens de m'inscrire sur Prems AI — le chasseur immobilier IA ! Utilise mon code ${status.referral_code} pour gagner des places : https://prems.ai`;

  const handleCopyCode = async () => {
    const ok = await copyToClipboard(status.referral_code);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2500); }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ text: shareText }); } catch {}
    } else {
      await copyToClipboard(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-screen px-6">
      <div className="max-w-md w-full text-center py-12">
        <motion.div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/20"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: [0, 1.15, 1], rotate: [-30, 5, 0] }}
          transition={{ duration: 0.7, times: [0, 0.7, 1] }}>
          <Sparkles size={36} className="text-white" />
        </motion.div>

        <motion.h2 className="font-serif text-4xl text-white mb-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Merci{status.first_name ? `, ${status.first_name}` : ''} !
        </motion.h2>
        <motion.p className="text-neutral-400 text-base mb-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Vous êtes inscrit sur la waitlist de Prems AI.
        </motion.p>
        <motion.p className="text-neutral-600 text-sm mb-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          Les <span className="text-orange-400 font-bold">100 premiers</span> passeront en priorité.
        </motion.p>

        <motion.div className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/[0.08] rounded-3xl p-8 mb-6"
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-2">Votre position</p>
          <motion.p className="text-6xl font-bold text-orange-400 font-serif"
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}>
            #{status.waitlist_position}
          </motion.p>
          <p className="text-neutral-600 text-sm mt-2">sur {status.total_waitlist} inscrits</p>
        </motion.div>

        <motion.div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-7 mb-8"
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <Gift size={16} className="text-orange-400" />
            <p className="text-neutral-300 text-sm font-semibold">Votre code de parrainage</p>
          </div>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span data-testid="referral-code"
              className="text-2xl font-bold text-white tracking-[0.15em] font-mono select-all">
              {status.referral_code}
            </span>
            <motion.button onClick={handleCopyCode} data-testid="copy-code-btn"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl hover:bg-white/[0.06] transition-colors">
              {copied
                ? <Check size={18} className="text-green-400" />
                : <Copy size={18} className="text-neutral-500" />}
            </motion.button>
          </div>
          {copied && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
              className="text-green-400 text-xs mb-2 font-medium">
              Copié !
            </motion.p>
          )}
          <p className="text-neutral-500 text-xs">
            <span className="text-orange-400 font-semibold">+10 places</span> par ami qui s'inscrit avec votre code
          </p>
        </motion.div>

        <motion.button onClick={handleShare} data-testid="share-btn"
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}
          className="inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-sm font-semibold transition-all shadow-xl shadow-orange-500/15 hover:shadow-2xl hover:shadow-orange-500/25">
          <Share2 size={16} /> Inviter mes amis
        </motion.button>
      </div>
    </motion.div>
  );
};

/* ============ STEPS CONFIG ============ */
const STEPS = [
  { key: 'housing', title: "Quel type de logement ?", subtitle: "Définissez votre recherche idéale", icon: <Home size={20} />, skippable: false },
  { key: 'location', title: "Où et quel budget ?", subtitle: "Localisation et budget mensuel", icon: <MapPin size={20} />, skippable: true },
  { key: 'equipments', title: "Équipements souhaités", subtitle: "Ce qui compte pour vous", icon: <Wrench size={20} />, skippable: true },
  { key: 'calendar', title: "Votre calendrier", subtitle: "Quand souhaitez-vous emménager", icon: <Calendar size={20} />, skippable: true },
  { key: 'profile', title: "Vos informations", subtitle: "Pour personnaliser votre recherche", icon: <User size={20} />, skippable: false },
  { key: 'account', title: "Créez votre compte", subtitle: "Dernière étape, on y est presque", icon: <Lock size={20} />, skippable: false },
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

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 })
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

  if (completed && waitlistStatus) {
    return (
      <div className="min-h-screen bg-neutral-950" data-testid="signup-page">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-500/[0.04] rounded-full blur-[180px]" />
        </div>
        <WaitlistConfirmation status={waitlistStatus} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex" data-testid="signup-page">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-orange-500/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[300px] bg-orange-600/[0.02] rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.012]"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 100px), repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 100px)' }} />
      </div>

      {/* LEFT PANEL — illustration */}
      <div className="hidden lg:flex w-[42%] relative items-center justify-center border-r border-white/[0.04]">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] to-transparent" />
        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center px-12">
            <StepIllustration step={step} />
          </div>
          <div className="px-12 pb-12">
            <div className="flex items-center gap-2 mb-3">
              {STEPS.map((_, i) => (
                <motion.div key={i} className={`h-1 rounded-full transition-all duration-500 ${
                  i <= step ? 'bg-orange-500' : 'bg-white/[0.06]'
                }`} style={{ flex: i === step ? 2 : 1 }} />
              ))}
            </div>
            <p className="text-neutral-600 text-xs">
              Étape {step + 1} sur {STEPS.length}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — form */}
      <div className="flex-1 relative flex flex-col min-h-screen">
        {/* Top nav */}
        <div className="flex items-center justify-between px-8 lg:px-12 py-6">
          <button onClick={() => step > 0 ? goBack() : navigate('/')}
            className="text-neutral-500 hover:text-neutral-300 text-sm flex items-center gap-2 transition-colors"
            data-testid="back-btn">
            <ArrowLeft size={16} />
            {step > 0 ? 'Retour' : 'Accueil'}
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="text-white font-semibold">Prems</span>
          </div>
        </div>

        {/* Mobile step indicator */}
        <div className="lg:hidden px-8 mb-4">
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${
                i <= step ? 'bg-orange-500' : 'bg-white/[0.06]'
              }`} style={{ flex: i === step ? 2 : 1 }} />
            ))}
          </div>
          <p className="text-neutral-600 text-xs mt-2">Étape {step + 1} sur {STEPS.length}</p>
        </div>

        {/* Form content */}
        <div ref={formRef} className="flex-1 overflow-y-auto px-8 lg:px-12 xl:px-20 pb-32">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={step} custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}>

              {/* Step header */}
              <div className="mb-10 pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    {STEPS[step].icon}
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl lg:text-3xl text-white leading-tight">
                      {STEPS[step].title}
                    </h2>
                  </div>
                </div>
                <p className="text-neutral-500 text-sm ml-[52px]">{STEPS[step].subtitle}</p>
              </div>

              {/* Step form */}
              <div className="max-w-lg">
                {renderStep()}
              </div>
            </motion.div>
          </AnimatePresence>

          {error && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mt-6 max-w-lg">
              {error}
            </motion.p>
          )}
        </div>

        {/* Bottom action bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-neutral-950/80 backdrop-blur-xl border-t border-white/[0.04]">
          <div className="px-8 lg:px-12 xl:px-20 py-5 flex items-center gap-4">
            {STEPS[step].skippable && <SkipButton onClick={goNext} />}
            <motion.button
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={loading || (step >= 4 && !canSubmit())}
              data-testid="next-btn"
              className="flex-1 max-w-lg bg-orange-500 hover:bg-orange-600 disabled:bg-white/[0.05] disabled:text-neutral-600 text-white py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-orange-500/20 ml-auto"
            >
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
