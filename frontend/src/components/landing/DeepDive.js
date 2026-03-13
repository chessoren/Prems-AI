import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, Clock, Zap, Send, Phone, Bell, CalendarCheck } from 'lucide-react';
import { FadeIn, SlideIn } from './AnimationUtils';
import { motion } from 'framer-motion';

/* Coded animation: Speed timeline */
const SpeedTimeline = () => (
  <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-neutral-200 p-6 overflow-hidden">
    <div className="space-y-4">
      {[
        { time: '0s', label: 'Annonce publiée', icon: <Zap size={14} />, color: 'orange' },
        { time: '15s', label: 'Détection Prems', icon: <Zap size={14} />, color: 'orange' },
        { time: '45s', label: 'Dossier envoyé', icon: <Send size={14} />, color: 'green' },
        { time: '4h', label: 'Alerte SeLoger...', icon: <Clock size={14} />, color: 'neutral' },
      ].map((step, i) => (
        <motion.div key={i} className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.4 }}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            step.color === 'orange' ? 'bg-orange-100 text-orange-500' :
            step.color === 'green' ? 'bg-green-100 text-green-500' :
            'bg-neutral-100 text-neutral-400'
          }`}>{step.icon}</div>
          <div className="flex-1">
            <p className={`text-xs font-semibold ${step.color === 'neutral' ? 'text-neutral-400 line-through' : 'text-neutral-700'}`}>{step.label}</p>
          </div>
          <span className={`text-[10px] font-bold ${step.color === 'neutral' ? 'text-neutral-300' : 'text-orange-500'}`}>{step.time}</span>
        </motion.div>
      ))}
    </div>
    <motion.div className="absolute bottom-3 right-3 bg-white rounded-lg px-3 py-1.5 shadow-sm border border-green-100"
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.5 }}>
      <span className="text-green-500 text-[10px] font-bold">Vous êtes premier.</span>
    </motion.div>
  </div>
);

/* Coded animation: Relaxation notifications */
const RelaxAnimation = () => (
  <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-neutral-200 p-6 overflow-hidden">
    <div className="flex flex-col items-center gap-3">
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}
        className="w-16 h-16 rounded-2xl bg-white shadow-md border border-neutral-100 flex items-center justify-center">
        <Phone size={24} className="text-neutral-300" />
      </motion.div>
      <div className="space-y-2 w-full max-w-[220px]">
        {[
          { text: 'Visite confirmée - 15h', icon: <CalendarCheck size={12} />, delay: 1 },
          { text: 'Nouvelle visite - 17h', icon: <Bell size={12} />, delay: 2 },
          { text: 'Agence Foncia appelle', icon: <Phone size={12} />, delay: 3 },
        ].map((notif, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: notif.delay, duration: 0.4 }}
            className="bg-white rounded-xl px-3 py-2.5 shadow-sm border border-neutral-100 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center text-green-500 shrink-0">{notif.icon}</div>
            <span className="text-[10px] font-medium text-neutral-700">{notif.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const DeepDive1 = () => {
  const navigate = useNavigate();
  const bullets = [
    "Détection immédiate sur le site de l'agence.",
    "Analyse de vos critères (Loyer, Surface, Zone).",
    "Envoi du dossier avant le premier appel humain."
  ];

  return (
    <section data-testid="deep-dive-1" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SlideIn direction="left"><SpeedTimeline /></SlideIn>
          <SlideIn direction="right" delay={0.15}>
            <div>
              <span className="inline-flex items-center gap-2 text-sm bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full font-medium mb-6">L'Avantage</span>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 leading-tight mb-4">
                Votre dossier sur le bureau de l'agence.<br /><span className="italic">Avant tout le monde.</span>
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-6">
                Les agrégateurs classiques (Jinka, SeLoger) ont un retard de plusieurs heures. Prems est connecté directement aux serveurs des agences. Vous arrivez avant la foule.
              </p>
              <ul className="space-y-3 mb-8">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center shrink-0"><Check size={12} className="text-white" /></span>
                    {b}
                  </li>
                ))}
              </ul>
              <button data-testid="deep-dive-1-cta" onClick={() => navigate('/signup')}
                className="group bg-neutral-900 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-all hover:shadow-xl">
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
    <section data-testid="deep-dive-2" className="py-20 bg-neutral-50/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SlideIn direction="left" delay={0.15} className="order-2 md:order-1">
            <div>
              <span className="inline-flex items-center gap-2 text-sm bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full font-medium mb-6">Tranquillité</span>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 leading-tight mb-4">
                Arrêtez de chercher.<br /><span className="italic">Commencez à visiter.</span>
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-6">
                Chercher un appartement est un job à plein temps. Démissionnez. Laissez Prems faire le sale boulot de veille et de candidature.
              </p>
              <ul className="space-y-3 mb-8">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0"><Check size={12} className="text-white" /></span>
                    {b}
                  </li>
                ))}
              </ul>
              <button data-testid="deep-dive-2-cta" onClick={() => navigate('/signup')}
                className="group bg-neutral-900 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-all hover:shadow-xl">
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
