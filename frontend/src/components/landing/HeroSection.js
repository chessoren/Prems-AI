import { useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, CheckCircle2, Send, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

/* Animated Dashboard Mockup - replaces hero image */
const AnimatedDashboard = () => {
  const listings = [
    { agency: "Foncia", area: "Paris 11e", price: "1 050€", surface: "38m²", status: "sent" },
    { agency: "Orpi", area: "Paris 12e", price: "980€", surface: "32m²", status: "sent" },
    { agency: "Nexity", area: "Lyon 3e", price: "850€", surface: "45m²", status: "scanning" },
  ];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute -inset-4 bg-gradient-to-b from-orange-100/30 to-transparent rounded-3xl blur-xl" />
      <div className="relative bg-white rounded-2xl shadow-2xl shadow-neutral-200/60 border border-neutral-100 overflow-hidden">
        {/* Top bar */}
        <div className="bg-neutral-50 border-b border-neutral-100 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">P</span>
            </div>
            <span className="text-neutral-900 text-sm font-semibold">Prems AI</span>
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1 ml-3 bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-green-600 text-[10px] font-medium">Scan actif</span>
            </motion.div>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-neutral-400">
            <span>350+ sites</span>
            <span>En temps réel</span>
          </div>
        </div>

        {/* Scanning bar */}
        <div className="px-5 py-2 bg-orange-50/50 border-b border-orange-100/50">
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-orange-500" />
            <span className="text-orange-600 text-[10px] font-medium">Analyse en cours...</span>
            <div className="flex-1 h-1 bg-orange-100 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                animate={{ width: ['0%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className="p-4 space-y-2.5">
          {listings.map((l, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.5, duration: 0.4 }}
              className="flex items-center gap-3 bg-neutral-50 rounded-xl px-4 py-3 border border-neutral-100"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-orange-500 text-[10px] font-bold shrink-0">
                {l.agency[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-900 text-xs font-semibold">{l.agency}</span>
                  <span className="text-neutral-400 text-[10px]">{l.area}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-neutral-500">
                  <span className="font-medium text-neutral-700">{l.price}/mois</span>
                  <span>{l.surface}</span>
                </div>
              </div>
              {l.status === 'sent' ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.5, type: "spring" }}
                  className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
                  <CheckCircle2 size={10} className="text-green-500" />
                  <span className="text-green-600 text-[9px] font-semibold">Envoyé</span>
                </motion.div>
              ) : (
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-full px-2.5 py-1">
                  <Eye size={10} className="text-orange-500" />
                  <span className="text-orange-600 text-[9px] font-semibold">Scan...</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-4">
            <span className="text-neutral-500">Candidatures aujourd'hui : <span className="text-orange-500 font-bold">12</span></span>
            <span className="text-neutral-500">Visites obtenues : <span className="text-green-500 font-bold">3</span></span>
          </div>
          <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-1">
            <Send size={10} className="text-orange-400" />
            <span className="text-orange-500 font-medium">Envoi auto activé</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" data-testid="hero-section" className="relative pt-32 pb-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-200/40 via-orange-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-amber-200/30 via-orange-50/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[400px] bg-gradient-to-b from-orange-300/30 to-transparent rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          data-testid="hero-badge"
          className="inline-flex items-center gap-2 bg-white border border-neutral-200 rounded-full pl-1 pr-4 py-1 mb-8 shadow-sm">
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
          className="flex justify-center mb-16">
          <button data-testid="hero-cta-btn" onClick={() => navigate('/signup')}
            className="group bg-neutral-900 text-white px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-all hover:shadow-2xl hover:shadow-neutral-900/20 hover:scale-[1.02] active:scale-[0.98]">
            S'inscrire - 29€
            <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}>
          <AnimatedDashboard />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
