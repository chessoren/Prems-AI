import { Zap, Bot, Filter, Activity, ShieldCheck, CheckCircle2, Send, Search, ArrowRight, Globe, Eye, FileText, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn, ScaleIn } from './AnimationUtils';

/* Ultra-detailed Agency Network Animation */
const AgencyNetworkAnim = () => {
  const agencies = [
    { name: 'Foncia', x: 50, y: 30 },
    { name: 'Orpi', x: 200, y: 25 },
    { name: 'Nexity', x: 125, y: 80 },
    { name: 'Century', x: 30, y: 130 },
    { name: 'ERA', x: 220, y: 120 },
    { name: 'Laforêt', x: 125, y: 170 },
  ];

  return (
    <div className="h-56 bg-gradient-to-br from-orange-50 via-amber-50/50 to-orange-100/30 flex items-center justify-center relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 210">
        {/* Connection lines with animated dash */}
        {[[50,30,125,80],[200,25,125,80],[30,130,125,80],[220,120,125,80],[125,170,125,80],[50,30,200,25],[30,130,125,170],[220,120,200,25]].map(([x1,y1,x2,y2], i) => (
          <motion.line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" opacity="0.15"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }} />
        ))}
        {/* Data packets traveling along lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <motion.circle key={`packet-${i}`} r="2" fill="#f97316" opacity="0.6"
            initial={{ cx: agencies[i]?.x || 125, cy: agencies[i]?.y || 80 }}
            animate={{
              cx: [agencies[i]?.x || 125, 125, agencies[i]?.x || 125],
              cy: [agencies[i]?.y || 80, 80, agencies[i]?.y || 80]
            }}
            transition={{ duration: 3, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }} />
        ))}
        {/* Agency nodes */}
        {agencies.map((a, i) => (
          <g key={`node-${i}`}>
            <motion.circle cx={a.x} cy={a.y} r="16" fill="white" stroke="#f97316" strokeWidth="1.5" opacity="0.9"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring" }} />
            <motion.text x={a.x} y={a.y + 3} textAnchor="middle" fontSize="7" fontWeight="600" fill="#f97316"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}>
              {a.name}
            </motion.text>
          </g>
        ))}
        {/* Center hub */}
        <motion.circle cx="125" cy="80" r="22" fill="#f97316" opacity="0.1"
          animate={{ r: [22, 28, 22], opacity: [0.1, 0.05, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="125" cy="80" r="14" fill="white" stroke="#f97316" strokeWidth="2"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring" }} />
        <text x="125" y="83" textAnchor="middle" fontSize="9" fontWeight="800" fill="#f97316">P</text>
      </svg>
      {/* Live status overlay */}
      <motion.div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm border border-green-100 flex items-center gap-1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <motion.div className="w-1.5 h-1.5 rounded-full bg-green-500"
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <span className="text-[9px] font-semibold text-green-600">6 agences connectées</span>
      </motion.div>
    </div>
  );
};

/* Ultra-detailed Auto Candidature Animation */
const AutoCandidatureAnim = () => {
  const fields = [
    { label: 'Identité', icon: '👤', delay: 0.5 },
    { label: 'Revenus', icon: '💰', delay: 0.9 },
    { label: 'Garant', icon: '🛡️', delay: 1.3 },
    { label: 'Dossier', icon: '📎', delay: 1.7 },
    { label: 'Message IA', icon: '✨', delay: 2.1 },
  ];

  return (
    <div className="h-56 bg-gradient-to-br from-amber-50 via-orange-50/50 to-white flex items-center justify-center relative overflow-hidden">
      <div className="relative w-52">
        {/* Main candidature card */}
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-neutral-100 flex items-center gap-2">
            <Send size={11} className="text-orange-500" />
            <span className="text-[10px] font-semibold text-neutral-700">Candidature automatique</span>
          </div>
          <div className="p-3 space-y-1.5">
            {fields.map((f, i) => (
              <motion.div key={i} className="flex items-center gap-2"
                initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: f.delay, duration: 0.3 }}>
                <span className="text-[10px]">{f.icon}</span>
                <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-orange-300 to-orange-400 rounded-full"
                    initial={{ width: 0 }} animate={{ width: '100%' }}
                    transition={{ delay: f.delay + 0.2, duration: 0.5, ease: "easeOut" }} />
                </div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: f.delay + 0.6, type: "spring" }}
                  className="w-3.5 h-3.5 rounded-full bg-green-400 flex items-center justify-center">
                  <CheckCircle2 size={8} className="text-white" />
                </motion.div>
                <span className="text-[8px] text-neutral-400 w-12 text-right">{f.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Sent confirmation */}
        <motion.div className="absolute -bottom-2 -right-2 bg-green-50 border border-green-200 rounded-lg px-2 py-1 shadow-sm"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.2, type: "spring" }}>
          <span className="text-green-600 text-[9px] font-bold flex items-center gap-1">
            <CheckCircle2 size={9} /> Envoyé !
          </span>
        </motion.div>
      </div>
    </div>
  );
};

