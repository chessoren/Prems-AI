import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true); setError('');
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      navigate('/dashboard', { state: { user: res.data } });
    } catch (err) {
      setError(err.response?.data?.detail || "Email ou mot de passe incorrect.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/80 via-amber-50/40 to-orange-100/30 flex items-center justify-center px-6" data-testid="login-page">
      <div className="w-full max-w-md">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-10">
          <button onClick={() => navigate('/')} className="text-neutral-500 hover:text-neutral-700 text-sm flex items-center gap-2 transition-colors" data-testid="back-btn">
            <ArrowLeft size={16} /> Accueil
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="text-neutral-800 font-bold text-lg">Prems</span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-orange-100/30 border border-white/60 p-10">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-neutral-900 mb-2">Bon retour !</h1>
            <p className="text-neutral-400 text-sm">Connectez-vous pour voir votre position</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-neutral-500 text-xs tracking-wide mb-2 block font-semibold uppercase">Email</label>
              <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="jean@email.com" data-testid="login-email"
                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-800 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" />
            </div>
            <div>
              <label className="text-neutral-500 text-xs tracking-wide mb-2 block font-semibold uppercase">Mot de passe</label>
              <div className="relative">
                <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Votre mot de passe" data-testid="login-password"
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-800 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all pr-12" />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3" data-testid="login-error">
                {error}
              </motion.p>
            )}

            <motion.button type="submit" disabled={loading || !email || !password}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} data-testid="login-submit"
              className="w-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl">
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <>Se connecter <ArrowRight size={18} /></>
              )}
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <p className="text-neutral-400 text-sm">
              Pas encore inscrit ?{' '}
              <button onClick={() => navigate('/signup')} className="text-orange-500 hover:text-orange-600 font-semibold transition-colors" data-testid="goto-signup">
                S'inscrire
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
