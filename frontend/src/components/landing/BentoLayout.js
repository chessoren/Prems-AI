import { Zap, Bot, Filter, Activity, ShieldCheck, CheckCircle2, Send, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn, ScaleIn } from './AnimationUtils';

/* Animated mini-illustrations for each bento card */
const AgencyNetworkAnim = () => (
  <div className="h-52 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center relative overflow-hidden">
    {/* Animated connection lines */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
      {[[40,40],[150,30],[260,40],[80,100],[220,100],[150,170]].map(([cx,cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="4" fill="#f97316" opacity="0.4"
          animate={{ opacity: [0.2, 0.8, 0.2], r: [3, 5, 3] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }} />
      ))}
      {[[40,40,150,30],[150,30,260,40],[40,40,80,100],[260,40,220,100],[80,100,150,170],[220,100,150,170]].map(([x1,y1,x2,y2], i) => (
        <motion.line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f97316" strokeWidth="1" opacity="0.15"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 + i * 0.2 }} />
      ))}
    </svg>
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1 }}
      className="relative bg-white/90 backdrop-blur rounded-xl px-4 py-3 shadow-lg border border-orange-100 z-10">
      <div className="flex items-center gap-2 mb-2">
        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-xs font-medium text-neutral-700">Connecté en direct</span>
      </div>
      <div className="flex gap-1.5">
        {['Foncia', 'Orpi', 'Nexity'].map(a => (
          <span key={a} className="text-[9px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium">{a}</span>
        ))}
      </div>
    </motion.div>
  </div>
);

const AutoCandidatureAnim = () => (
  <div className="h-52 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center relative overflow-hidden">
    <motion.div className="flex flex-col items-center gap-3"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="bg-white rounded-xl shadow-md border border-neutral-100 px-4 py-3 w-48">
        <div className="flex items-center gap-2 mb-2">
          <Send size={12} className="text-orange-500" />
          <span className="text-[10px] font-semibold text-neutral-700">Candidature en cours</span>
        </div>
        <div className="space-y-1.5">
          {['Nom', 'Email', 'Dossier'].map((f, i) => (
            <motion.div key={f} className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.4 }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 + i * 0.4 }}
                className="w-3 h-3 rounded-full bg-green-400 flex items-center justify-center">
                <CheckCircle2 size={8} className="text-white" />
              </motion.div>
              <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div className="h-full bg-orange-300 rounded-full"
                  initial={{ width: 0 }} animate={{ width: '100%' }}
                  transition={{ delay: 0.8 + i * 0.4, duration: 0.5 }} />
              </div>
              <span className="text-[8px] text-neutral-400">{f}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </div>
);

const SmartFilterAnim = () => (
  <div className="h-52 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-md border border-neutral-100 p-3 w-full max-w-[200px]">
      <div className="flex items-center gap-2 mb-3">
        <Filter size={14} className="text-orange-500" />
        <span className="text-xs font-medium text-neutral-700">Filtres IA</span>
      </div>
      <div className="space-y-2">
        {[{ l: 'Budget < 1200€', ok: true }, { l: 'Paris 11e, 12e', ok: true }, { l: '"Pas de coloc"', ok: false }, { l: 'Surface > 30m²', ok: true }].map((f, i) => (
          <motion.div key={i} className="flex items-center gap-2 text-[11px]"
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.3 }}>
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.3 }}
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${f.ok ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
              {f.ok ? '✓' : '✕'}
            </motion.span>
            <span className="text-neutral-600">{f.l}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const TrackingAnim = () => (
  <div className="h-64 md:h-auto bg-gradient-to-br from-orange-50 to-amber-50 p-5 flex items-center justify-center">
    <div className="space-y-2 w-full max-w-sm">
      {[{ agency: 'Foncia Saint-Maur', t: '09:14', s: 'Visite confirmée', c: 'green' },
        { agency: 'Orpi Bastille', t: '09:02', s: 'Dossier envoyé', c: 'orange' },
        { agency: 'Century 21 Lyon', t: '08:47', s: 'Dossier envoyé', c: 'orange' },
      ].map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.3 }}
          className="flex items-center gap-3 bg-white/80 rounded-lg px-3 py-2 border border-neutral-100">
          <div className="w-6 h-6 rounded-md bg-neutral-100 flex items-center justify-center text-[8px] font-bold text-neutral-500">{item.agency[0]}</div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold text-neutral-700">{item.agency}</p>
            <p className="text-[9px] text-neutral-400">{item.t}</p>
          </div>
          <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-full ${item.c === 'green' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>{item.s}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

const BentoLayout = () => {
  return (
    <section data-testid="bento-layout" className="py-20 bg-neutral-50/50">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="mb-12">
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
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-orange-200 transition-all hover:shadow-lg" data-testid="bento-card-1">
              <AgencyNetworkAnim />
              <div className="p-5">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center mb-3"><Zap size={16} className="text-orange-500" /></div>
                <h3 className="font-semibold text-neutral-900 mb-1">Connexion directe aux agences</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">Prems est connecté aux sites des agences (Foncia, Orpi...) pour voir l'annonce 4h avant tout le monde.</p>
              </div>
            </div>
          </ScaleIn>

          <ScaleIn delay={0.1}>
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-orange-200 transition-all hover:shadow-lg" data-testid="bento-card-2">
              <AutoCandidatureAnim />
              <div className="p-5">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center mb-3"><Bot size={16} className="text-orange-500" /></div>
                <h3 className="font-semibold text-neutral-900 mb-1">Candidature 100% Automatique</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">L'IA remplit le formulaire, rédige le message et joint votre dossier à votre place.</p>
              </div>
            </div>
          </ScaleIn>

          <ScaleIn delay={0.2}>
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-orange-200 transition-all hover:shadow-lg" data-testid="bento-card-3">
              <SmartFilterAnim />
              <div className="p-5">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center mb-3"><ShieldCheck size={16} className="text-orange-500" /></div>
                <h3 className="font-semibold text-neutral-900 mb-1">Filtres Intelligents</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">L'IA lit la description. Si l'annonce dit "Pas de colocation", elle ne postule pas.</p>
              </div>
            </div>
          </ScaleIn>

          <ScaleIn delay={0.3} className="md:col-span-3">
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-orange-200 transition-all hover:shadow-lg" data-testid="bento-card-4">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 flex flex-col justify-center">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center mb-3"><Activity size={16} className="text-orange-500" /></div>
                  <h3 className="font-semibold text-neutral-900 text-lg mb-2">Suivi en temps réel</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">Connectez-vous à votre espace pour voir toutes les candidatures envoyées par l'IA et les agences contactées.</p>
                </div>
                <TrackingAnim />
              </div>
            </div>
          </ScaleIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-8 bg-neutral-900 rounded-full px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
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
