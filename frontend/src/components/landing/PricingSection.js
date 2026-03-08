import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Shield, Rocket } from 'lucide-react';

const plans = [
  {
    name: "Le Soldat",
    icon: <Shield size={18} className="text-orange-500" />,
    price: "29",
    period: "/semaine",
    description: "La solution compl\u00e8te pour trouver vite.",
    popular: true,
    features: [
      "Candidatures Automatiques Illimit\u00e9es",
      "R\u00e9daction IA des messages",
      "Envoi du dossier prioritaire",
      "Garantie \u00abSatisfait ou Rembours\u00e9\u00bb"
    ],
    cta: "Activer l'Autopilote"
  },
  {
    name: "Le Commando",
    icon: <Rocket size={18} className="text-orange-500" />,
    price: "99",
    period: "/semaine",
    description: "Pour ceux qui cherchent sur la dur\u00e9e ou zones multiples.",
    popular: false,
    features: [
      "Tout ce qu'il y a dans le Soldat",
      "Recherche sur 3 zones simultan\u00e9es",
      "Support WhatsApp Prioritaire",
      "Acc\u00e8s anticip\u00e9 aux biens \u00abOff-Market\u00bb"
    ],
    cta: "Prendre le Commando"
  }
];

const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section id="tarifs" data-testid="pricing-section" className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-orange-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-amber-100/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-sm bg-neutral-100 text-neutral-600 px-4 py-1.5 rounded-full font-medium mb-6">
            Nos Tarifs
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 leading-tight mb-4">
            Votre temps vaut plus<br />que <span className="italic">29€.</span>
          </h2>
          <p className="text-neutral-500 max-w-lg mx-auto">
            Une offre simple. Sans engagement. Arr&ecirc;tez d&egrave;s que vous avez trouv&eacute;.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              data-testid={`pricing-card-${i}`}
              className={`relative bg-white rounded-2xl border p-8 transition-all hover:shadow-xl ${plan.popular ? 'border-orange-200 shadow-lg shadow-orange-100/40' : 'border-neutral-200 hover:border-neutral-300'}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-6 bg-neutral-900 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Le + populaire
                </span>
              )}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                  {plan.icon}
                </div>
                <span className="font-semibold text-neutral-900">{plan.name}</span>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold text-neutral-900">{plan.price}€</span>
                <span className="text-neutral-500 text-sm ml-1">{plan.period}</span>
              </div>
              <p className="text-sm text-neutral-500 mb-6">{plan.description}</p>
              <div className="border-t border-neutral-100 pt-6 mb-8">
                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-neutral-700">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-green-500" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => navigate('/signup')}
                data-testid={`pricing-cta-${i}`}
                className="w-full bg-neutral-900 text-white py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all hover:shadow-xl group"
              >
                {plan.cta}
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom notes */}
        <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-neutral-500">
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full border border-neutral-300 flex items-center justify-center text-[10px]">&#10003;</span>
            Sans engagement.
          </span>
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full border border-neutral-300 flex items-center justify-center text-[10px]">&#10003;</span>
            Annulation en un clic.
          </span>
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full border border-neutral-300 flex items-center justify-center text-[10px]">&#10003;</span>
            Satisfait ou rembours&eacute;.
          </span>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