/* Ultra-detailed Smart Filter Animation */
const SmartFilterAnim = () => {
  const filters = [
    { label: 'Budget < 1 200€', match: true, confidence: 95, delay: 0.4 },
    { label: 'Paris 11e, 12e', match: true, confidence: 100, delay: 0.7 },
    { label: '"Pas de coloc"', match: false, confidence: 88, delay: 1.0 },
    { label: 'Surface > 30m²', match: true, confidence: 92, delay: 1.3 },
    { label: 'Étage > 2', match: true, confidence: 78, delay: 1.6 },
  ];

  return (
    <div className="h-56 bg-gradient-to-br from-orange-50 to-amber-50/50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="bg-white rounded-xl shadow-lg border border-neutral-100 p-3.5 w-full max-w-[220px]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center">
              <Filter size={12} className="text-orange-500" />
            </div>
            <span className="text-xs font-semibold text-neutral-700">Filtres IA</span>
          </div>
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="text-orange-400">
            <Eye size={10} />
          </motion.div>
        </div>
        <div className="space-y-1.5">
          {filters.map((f, i) => (
            <motion.div key={i} className="flex items-center gap-2 text-[10px]"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: f.delay, duration: 0.3 }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: f.delay + 0.2, type: "spring" }}
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                  f.match ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                {f.match ? '✓' : '✕'}
              </motion.div>
              <span className={`flex-1 ${f.match ? 'text-neutral-600' : 'text-neutral-400 line-through'}`}>
                {f.label}
              </span>
              <motion.span className="text-[8px] text-neutral-400"
                initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
                transition={{ delay: f.delay + 0.4 }}>
                {f.confidence}%
              </motion.span>
            </motion.div>
          ))}
        </div>
        <motion.div className="mt-2.5 pt-2 border-t border-neutral-100 text-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
          <span className="text-[9px] text-green-500 font-semibold">4/5 critères validés</span>
        </motion.div>
      </div>
    </div>
  );
};

