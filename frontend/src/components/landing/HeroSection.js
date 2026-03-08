import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HERO_IMG = "https://static.prod-images.emergentagent.com/jobs/6c9f14f2-9187-4856-bc77-28da5fee9f1e/images/1d16c3cacb4f9e357dfca5fda84463b7dcb874f6ab30274e4819359c25c9426c.png";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" data-testid="hero-section" className="relative pt-32 pb-8 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-200/40 via-orange-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-amber-200/30 via-orange-50/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[400px] bg-gradient-to-b from-orange-300/30 to-transparent rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          data-testid="hero-badge"
          className="inline-flex items-center gap-2 bg-white border border-neutral-200 rounded-full pl-1 pr-4 py-1 mb-8 shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Nouveau</span>
          <span className="text-sm text-neutral-700 font-medium">Chasseur immobilier IA</span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          data-testid="hero-title"
          className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight text-neutral-900 mb-6"
        >
          L'immobilier est une guerre.
          <br />
          <span className="italic">Envoyez votre soldat.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          data-testid="hero-subtitle"
          className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Prems détecte les annonces en temps réel sur 350+ sites d'agences immobilières et envoie votre dossier automatiquement. Vous ne recevez que les confirmations de visite.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-16"
        >
          <button
            data-testid="hero-cta-btn"
            onClick={() => navigate('/signup')}
            className="group bg-neutral-900 text-white px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-all hover:shadow-2xl hover:shadow-neutral-900/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            S'inscrire - 29€
            <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="absolute -inset-4 bg-gradient-to-b from-orange-100/40 to-transparent rounded-3xl blur-xl" />
          <div className="relative bg-white rounded-2xl shadow-2xl shadow-neutral-200/60 border border-neutral-100 overflow-hidden">
            <img
              src={HERO_IMG}
              alt="Prems AI Dashboard"
              className="w-full h-auto"
              data-testid="hero-image"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
