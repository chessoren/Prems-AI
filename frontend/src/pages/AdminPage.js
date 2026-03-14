import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, LogOut, Users, Trophy, BarChart3, Building2, MapPin, Briefcase, Megaphone, Gift, Calendar, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const COLORS = ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5', '#8b5cf6', '#3b82f6', '#10b981'];

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const res = await axios.post(`${API}/admin/login`, { username, password });
      onLogin(res.data.token);
    } catch (err) {
      setError(err.response?.data?.detail || 'Identifiants invalides.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6" data-testid="admin-login">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-orange-500/20">
            <Lock size={22} className="text-white" />
          </div>
          <h1 className="text-white font-bold text-xl">Espace restreint</h1>
          <p className="text-neutral-600 text-sm mt-1">Accès réservé</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={username} onChange={e => { setUsername(e.target.value); setError(''); }}
            placeholder="Identifiant" data-testid="admin-username"
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-orange-500/40 transition-all" />
          <input type="password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }}
            placeholder="Mot de passe" data-testid="admin-password"
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-orange-500/40 transition-all" />
          {error && <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2" data-testid="admin-error">{error}</p>}
          <motion.button type="submit" disabled={loading}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} data-testid="admin-submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all">
            {loading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> : <>Accéder <ArrowRight size={16} /></>}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color = 'orange', delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 flex items-center justify-center`}>{icon}</div>
      <span className="text-neutral-500 text-xs uppercase tracking-wider font-semibold">{label}</span>
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
  </motion.div>
);

const ChartCard = ({ title, children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
    <div className="px-6 py-4 border-b border-white/[0.04]">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
    </div>
    <div className="p-6">{children}</div>
  </motion.div>
);

const AdminDashboard = ({ token }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/admin/stats?token=${token}`).then(r => { setStats(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [token]);

  if (loading) return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full" />
    </div>
  );

  if (!stats) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-500">Erreur de chargement</div>;

  const totalReferrals = stats.leaderboard.reduce((s, u) => s + (u.referral_count || 0), 0);

  return (
    <div className="min-h-screen bg-neutral-950" data-testid="admin-dashboard">
      {/* Top bar */}
      <div className="border-b border-white/[0.04] bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="text-white font-bold">Prems Admin</span>
            <span className="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full font-semibold">SECRET</span>
          </div>
          <button onClick={() => navigate('/')} className="text-neutral-500 hover:text-neutral-300 text-sm flex items-center gap-2" data-testid="admin-logout">
            <LogOut size={14} /> Quitter
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={<Users size={20} className="text-orange-400" />} label="Total inscrits" value={stats.total_users} delay={0.1} />
          <StatCard icon={<Gift size={20} className="text-purple-400" />} label="Parrainages" value={totalReferrals} delay={0.2} />
          <StatCard icon={<Zap size={20} className="text-green-400" />} label="Taux parrainage"
            value={stats.total_users > 0 ? `${Math.round((totalReferrals / stats.total_users) * 100)}%` : '0%'} delay={0.3} />
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Type de bien recherché" delay={0.4}>
            <div className="h-64 flex items-center justify-center">
              {stats.property_types.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={stats.property_types} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
                      {stats.property_types.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#171717', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : <p className="text-neutral-600 text-sm">Pas de données</p>}
              <div className="ml-4 space-y-2">
                {stats.property_types.map((pt, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-neutral-400">{pt.name}: <span className="text-white font-semibold">{pt.value}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Situation professionnelle" delay={0.5}>
            <div className="h-64">
              {stats.professional_statuses.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.professional_statuses}>
                    <XAxis dataKey="name" tick={{ fill: '#737373', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#737373', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#171717', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Bar dataKey="value" fill="#f97316" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : <p className="text-neutral-600 text-sm text-center pt-20">Pas de données</p>}
            </div>
          </ChartCard>

          <ChartCard title="Source d'acquisition" delay={0.6}>
            <div className="h-64 flex items-center justify-center">
              {stats.how_heard.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={stats.how_heard} cx="50%" cy="50%" outerRadius={90} paddingAngle={2} dataKey="value" stroke="none">
                      {stats.how_heard.map((_, i) => <Cell key={i} fill={COLORS[(i + 3) % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#171717', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : <p className="text-neutral-600 text-sm">Pas de données</p>}
              <div className="ml-4 space-y-2">
                {stats.how_heard.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[(i + 3) % COLORS.length] }} />
                    <span className="text-neutral-400">{h.name}: <span className="text-white font-semibold">{h.value}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Inscriptions par jour" delay={0.7}>
            <div className="h-64">
              {stats.signups_by_date.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.signups_by_date}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="date" tick={{ fill: '#737373', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#737373', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#171717', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="count" stroke="#f97316" strokeWidth={2} fill="url(#colorCount)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : <p className="text-neutral-600 text-sm text-center pt-20">Pas de données</p>}
            </div>
          </ChartCard>
        </div>

        {/* Additional charts row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ChartCard title="Budget" delay={0.8}>
            <div className="space-y-3">
              {stats.budget_ranges.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-neutral-500 text-xs w-20 shrink-0">{b.name}</span>
                  <div className="flex-1 h-3 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${stats.total_users > 0 ? (b.value / stats.total_users) * 100 : 0}%` }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                      className="h-full rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  </div>
                  <span className="text-white text-xs font-bold w-6 text-right">{b.value}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Nombre de pièces" delay={0.9}>
            <div className="space-y-3">
              {stats.rooms_distribution.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-neutral-500 text-xs w-16 shrink-0">{r.name}</span>
                  <div className="flex-1 h-3 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${stats.total_users > 0 ? (r.value / stats.total_users) * 100 : 0}%` }}
                      transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                      className="h-full bg-purple-500 rounded-full" />
                  </div>
                  <span className="text-white text-xs font-bold w-6 text-right">{r.value}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Équipements demandés" delay={1}>
            <div className="space-y-3">
              {stats.equipment_popularity.slice(0, 6).map((eq, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-neutral-500 text-xs w-24 shrink-0 truncate">{eq.name}</span>
                  <div className="flex-1 h-3 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${stats.total_users > 0 ? (eq.value / stats.total_users) * 100 : 0}%` }}
                      transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
                      className="h-full bg-green-500 rounded-full" />
                  </div>
                  <span className="text-white text-xs font-bold w-6 text-right">{eq.value}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Leaderboard for media */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden" data-testid="admin-leaderboard">
          <div className="px-6 py-5 border-b border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" />
              <h3 className="text-white font-semibold">Leaderboard</h3>
            </div>
            <span className="text-neutral-600 text-xs">{stats.leaderboard.length} utilisateurs</span>
          </div>
          {/* Table header */}
          <div className="grid grid-cols-12 gap-2 px-6 py-3 border-b border-white/[0.04] text-[10px] text-neutral-600 uppercase tracking-wider font-semibold">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Utilisateur</div>
            <div className="col-span-2">Email</div>
            <div className="col-span-1">Type</div>
            <div className="col-span-2">Ville</div>
            <div className="col-span-1">Statut Pro</div>
            <div className="col-span-1 text-center">Parrainages</div>
            <div className="col-span-1">Date</div>
          </div>
          {/* Rows */}
          {stats.leaderboard.map((u, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + i * 0.05 }}
              className="grid grid-cols-12 gap-2 px-6 py-3.5 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors items-center">
              <div className="col-span-1">
                <span className={`text-sm font-bold ${
                  i === 0 ? 'text-yellow-400' : i === 1 ? 'text-neutral-400' : i === 2 ? 'text-orange-400' : 'text-neutral-600'
                }`}>
                  {u.waitlist_position}
                </span>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i === 0 ? 'bg-yellow-500/10 text-yellow-400' : 'bg-white/[0.04] text-neutral-500'
                }`}>
                  {(u.first_name || 'A')[0]}{(u.last_name || '')[0] || ''}
                </div>
                <span className="text-white text-sm font-medium truncate">{u.first_name || 'Anonyme'} {u.last_name || ''}</span>
              </div>
              <div className="col-span-2 text-neutral-500 text-xs truncate">{u.email}</div>
              <div className="col-span-1 text-neutral-400 text-xs">{u.property_type || '-'}</div>
              <div className="col-span-2 text-neutral-400 text-xs truncate">{u.search_cities || '-'}</div>
              <div className="col-span-1 text-neutral-400 text-xs truncate">{u.professional_status || '-'}</div>
              <div className="col-span-1 text-center">
                {(u.referral_count || 0) > 0 ? (
                  <span className="bg-orange-500/10 text-orange-400 text-xs font-bold px-2 py-0.5 rounded-full">{u.referral_count}</span>
                ) : (
                  <span className="text-neutral-600 text-xs">0</span>
                )}
              </div>
              <div className="col-span-1 text-neutral-600 text-[10px]">{u.created_at ? u.created_at.slice(5, 10) : '-'}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [token, setToken] = useState(null);
  if (!token) return <AdminLogin onLogin={setToken} />;
  return <AdminDashboard token={token} />;
};

export default AdminPage;
