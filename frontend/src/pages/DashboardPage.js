import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Share2, Gift, Rocket, Trophy, Star, ArrowRight, LogOut, Sparkles } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.focus(); ta.select();
    const ok = document.execCommand('copy'); document.body.removeChild(ta); return ok;
  } catch { return false; }
};

const QUOTES = [
  { text: "La rapidité, c'est la politesse de ceux qui trouvent un logement.", author: "Prems AI" },
  { text: "Pendant que les autres cherchent, vous visitez.", author: "Votre IA préférée" },
  { text: "Le meilleur moment pour chercher un appartement, c'est maintenant.", author: "Prems" },
  { text: "Chaque minute compte quand il s'agit de votre futur chez-vous.", author: "L'équipe Prems" },
];

const AnimatedCounter = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!target) return;
    let start = 0;
    const step = Math.ceil(target / (duration * 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count}</span>;
};

const RocketAnimation = () => (
  <div className="relative w-full h-64 overflow-hidden">
    {/* Stars background */}
    {Array.from({ length: 20 }, (_, i) => (
      <motion.div key={`star-${i}`} className="absolute w-1 h-1 bg-orange-300/40 rounded-full"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{ opacity: [0, 1, 0], y: [0, 30, 60], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }} />
    ))}
    {/* Rocket */}
    <motion.div className="absolute left-1/2 -translate-x-1/2"
      initial={{ bottom: -40 }}
      animate={{ bottom: [−40, 80, 60] }}
      transition={{ duration: 2, times: [0, 0.7, 1], ease: "easeOut" }}>
      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
        <div className="text-6xl text-center"><Rocket size={48} className="text-orange-500 rotate-[-30deg]" /></div>
        {/* Flame trail */}
        <motion.div className="flex justify-center mt-1"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 0.4, repeat: Infinity }}>
          <div className="w-4 h-8 bg-gradient-to-t from-transparent via-orange-400 to-yellow-400 rounded-full blur-sm" />
        </motion.div>
      </motion.div>
    </motion.div>
    {/* Speed lines */}
    {[1, 2, 3].map(i => (
      <motion.div key={`line-${i}`}
        className="absolute left-1/2 w-0.5 bg-gradient-to-t from-orange-300/30 to-transparent"
        style={{ marginLeft: `${(i - 2) * 20}px`, height: '40px' }}
        animate={{ top: ['100%', '0%'], opacity: [0, 0.6, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.3, ease: "linear" }} />
    ))}
  </div>
);

