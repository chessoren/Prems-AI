import { useState } from 'react';
import { MessageSquare, FileText, Zap, Globe, Ban } from 'lucide-react';

const tabs = [
  {
    label: "Message Personnalis\u00e9",
    icon: <MessageSquare size={16} />,
    title: "Des emails qui donnent envie.",
    description: "L'IA r\u00e9dige une lettre de motivation unique pour chaque annonce. Elle met en avant votre situation (CDI, Garants) pour rassurer l'agent immobilier imm\u00e9diatement."
  },
  {
    label: "Dossier Inclus",
    icon: <FileText size={16} />,
    title: "Votre dossier toujours joint.",
    description: "Nous incluons automatiquement un lien s\u00e9curis\u00e9 vers votre dossier locatif dans chaque candidature. L'agence a tout ce qu'il faut pour dire \u00aboui\u00bb."
  },
  {
    label: "Vitesse \u00c9clair",
    icon: <Zap size={16} />,
    title: "Moins d'une minute.",
    description: "Entre le moment o\u00f9 l'annonce est publi\u00e9e et le moment o\u00f9 l'agence re\u00e7oit votre candidature, il s'\u00e9coule moins de 60 secondes."
  },
  {
    label: "Multi-Sites",
    icon: <Globe size={16} />,
    title: "On scanne tout le web.",
    description: "Sites d'agences, Leboncoin, SeLoger, Jinka... Vous n'avez plus besoin d'avoir 50 onglets ouverts."
  },
  {
    label: "Anti-Doublon",
    icon: <Ban size={16} />,
    title: "Pas de spam.",
    description: "Si une annonce est publi\u00e9e sur 3 sites diff\u00e9rents, Prems ne postule qu'une seule fois pour ne pas harceler l'agence."
  }
];

const AdditionalFeatures = () => {
  const [active, setActive] = useState(0);

  return (
    <section data-testid="additional-features" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 leading-tight mb-4">
            Tout est g&eacute;r&eacute; pour vous.
          </h2>
          <p className="text-neutral-500 max-w-lg mx-auto">
            De la d&eacute;tection de l'annonce jusqu'&agrave; l'envoi de l'email, on s'occupe de tout.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab, i) => (
            <button
              key={i}
              data-testid={`feature-tab-${i}`}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                active === i
                  ? 'bg-neutral-900 text-white shadow-lg'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-10 transition-all" data-testid="feature-content">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-6 text-orange-500">
              {tabs[active].icon}
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">{tabs[active].title}</h3>
            <p className="text-neutral-500 leading-relaxed">{tabs[active].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalFeatures;
