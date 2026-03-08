import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Est-ce que je risque de me faire bannir des sites ?",
    a: "Non. Prems navigue comme un utilisateur normal, en respectant les r\u00e8gles des sites. C'est s\u00e9curis\u00e9 pour vous."
  },
  {
    q: "Comment l'agence me r\u00e9pond-elle ?",
    a: "Dans le formulaire de contact, nous mettons VOTRE email et VOTRE num\u00e9ro de t\u00e9l\u00e9phone. L'agence vous appelle directement, nous ne faisons pas l'interm\u00e9diaire."
  },
  {
    q: "L'IA va-t-elle postuler \u00e0 des trucs qui ne me plaisent pas ?",
    a: "Non. Vous d\u00e9finissez vos crit\u00e8res (Zone, Budget, Surface). L'IA respecte \u00e7a strictement. Elle lit aussi les descriptions pour \u00e9viter les crit\u00e8res r\u00e9dhibitoires."
  },
  {
    q: "\u00c7a marche pour la colocation ?",
    a: "Oui. Notre syst\u00e8me d\u00e9tecte les annonces adapt\u00e9es \u00e0 la colocation si c'est ce que vous cherchez."
  },
  {
    q: "Est-ce que je peux arr\u00eater quand je veux ?",
    a: "Oui. L'abonnement est sans engagement. Vous pouvez l'annuler en un clic d\u00e8s que vous avez trouv\u00e9 votre appartement."
  },
  {
    q: "Dans quelles villes Prems est-il disponible ?",
    a: "Partout en France. Notre technologie fonctionne sur tout le territoire. Cependant, l'outil est particuli\u00e8rement redoutable dans les \u00abzones tendues\u00bb (Paris, Lyon, Bordeaux, Nantes, etc.) o\u00f9 la r\u00e9activit\u00e9 est la cl\u00e9 pour obtenir une visite."
  },
  {
    q: "Comment s\u00e9curisez-vous mon dossier de location ?",
    a: "La s\u00e9curit\u00e9 est notre priorit\u00e9. Vos documents ne sont pas stock\u00e9s en clair sur nos serveurs. Nous transmettons uniquement le lien s\u00e9curis\u00e9 (type DossierFacile ou Drive) que vous nous fournissez. L'agence est la seule \u00e0 pouvoir consulter vos pi\u00e8ces justificatives."
  },
  {
    q: "Combien de temps faut-il pour configurer l'outil ?",
    a: "Moins de 3 minutes. Vous cr\u00e9ez votre compte, vous entrez vos crit\u00e8res (Loyer, Ville, Surface) et votre lien de dossier. C'est tout. L'IA commence \u00e0 scanner le march\u00e9 imm\u00e9diatement apr\u00e8s."
  },
  {
    q: "Comment savoir si l'IA a bien envoy\u00e9 une candidature ?",
    a: "La transparence est totale. Vous recevez une copie de chaque email envoy\u00e9 par l'IA dans votre propre bo\u00eete mail, et vous pouvez suivre l'historique de toutes les candidatures depuis votre tableau de bord en temps r\u00e9el."
  },
  {
    q: "Y a-t-il un support humain en cas de probl\u00e8me ?",
    a: "Oui. M\u00eame si l'outil est automatis\u00e9, notre \u00e9quipe est disponible 7j/7 par chat ou email pour vous aider \u00e0 affiner vos crit\u00e8res ou r\u00e9pondre \u00e0 vos questions sur le march\u00e9 immobilier."
  }
];

const FAQItem = ({ faq, isOpen, toggle, index }) => (
  <div
    data-testid={`faq-item-${index}`}
    className="border-b border-neutral-200 last:border-b-0"
  >
    <button
      onClick={toggle}
      className="w-full py-5 px-1 flex items-center justify-between text-left group"
      data-testid={`faq-toggle-${index}`}
    >
      <span className="text-neutral-900 font-medium pr-4 group-hover:text-orange-600 transition-colors">{faq.q}</span>
      <ChevronDown size={18} className={`text-neutral-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
      <p className="text-neutral-500 text-sm leading-relaxed px-1">{faq.a}</p>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section data-testid="faq-section" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-900">
            Questions Fr&eacute;quentes.
          </h2>
        </div>
        <div className="divide-y divide-neutral-200 border-t border-neutral-200">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
