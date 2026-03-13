import { useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, CheckCircle2, Send, Eye, Clock, FileText, Bot, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

/* Ultra-detailed Animated Dashboard */
const AnimatedDashboard = () => {
  const listings = [
    { agency: "Foncia", area: "Paris 11e", price: "1 050€", surface: "38m²", status: "sent", color: "#f97316" },
    { agency: "Orpi", area: "Paris 12e", price: "980€", surface: "32m²", status: "sent", color: "#3b82f6" },
    { agency: "Nexity", area: "Lyon 3e", price: "850€", surface: "45m²", status: "scanning", color: "#8b5cf6" },
    { agency: "Century 21", area: "Paris 15e", price: "1 200€", surface: "42m²", status: "pending", color: "#10b981" },
  ];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Glow effects */}
      <div className="absolute -inset-8 bg-gradient-to-b from-orange-200/20 via-orange-100/10 to-transparent rounded-3xl blur-2xl" />
      <motion.div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-orange-300/20 via-transparent to-orange-200/10 opacity-60"
        animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} />

      <div className="relative bg-white rounded-2xl shadow-2xl shadow-neutral-200/60 border border-neutral-100 overflow-hidden">
        {/* Top bar with live indicators */}
        <div className="bg-neutral-50 border-b border-neutral-100 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm shadow-orange-300/30">
                <span className="text-white text-[9px] font-bold">P</span>
              </div>
              <span className="text-neutral-900 text-sm font-semibold">Prems AI</span>
            </div>
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-green-500"
                animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-green-600 text-[10px] font-semibold">Scan actif</span>
            </motion.div>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-neutral-400">
            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>
              350+ sites
            </motion.span>
            <div className="flex items-center gap-1">
              <motion.div className="w-1 h-1 rounded-full bg-green-400"
                animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} />
              <span>En temps réel</span>
            </div>
          </div>
        </div>

        {/* Scanning progress bar */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-orange-50/80 to-amber-50/50 border-b border-orange-100/50">
          <div className="flex items-center gap-2">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <Zap size={12} className="text-orange-500" />
            </motion.div>
            <span className="text-orange-600 text-[10px] font-semibold">Analyse en cours...</span>
            <div className="flex-1 h-1.5 bg-orange-100 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 rounded-full"
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} />
            </div>
            <motion.span className="text-[9px] text-orange-500 font-mono tabular-nums"
              key="counter">
              <CounterAnimation />
            </motion.span>
          </div>
        </div>

        {/* Listings with detailed animations */}
        <div className="p-4 space-y-2">
          {listings.map((l, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.6 + i * 0.4, duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-3 bg-neutral-50/80 rounded-xl px-4 py-3 border border-neutral-100 hover:border-orange-200/50 transition-all group">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                style={{ backgroundColor: l.color + '20', color: l.color }}>
                {l.agency[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-900 text-xs font-semibold">{l.agency}</span>
                  <span className="text-neutral-400 text-[10px]">{l.area}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-neutral-500 mt-0.5">
                  <span className="font-semibold text-neutral-700">{l.price}/mois</span>
                  <span>{l.surface}</span>
                </div>
              </div>
              {l.status === 'sent' ? (
                <motion.div initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.4, type: "spring", stiffness: 300 }}
                  className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
                  <CheckCircle2 size={10} className="text-green-500" />
                  <span className="text-green-600 text-[9px] font-semibold">Envoyé</span>
                </motion.div>
              ) : l.status === 'scanning' ? (
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-full px-2.5 py-1">
                  <Eye size={10} className="text-orange-500" />
                  <span className="text-orange-600 text-[9px] font-semibold">Scan...</span>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1] }}
                  transition={{ delay: 2.5, duration: 0.3 }}
                  className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-1">
                  <Clock size={10} className="text-blue-500" />
                  <span className="text-blue-600 text-[9px] font-semibold">En attente</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom live stats bar */}
        <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-5 text-[10px]">
            <div className="flex items-center gap-1.5">
              <Send size={10} className="text-orange-400" />
              <span className="text-neutral-500">Candidatures : <span className="text-orange-500 font-bold">12</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={10} className="text-green-400" />
              <span className="text-neutral-500">Visites : <span className="text-green-500 font-bold">3</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText size={10} className="text-blue-400" />
              <span className="text-neutral-500">Dossiers : <span className="text-blue-500 font-bold">8</span></span>
            </div>
          </div>
          <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1.5 text-[10px]">
            <Bot size={11} className="text-orange-400" />
            <span className="text-orange-500 font-semibold">IA active</span>
          </motion.div>
        </div>
      </div>

      {/* Floating notification */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
        transition={{ delay: 3, duration: 0.5, type: "spring" }}
        className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl border border-green-100 px-4 py-2.5 flex items-center gap-2 z-10">
        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 size={12} className="text-green-500" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-neutral-800">Visite confirmée</p>
          <p className="text-[9px] text-neutral-500">Foncia - Demain 15h</p>
        </div>
      </motion.div>
    </div>
  );
};

/* Animated counter for the scanning bar */
const CounterAnimation = () => {
  return (
    <motion.span
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 1, repeat: Infinity }}>
      347/350
    </motion.span>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" data-testid="hero-section" className="relative pt-32 pb-12 overflow-hidden">
      {/* Enhanced background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-orange-200/30 via-orange-100/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-amber-200/20 via-orange-50/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[400px] bg-gradient-to-b from-orange-300/25 to-transparent rounded-full blur-2xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #666 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          data-testid="hero-badge"
          className="inline-flex items-center gap-2 bg-white border border-neutral-200 rounded-full pl-1 pr-4 py-1 mb-8 shadow-sm hover:shadow-md transition-shadow">
          <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Nouveau</span>
          <span className="text-sm text-neutral-700 font-medium">Chasseur immobilier IA</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          data-testid="hero-title"
          className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight text-neutral-900 mb-6">
          L'immobilier est une guerre.
          <br /><span className="italic">Envoyez votre soldat.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
          data-testid="hero-subtitle"
          className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Prems détecte les annonces en temps réel sur 350+ sites d'agences immobilières et envoie votre dossier automatiquement. Vous ne recevez que les confirmations de visite.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button data-testid="hero-cta-btn" onClick={() => navigate('/signup')}
            className="group bg-neutral-900 text-white px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-all hover:shadow-2xl hover:shadow-neutral-900/20 hover:scale-[1.02] active:scale-[0.98]">
            S'inscrire - 29€
            <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <span className="flex items-center gap-2 text-sm text-neutral-500">
            <Shield size={14} className="text-green-500" />
            Satisfait ou remboursé
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}>
          <AnimatedDashboard />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