/* Ultra-detailed Tracking Animation */
const TrackingAnim = () => {
  const events = [
    { agency: 'Foncia Saint-Maur', time: '09:14', status: 'Visite confirmée', type: 'success', icon: <CheckCircle2 size={10} /> },
    { agency: 'Orpi Bastille', time: '09:02', status: 'Dossier envoyé', type: 'pending', icon: <Send size={10} /> },
    { agency: 'Century 21 Lyon', time: '08:47', status: 'Dossier envoyé', type: 'pending', icon: <Send size={10} /> },
    { agency: 'Nexity Paris 15e', time: '08:30', status: 'Annonce détectée', type: 'detected', icon: <Eye size={10} /> },
  ];

  return (
    <div className="h-72 md:h-auto bg-gradient-to-br from-orange-50 to-amber-50/50 p-5 flex items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-sm space-y-2">
        {/* Timeline header */}
        <motion.div className="flex items-center justify-between mb-3 px-1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-orange-500" />
            <span className="text-[10px] font-semibold text-neutral-600">Activité du jour</span>
          </div>
          <span className="text-[9px] text-neutral-400">Aujourd'hui</span>
        </motion.div>

        {/* Timeline events */}
        {events.map((item, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 15, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5 + i * 0.35, duration: 0.4 }}
            className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-xl px-3.5 py-2.5 border border-neutral-100 shadow-sm">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              item.type === 'success' ? 'bg-green-50 text-green-500' :
              item.type === 'pending' ? 'bg-orange-50 text-orange-500' :
              'bg-blue-50 text-blue-500'
            }`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-neutral-700">{item.agency}</p>
              <p className="text-[9px] text-neutral-400">{item.time}</p>
            </div>
            <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-full ${
              item.type === 'success' ? 'bg-green-50 text-green-600' :
              item.type === 'pending' ? 'bg-orange-50 text-orange-600' :
              'bg-blue-50 text-blue-600'
            }`}>
              {item.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const BentoLayout = () => {
  return (
    <section data-testid="bento-layout" className="py-24 bg-neutral-50/50">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 text-sm text-neutral-500 mb-4">
              <span className="text-orange-500">&#10023;</span> Fonctionnalités IA
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 leading-tight">
                  Des agents puissants<br />pour votre <span className="italic text-orange-500">recherche</span>
                </h2>
                <p className="text-neutral-500 mt-4 max-w-md leading-relaxed">
                  Automatisez la détection, la candidature et le suivi avec une IA construite pour le marché immobilier.
                </p>
              </div>
              <a href="/signup" className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all shrink-0" data-testid="bento-cta">
                Commencer <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScaleIn>
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-orange-200 transition-all hover:shadow-xl group" data-testid="bento-card-1">
              <AgencyNetworkAnim />
              <div className="p-6">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center mb-3"><Zap size={17} className="text-orange-500" /></div>
                <h3 className="font-semibold text-neutral-900 mb-1.5 text-base">Connexion directe aux agences</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">Prems est connecté aux sites des agences (Foncia, Orpi...) pour voir l'annonce 4h avant tout le monde.</p>
              </div>
            </div>
          </ScaleIn>

          <ScaleIn delay={0.1}>
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-orange-200 transition-all hover:shadow-xl group" data-testid="bento-card-2">
              <AutoCandidatureAnim />
              <div className="p-6">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center mb-3"><Bot size={17} className="text-orange-500" /></div>
                <h3 className="font-semibold text-neutral-900 mb-1.5 text-base">Candidature 100% Automatique</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">L'IA remplit le formulaire, rédige le message et joint votre dossier à votre place.</p>
              </div>
            </div>
          </ScaleIn>

          <ScaleIn delay={0.2}>
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-orange-200 transition-all hover:shadow-xl group" data-testid="bento-card-3">
              <SmartFilterAnim />
              <div className="p-6">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center mb-3"><ShieldCheck size={17} className="text-orange-500" /></div>
                <h3 className="font-semibold text-neutral-900 mb-1.5 text-base">Filtres Intelligents</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">L'IA lit la description. Si l'annonce dit "Pas de colocation", elle ne postule pas.</p>
              </div>
            </div>
          </ScaleIn>

          <ScaleIn delay={0.3} className="md:col-span-3">
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-orange-200 transition-all hover:shadow-xl" data-testid="bento-card-4">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center mb-4"><Activity size={17} className="text-orange-500" /></div>
                  <h3 className="font-semibold text-neutral-900 text-lg mb-2">Suivi en temps réel</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">Connectez-vous à votre espace pour voir toutes les candidatures envoyées par l'IA et les agences contactées.</p>
                  <div className="flex items-center gap-4 text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1"><Clock size={10} /> Mis à jour en direct</span>
                    <span className="flex items-center gap-1"><Globe size={10} /> Toutes agences</span>
                  </div>
                </div>
                <TrackingAnim />
              </div>
            </div>
          </ScaleIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-8 bg-neutral-900 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/90 text-sm">Lancez votre recherche automatique en moins de <span className="text-orange-400 font-bold">60 secondes</span></p>
            <a href="/signup" className="text-white text-sm font-medium flex items-center gap-1 hover:text-orange-300 transition-colors">
              Commencer maintenant <ArrowRight size={14} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default BentoLayout;