const PositionTicker = ({ position, total }) => {
  const numbers = Array.from({ length: Math.min(total, 20) }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-2">
      {numbers.map((n, i) => (
        <motion.div key={n}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: n === position ? 1 : 0.15, y: 0, scale: n === position ? 1.3 : 0.8 }}
          transition={{ delay: i * 0.05, type: "spring" }}
          className={`flex items-center justify-center rounded-full text-xs font-bold ${
            n === position ? 'w-10 h-10 bg-orange-500 text-white shadow-lg shadow-orange-300' :
            n < position ? 'w-7 h-7 bg-green-100 text-green-600' :
            'w-7 h-7 bg-neutral-100 text-neutral-400'
          }`}>
          {n}
        </motion.div>
      ))}
      {total > 20 && <span className="text-neutral-400 text-xs ml-1">...{total}</span>}
    </div>
  );
};

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user || null);
  const [copied, setCopied] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const isFresh = location.state?.fresh;

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    axios.get(`${API}/waitlist/leaderboard`).then(r => setLeaderboard(r.data)).catch(() => {});
    const qi = setInterval(() => setQuoteIdx(prev => (prev + 1) % QUOTES.length), 6000);
    return () => clearInterval(qi);
  }, [user, navigate]);

  const handleCopy = async () => {
    const ok = await copyToClipboard(user.referral_code);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2500); }
  };

  const handleShare = async () => {
    const text = `Je suis #${user.waitlist_position} sur Prems AI ! Utilise mon code ${user.referral_code} pour gagner des places : https://prems.ai`;
    if (navigator.share) { try { await navigator.share({ text }); } catch {} }
    else { await copyToClipboard(text); setCopied(true); setTimeout(() => setCopied(false), 2500); }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/80 via-amber-50/40 to-orange-100/30" data-testid="dashboard-page">
      {/* Nav */}
      <div className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="text-neutral-800 font-bold text-lg">Prems</span>
        </div>
        <button onClick={() => navigate('/')} className="text-neutral-500 hover:text-neutral-700 text-sm flex items-center gap-2 transition-colors" data-testid="logout-btn">
          <LogOut size={14} /> Quitter
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        {/* Welcome */}
        {isFresh && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8">
            <RocketAnimation />
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: isFresh ? 1 : 0 }}
          className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-3">
            {isFresh ? (
              <>Bienvenue{user.first_name ? `, ${user.first_name}` : ''} !</>
            ) : (
              <>Bon retour{user.first_name ? `, ${user.first_name}` : ''} !</>
            )}
          </h1>
          <p className="text-neutral-500 text-base">
            {isFresh ? "Vous êtes inscrit sur la waitlist de Prems AI." : "Voici votre position sur la waitlist."}
          </p>
        </motion.div>

        {/* Position card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: isFresh ? 1.3 : 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-orange-100/30 border border-white/60 p-10 mb-6 text-center" data-testid="position-card">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy size={20} className="text-orange-500" />
            <span className="text-neutral-500 text-xs uppercase tracking-[0.2em] font-semibold">Votre position</span>
          </div>
          <motion.p className="text-7xl md:text-8xl font-bold text-orange-500 font-serif mb-2" data-testid="position-number"
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: isFresh ? 1.8 : 0.4, type: "spring", stiffness: 150 }}>
            #<AnimatedCounter target={user.waitlist_position} />
          </motion.p>
          <p className="text-neutral-400 text-sm">
            sur <span className="font-bold text-neutral-600">{user.total_waitlist}</span> inscrits
          </p>
          <div className="mt-6">
            <PositionTicker position={user.waitlist_position} total={user.total_waitlist} />
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: isFresh ? 2.5 : 0.8 }}
            className="mt-6 bg-orange-50 rounded-xl px-4 py-3 text-xs text-orange-600">
            Les <span className="font-bold">100 premiers</span> accèderont en priorité au service.
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Referral card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: isFresh ? 2 : 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-orange-100/30 border border-white/60 p-8" data-testid="referral-card">
            <div className="flex items-center gap-2 mb-5">
              <Gift size={20} className="text-orange-500" />
              <span className="text-neutral-700 font-semibold text-sm">Votre code de parrainage</span>
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-2xl font-bold text-neutral-900 tracking-[0.15em] font-mono select-all" data-testid="referral-code">
                {user.referral_code}
              </span>
              <motion.button onClick={handleCopy} data-testid="copy-code-btn"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-xl bg-neutral-100 hover:bg-orange-100 transition-colors">
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-neutral-500" />}
              </motion.button>
            </div>
            {copied && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="text-green-500 text-xs text-center mb-3 font-medium">
                Copié dans le presse-papier !
              </motion.p>
            )}
            <p className="text-center text-neutral-400 text-xs">
              <span className="text-orange-500 font-bold">+10 places</span> par ami qui s'inscrit
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-neutral-500">
              <Star size={14} className="text-orange-400" />
              <span>{user.referral_count || 0} parrainage{(user.referral_count || 0) !== 1 ? 's' : ''}</span>
            </div>
            <motion.button onClick={handleShare} data-testid="share-btn"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full mt-5 bg-neutral-900 hover:bg-neutral-800 text-white py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg">
              <Share2 size={16} /> Inviter mes amis
            </motion.button>
          </motion.div>

          {/* Quote card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: isFresh ? 2.3 : 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-orange-100/30 border border-white/60 p-8 flex flex-col justify-between" data-testid="quote-card">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Sparkles size={20} className="text-orange-500" />
                <span className="text-neutral-700 font-semibold text-sm">Citation du jour</span>
              </div>
              <div className="h-32 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div key={quoteIdx}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}>
                    <blockquote className="text-xl text-neutral-700 font-serif italic leading-relaxed">
                      "{QUOTES[quoteIdx].text}"
                    </blockquote>
                    <p className="text-neutral-400 text-sm mt-3">— {QUOTES[quoteIdx].author}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex gap-1.5 mt-4">
              {QUOTES.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === quoteIdx ? 'bg-orange-400 w-6' : 'bg-neutral-200 w-2'}`} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: isFresh ? 2.6 : 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-orange-100/30 border border-white/60 overflow-hidden" data-testid="leaderboard">
            <div className="px-8 py-5 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-orange-500" />
                <span className="text-neutral-700 font-semibold">Classement en direct</span>
              </div>
              <span className="text-neutral-400 text-xs">{leaderboard.length} inscrits</span>
            </div>
            <div className="divide-y divide-neutral-50">
              {leaderboard.slice(0, 10).map((u, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (isFresh ? 2.8 : 1) + i * 0.08 }}
                  className={`flex items-center gap-4 px-8 py-4 ${u.referral_code === user.referral_code ? 'bg-orange-50/60' : 'hover:bg-neutral-50/50'} transition-colors`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    i === 0 ? 'bg-yellow-100 text-yellow-600' :
                    i === 1 ? 'bg-neutral-100 text-neutral-500' :
                    i === 2 ? 'bg-orange-100 text-orange-500' :
                    'bg-neutral-50 text-neutral-400'
                  }`}>
                    {u.waitlist_position}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${u.referral_code === user.referral_code ? 'text-orange-600' : 'text-neutral-700'}`}>
                      {u.first_name || 'Anonyme'} {u.last_name ? u.last_name[0] + '.' : ''}
                      {u.referral_code === user.referral_code && (
                        <span className="ml-2 text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">Vous</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-neutral-400">
                    <Gift size={12} /> {u.referral_count || 0}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
