import { Zap, Bot, Filter, Activity, ShieldCheck } from 'lucide-react';

const BENTO_TRACKING = "https://static.prod-images.emergentagent.com/jobs/6c9f14f2-9187-4856-bc77-28da5fee9f1e/images/cdf7ccace5c466f3c7dd537782af596bf941389f6a24203b2e7ef0376118078f.png";

const BentoLayout = () => {
  return (
    <section data-testid="bento-layout" className="py-20 bg-neutral-50/50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-sm text-neutral-500 mb-4">
            <span className="text-orange-500">&#10023;</span> Fonctionnalit&eacute;s IA
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 leading-tight">
                Des agents puissants<br />pour votre <span className="italic text-orange-500">recherche</span>
              </h2>
              <p className="text-neutral-500 mt-4 max-w-md leading-relaxed">
                Automatisez la d&eacute;tection, la candidature et le suivi avec une IA construite pour le march&eacute; immobilier.
              </p>
            </div>
            <a href="/signup" className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all shrink-0" data-testid="bento-cta">
              Commencer <span className="text-lg">&rsaquo;</span>
            </a>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 - Large Left */}
          <div className="md:row-span-1 bg-white rounded-2xl border border-neutral-200 overflow-hidden group hover:border-orange-200 transition-all hover:shadow-lg" data-testid="bento-card-1">
            <div className="h-52 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-16 h-10 bg-white/80 rounded-lg"></div>
                <div className="absolute top-4 right-4 w-16 h-10 bg-white/80 rounded-lg"></div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-14 bg-white/80 rounded-lg"></div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150">
                  <line x1="40" y1="30" x2="100" y2="75" stroke="#f97316" strokeWidth="0.5" opacity="0.5" />
                  <line x1="160" y1="30" x2="100" y2="75" stroke="#f97316" strokeWidth="0.5" opacity="0.5" />
                  <line x1="100" y1="75" x2="100" y2="130" stroke="#f97316" strokeWidth="0.5" opacity="0.5" />
                </svg>
              </div>
              <div className="relative bg-white/90 backdrop-blur rounded-xl px-4 py-3 shadow-lg border border-orange-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs font-medium text-neutral-700">Connect&eacute; aux agences</span>
                </div>
                <div className="flex gap-2">
                  {['Foncia', 'Orpi', 'Nexity'].map(a => (
                    <span key={a} className="text-[10px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium">{a}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center mb-3">
                <Zap size={16} className="text-orange-500" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">Connexion directe aux agences</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">La plupart des gens attendent l'alerte SeLoger. Prems est connect&eacute; aux sites des agences (Foncia, Orpi...) pour voir l'annonce 4h avant tout le monde.</p>
            </div>
          </div>

          {/* Card 2 - Center */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden group hover:border-orange-200 transition-all hover:shadow-lg" data-testid="bento-card-2">
            <div className="h-52 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
              <div className="bg-neutral-900 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-xl group-hover:scale-105 transition-transform">
                <span className="text-orange-400">&#10023;</span>
                <span className="text-sm font-medium">Candidature Auto</span>
              </div>
            </div>
            <div className="p-5">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center mb-3">
                <Bot size={16} className="text-orange-500" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">Candidature 100% Automatique</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">L'IA remplit le formulaire, r&eacute;dige le message et joint votre dossier &agrave; votre place.</p>
            </div>
          </div>

          {/* Card 3 - Right */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden group hover:border-orange-200 transition-all hover:shadow-lg" data-testid="bento-card-3">
            <div className="h-52 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-md border border-neutral-100 p-3 w-full max-w-[200px]">
                <div className="flex items-center gap-2 mb-3">
                  <Filter size={14} className="text-orange-500" />
                  <span className="text-xs font-medium text-neutral-700">Filtres Actifs</span>
                </div>
                <div className="space-y-1.5">
                  {[{ label: 'Budget < 1200€', ok: true }, { label: 'Paris 11e, 12e', ok: true }, { label: '"Pas de coloc"', ok: false }].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px]">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center ${f.ok ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                        {f.ok ? '✓' : '✕'}
                      </span>
                      <span className="text-neutral-600">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center mb-3">
                <ShieldCheck size={16} className="text-orange-500" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">Filtres Intelligents</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">L'IA lit la description. Si l'annonce dit "Pas de colocation", elle ne postule pas.</p>
            </div>
          </div>

          {/* Card 4 - Bottom Large */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-neutral-200 overflow-hidden group hover:border-orange-200 transition-all hover:shadow-lg" data-testid="bento-card-4">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 flex flex-col justify-center">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center mb-3">
                  <Activity size={16} className="text-orange-500" />
                </div>
                <h3 className="font-semibold text-neutral-900 text-lg mb-2">Suivi en temps r&eacute;el</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">Connectez-vous &agrave; votre espace pour voir toutes les candidatures envoy&eacute;es par l'IA et les agences contact&eacute;es.</p>
              </div>
              <div className="h-64 md:h-auto bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
                <img src={BENTO_TRACKING} alt="Suivi en temps réel" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 bg-neutral-900 rounded-full px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/90 text-sm">Lancez votre recherche automatique en moins de <span className="text-orange-400 font-bold">60 secondes</span></p>
          <a href="/signup" className="text-white text-sm font-medium flex items-center gap-1 hover:text-orange-300 transition-colors" data-testid="bento-bottom-cta">
            Commencer maintenant <span>&rsaquo;</span>
          </a>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-neutral-500">
          <span className="flex items-center gap-2"><span className="text-orange-400">&#9679;</span> Configuration rapide</span>
          <span className="flex items-center gap-2"><span className="text-orange-400">&#9679;</span> Import automatique</span>
          <span className="flex items-center gap-2"><span className="text-orange-400">&#9679;</span> Tableau de bord unifi&eacute;</span>
        </div>
      </div>
    </section>
  );
};

export default BentoLayout;
