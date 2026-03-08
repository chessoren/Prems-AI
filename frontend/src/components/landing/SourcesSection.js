import { useNavigate } from 'react-router-dom';
import { ChevronRight, ExternalLink } from 'lucide-react';

const sources = [
  "Foncia", "Orpi", "Century 21", "Lafor\u00eat", "Guy Hoquet", "SeLoger",
  "Leboncoin", "Nexity", "ERA Immobilier", "St\u00e9phane Plaza", "Nestenn",
  "L'Adresse", "Square Habitat", "Citya", "PAP", "Bien'ici"
];

const SourcesSection = () => {
  const navigate = useNavigate();

  return (
    <section data-testid="sources-section" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Logos grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-12">
          {sources.map((s, i) => (
            <div key={i} className="flex items-center justify-center bg-neutral-50 rounded-xl border border-neutral-100 p-3 h-16 hover:border-orange-200 hover:bg-orange-50/30 transition-all group">
              <span className="text-xs font-semibold text-neutral-400 group-hover:text-orange-500 transition-colors text-center leading-tight">{s}</span>
            </div>
          ))}
        </div>

        {/* Center title */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 leading-tight mb-6">
            Toutes les sources.
            <br />
            <span className="italic">Un seul endroit.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              data-testid="sources-cta"
              onClick={() => navigate('/signup')}
              className="group bg-neutral-900 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-all hover:shadow-xl"
            >
              Lancer la recherche
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="text-neutral-500 hover:text-neutral-700 text-sm flex items-center gap-1.5 transition-colors" data-testid="sources-link">
              Voir les 350+ sites support&eacute;s
              <ExternalLink size={14} />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-4">
          {["Veille Agences", "Veille Portails", "Off-Market"].map((tag, i) => (
            <span key={i} className="bg-neutral-100 text-neutral-600 px-5 py-2 rounded-full text-sm font-medium">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SourcesSection;
