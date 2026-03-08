import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';

const DEEP_DIVE_SPEED = "https://static.prod-images.emergentagent.com/jobs/6c9f14f2-9187-4856-bc77-28da5fee9f1e/images/892514e77c975526e641c437f721d2ef2a0a14423162ef0dd36ff20f15e3d556.png";
const DEEP_DIVE_RELAX = "https://static.prod-images.emergentagent.com/jobs/6c9f14f2-9187-4856-bc77-28da5fee9f1e/images/58022ae0d8612366589a6a0ca37b9e9120207d7614eb3283ef9d0a37cf49dd1d.png";

const DeepDive1 = () => {
  const navigate = useNavigate();
  const bullets = [
    "D\u00e9tection imm\u00e9diate sur le site de l'agence.",
    "Analyse de vos crit\u00e8res (Loyer, Surface, Zone).",
    "Envoi du dossier avant le premier appel humain."
  ];

  return (
    <section data-testid="deep-dive-1" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-orange-100/40 to-amber-50/30 rounded-3xl blur-xl opacity-60" />
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-lg">
              <img src={DEEP_DIVE_SPEED} alt="Vitesse Prems" className="w-full h-auto" />
            </div>
          </div>
          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-2 text-sm bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full font-medium mb-6">
              L'Avantage
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 leading-tight mb-4">
              Votre dossier sur le bureau de l'agence.
              <br />
              <span className="italic">Avant tout le monde.</span>
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-6">
              Les agr&eacute;gateurs classiques (Jinka, SeLoger) ont un retard de plusieurs heures. Prems est connect&eacute; directement aux serveurs des agences. Vous arrivez avant la foule.
            </p>
            <ul className="space-y-3 mb-8">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-white" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <button
              data-testid="deep-dive-1-cta"
              onClick={() => navigate('/signup')}
              className="group bg-neutral-900 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-all hover:shadow-xl"
            >
              Prendre de vitesse le march&eacute;
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const DeepDive2 = () => {
  const navigate = useNavigate();
  const bullets = [
    "Vous ne faites rien.",
    "Votre t\u00e9l\u00e9phone sonne uniquement pour des visites.",
    "Votre agenda se remplit tout seul."
  ];

  return (
    <section data-testid="deep-dive-2" className="py-20 bg-neutral-50/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 text-sm bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full font-medium mb-6">
              Tranquillit&eacute;
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 leading-tight mb-4">
              Arr&ecirc;tez de chercher.
              <br />
              <span className="italic">Commencez &agrave; visiter.</span>
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-6">
              Chercher un appartement est un job &agrave; plein temps. D&eacute;missionnez. Laissez Prems faire le sale boulot de veille et de candidature.
            </p>
            <ul className="space-y-3 mb-8">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-white" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <button
              data-testid="deep-dive-2-cta"
              onClick={() => navigate('/signup')}
              className="group bg-neutral-900 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-all hover:shadow-xl"
            >
              D&eacute;l&eacute;guer ma recherche
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          {/* Image */}
          <div className="relative group order-1 md:order-2">
            <div className="absolute -inset-4 bg-gradient-to-bl from-orange-100/40 to-amber-50/30 rounded-3xl blur-xl opacity-60" />
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-lg">
              <img src={DEEP_DIVE_RELAX} alt="Tranquillité Prems" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { DeepDive1, DeepDive2 };
