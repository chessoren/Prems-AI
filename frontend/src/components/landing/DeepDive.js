import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, Clock, Zap, Send, Phone, Bell, CalendarCheck, CheckCircle2, Eye, FileText, ArrowRight } from 'lucide-react';
import { FadeIn, SlideIn } from './AnimationUtils';
import { motion } from 'framer-motion';

/* Ultra-detailed Speed Timeline with racing visualization */
const SpeedTimeline = () => {
  const steps = [
    { time: '0s', label: 'Annonce publiée sur Foncia.fr', icon: <FileText size={14} />, color: 'orange', detail: 'T3 - Paris 11e - 1050€' },
    { time: '12s', label: 'Détection par Prems AI', icon: <Zap size={14} />, color: 'orange', detail: 'Analyse IA des critères...' },
    { time: '38s', label: 'Dossier complet envoyé', icon: <Send size={14} />, color: 'green', detail: 'CV, fiches de paie, garant' },
    { time: '45s', label: 'Confirmation de réception', icon: <CheckCircle2 size={14} />, color: 'green', detail: 'Agence notifiée' },
    { time: '4h', label: 'SeLoger publie l\'annonce...', icon: <Clock size={14} />, color: 'neutral', detail: 'Trop tard, 12 dossiers reçus' },
  ];

  return (
    <div className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-2xl border border-neutral-200 p-7 overflow-hidden">
      {/* Background pulse */}
      <motion.div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-green-400/10"
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2.5 }} />

      <div className="relative space-y-3">
        {steps.map((step, i) => (
          <motion.div key={i} className="flex items-start gap-4"
            initial={{ opacity: 0, x: -25, filter: "blur(3px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3 + i * 0.5, duration: 0.4 }}>
            {/* Timeline dot + line */}
            <div className="flex flex-col items-center mt-1">
              <motion.div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                step.color === 'orange' ? 'bg-orange-100 text-orange-500' :
                step.color === 'green' ? 'bg-green-100 text-green-500' :
                'bg-neutral-100 text-neutral-400'
              }`}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.5, type: "spring" }}>
                {step.icon}
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div className={`w-0.5 h-6 mt-1 ${i < 3 ? 'bg-orange-200' : 'bg-neutral-200'}`}
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ delay: 0.6 + i * 0.5, duration: 0.3 }} />
              )}
            </div>

            <div className="flex-1 pb-1">
              <div className="flex items-baseline gap-2">
                <span className={`text-[10px] font-bold tracking-wider ${
                  step.color === 'neutral' ? 'text-neutral-300' : 'text-orange-500'
                }`}>{step.time}</span>
                <span className={`text-xs font-semibold ${
                  step.color === 'neutral' ? 'text-neutral-400 line-through' : 'text-neutral-700'
                }`}>{step.label}</span>
              </div>
              <motion.p className="text-[10px] text-neutral-400 mt-0.5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.5 }}>
                {step.detail}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Result badge */}
      <motion.div className="mt-4 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5, type: "spring" }}>
        <CheckCircle2 size={14} className="text-green-500" />
        <span className="text-green-700 text-xs font-semibold">Vous êtes le 1er dossier reçu par l'agence.</span>
      </motion.div>
    </div>
  );
};

/* Ultra-detailed Relaxation / Notification Animation */
const RelaxAnimation = () => {
  const notifications = [
    { text: 'Visite confirmée - Demain 15h', icon: <CalendarCheck size={13} />, type: 'success', agency: 'Foncia', delay: 0.8 },
    { text: 'Dossier accepté par l\'agence', icon: <CheckCircle2 size={13} />, type: 'success', agency: 'Orpi', delay: 1.6 },
    { text: 'Nouvelle visite - Vendredi 17h', icon: <Bell size={13} />, type: 'info', agency: 'Nexity', delay: 2.4 },
    { text: 'L\'agence souhaite vous rappeler', icon: <Phone size={13} />, type: 'call', agency: 'Century 21', delay: 3.2 },
  ];

  return (
    <div className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-2xl border border-neutral-200 p-7 overflow-hidden">
      <div className="flex flex-col items-center gap-4">
        {/* Phone mockup */}
        <motion.div className="relative"
          animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <div className="w-20 h-20 rounded-2xl bg-white shadow-xl border border-neutral-200 flex items-center justify-center relative">
            <Phone size={28} className="text-neutral-300" />
            {/* Notification badge */}
            <motion.div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-[9px] font-bold shadow-lg shadow-orange-500/30"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}>
              <motion.span key="count" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.3, delay: 3 }}>
                4
              </motion.span>
            </motion.div>
          </div>
        </motion.div>

        {/* Notification stack */}
        <div className="space-y-2 w-full max-w-[250px]">
          {notifications.map((notif, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 25, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: notif.delay, duration: 0.5, type: "spring" }}
              className="bg-white rounded-xl px-3.5 py-3 shadow-md border border-neutral-100 flex items-start gap-2.5">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                notif.type === 'success' ? 'bg-green-50 text-green-500' :
                notif.type === 'info' ? 'bg-blue-50 text-blue-500' :
                'bg-orange-50 text-orange-500'
              }`}>
                {notif.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-neutral-700 leading-tight">{notif.text}</p>
                <p className="text-[9px] text-neutral-400 mt-0.5">{notif.agency}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DeepDive1 = () => {
  const navigate = useNavigate();
  const bullets = [
    "Détection immédiate sur le site de l'agence.",
    "Analyse de vos critères (Loyer, Surface, Zone).",
    "Envoi du dossier avant le premier appel humain."
  ];

  return (
    <section data-testid="deep-dive-1" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <SlideIn direction="left"><SpeedTimeline /></SlideIn>
          <SlideIn direction="right" delay={0.15}>
            <div>
              <span className="inline-flex items-center gap-2 text-sm bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full font-medium mb-6">L'Avantage</span>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 leading-tight mb-5">
                Votre dossier sur le bureau de l'agence.<br /><span className="italic">Avant tout le monde.</span>
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-8">
                Les agrégateurs classiques (Jinka, SeLoger) ont un retard de plusieurs heures. Prems est connecté directement aux serveurs des agences. Vous arrivez avant la foule.
              </p>
              <ul className="space-y-4 mb-8">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center shrink-0"><Check size={12} className="text-white" /></span>
                    {b}
                  </li>
                ))}
              </ul>
              <button data-testid="deep-dive-1-cta" onClick={() => navigate('/signup')}
                className="group bg-neutral-900 text-white px-6 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-all hover:shadow-xl hover:scale-[1.01]">
                Prendre de vitesse le marché <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
};

const DeepDive2 = () => {
  const navigate = useNavigate();
  const bullets = [
    "Vous ne faites rien.",
    "Votre téléphone sonne uniquement pour des visites.",
    "Votre agenda se remplit tout seul."
  ];

  return (
    <section data-testid="deep-dive-2" className="py-24 bg-neutral-50/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <SlideIn direction="left" delay={0.15} className="order-2 md:order-1">
            <div>
              <span className="inline-flex items-center gap-2 text-sm bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full font-medium mb-6">Tranquillité</span>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 leading-tight mb-5">
                Arrêtez de chercher.<br /><span className="italic">Commencez à visiter.</span>
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-8">
                Chercher un appartement est un job à plein temps. Démissionnez. Laissez Prems faire le sale boulot de veille et de candidature.
              </p>
              <ul className="space-y-4 mb-8">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0"><Check size={12} className="text-white" /></span>
                    {b}
                  </li>
                ))}
              </ul>
              <button data-testid="deep-dive-2-cta" onClick={() => navigate('/signup')}
                className="group bg-neutral-900 text-white px-6 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-all hover:shadow-xl hover:scale-[1.01]">
                Déléguer ma recherche <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </SlideIn>
          <SlideIn direction="right" className="order-1 md:order-2"><RelaxAnimation /></SlideIn>
        </div>
      </div>
    </section>
  );
};

export { DeepDive1, DeepDive2 };
