import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Search, FileText, Send, Phone, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* ========== ANIMATED WORKFLOW (right side) ========== */
const WorkflowAnimation = () => {
  const steps = [
    { icon: <Search size={20} />, label: "Détection", sub: "350+ sites scannés", color: "from-orange-400 to-amber-500" },
    { icon: <FileText size={20} />, label: "Analyse IA", sub: "Critères vérifiés", color: "from-orange-500 to-red-400" },
    { icon: <Send size={20} />, label: "Candidature", sub: "Dossier envoyé", color: "from-amber-500 to-orange-500" },
    { icon: <Phone size={20} />, label: "Visite", sub: "L'agence vous appelle", color: "from-green-400 to-emerald-500" },
  ];

  return (
    <div className="relative h-full flex flex-col items-center justify-center">
      {/* Glowing orb background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px] animate-pulse" />

      {/* Workflow steps */}
      <div className="relative space-y-3 w-full max-w-xs">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.3, duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="flex items-center gap-4 bg-neutral-800/60 backdrop-blur-sm border border-neutral-700/50 rounded-2xl px-5 py-4 group"
              animate={{
                borderColor: ['rgba(115,115,115,0.3)', 'rgba(249,115,22,0.5)', 'rgba(115,115,115,0.3)'],
              }}
              transition={{ delay: 1.5 + i * 1.2, duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shrink-0`}>
                {step.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold">{step.label}</p>
                <p className="text-neutral-400 text-xs">{step.sub}</p>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2 + i * 1.2, duration: 0.3, type: "spring" }}
              >
                <CheckCircle2 size={18} className="text-green-400" />
              </motion.div>
            </motion.div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <motion.div
                className="ml-9 w-0.5 h-3 bg-gradient-to-b from-orange-500/40 to-transparent mx-auto"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.8 + i * 0.3, duration: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom floating card */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-2xl px-6 py-4 text-center max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.6 }}
      >
        <p className="text-orange-400 text-sm font-semibold">Tout est automatique</p>
        <p className="text-neutral-500 text-xs mt-1">Pendant que vous vivez votre vie</p>
      </motion.div>
    </div>
  );
};

/* ========== SIGNUP PAGE ========== */
const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Veuillez remplir tous les champs."); return; }
    if (password.length < 6) { setError("Le mot de passe doit contenir au moins 6 caractères."); return; }

    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API}/auth/register`, { email, password });
      navigate(`/onboarding?user_id=${res.data.user_id}`);
    } catch (err) {
      setError(err.response?.data?.detail || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex" data-testid="signup-page">
      {/* LEFT SIDE - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]" />
        </div>

        <motion.div
          className="relative w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-white text-xl font-semibold tracking-tight">Prems</span>
          </div>

          <h1 className="font-serif text-4xl text-white leading-tight mb-2">
            Rejoignez la<br /><span className="italic text-orange-400">waitlist.</span>
          </h1>
          <p className="text-neutral-400 text-sm mb-8">
            Les 100 premiers inscrits passeront en priorité à la prochaine ouverture.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Email</label>
              <input
                data-testid="signup-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 transition-all"
              />
            </div>
            <div className="relative">
              <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Mot de passe</label>
              <input
                data-testid="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 6 caractères"
                className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 transition-all pr-12"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[34px] text-neutral-500 hover:text-neutral-300 transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </motion.p>
            )}

            <button
              data-testid="signup-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:shadow-orange-500/20 active:scale-[0.98] mt-6"
            >
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <>S'inscrire <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-neutral-600 text-xs text-center mt-6">
            En vous inscrivant, vous acceptez nos conditions d'utilisation.
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE - Animation */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden border-l border-neutral-800/50">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 60px), repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 60px)' }} />
        <WorkflowAnimation />
      </div>
    </div>
  );
};

export default SignupPage;
