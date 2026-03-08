import { Star } from 'lucide-react';

const agencies = [
  "Foncia", "Orpi", "Century 21", "Lafor\u00eat", "Guy Hoquet", "ERA Immobilier",
  "St\u00e9phane Plaza", "Nestenn", "L'Adresse", "Square Habitat", "Citya",
  "Nexity", "Emeria", "Sergic", "Lamy", "Sogeprom", "Icade", "Eiffage Immobilier",
  "Bouygues Immobilier", "Kaufman & Broad", "Pichet", "Cogedim"
];

const TrustedBy = () => {
  return (
    <section data-testid="trusted-by" className="py-12 bg-white border-t border-b border-neutral-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="shrink-0">
            <p className="text-neutral-400 text-sm mb-1">Utilis&eacute; par</p>
            <p className="text-neutral-900 text-2xl font-bold font-serif">500+ locataires</p>
            <p className="text-neutral-900 text-sm font-medium">ce mois-ci.</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-sm font-medium text-neutral-700">G</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-orange-400 fill-orange-400" />
              ))}
              <span className="text-sm text-neutral-500 ml-1">4.9/5 de satisfaction</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="marquee-container">
              <div className="marquee-track">
                {[...agencies, ...agencies].map((name, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-50 rounded-lg border border-neutral-100 text-neutral-600 text-sm font-medium whitespace-nowrap mx-1.5 hover:border-orange-200 transition-colors">
                    <span className="w-5 h-5 rounded bg-neutral-200 flex items-center justify-center text-[10px] font-bold text-neutral-500">{name[0]}</span>
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="marquee-container mt-3">
              <div className="marquee-track-reverse">
                {[...agencies.slice(11), ...agencies.slice(0, 11), ...agencies.slice(11), ...agencies.slice(0, 11)].map((name, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-50 rounded-lg border border-neutral-100 text-neutral-600 text-sm font-medium whitespace-nowrap mx-1.5 hover:border-orange-200 transition-colors">
                    <span className="w-5 h-5 rounded bg-neutral-200 flex items-center justify-center text-[10px] font-bold text-neutral-500">{name[0]}</span>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
