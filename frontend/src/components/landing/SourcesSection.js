import { useNavigate } from 'react-router-dom';
import { ChevronRight, ExternalLink, Globe, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from './AnimationUtils';

const sourcesRow1 = ["Foncia", "Orpi", "Century 21", "Laforêt", "Guy Hoquet", "SeLoger", "Leboncoin", "Nexity"];
const sourcesRow2 = ["ERA Immobilier", "Stéphane Plaza", "Nestenn", "L'Adresse", "Square Habitat", "Citya", "PAP", "Bien'ici"];

const MarqueeRow = ({ items, reverse = false }) => (
  <div className="marquee-container py-2">
    <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
      {[...items, ...items, ...items].map((s, i) => (
        <div key={i} className="flex items-center justify-center bg-neutral-50 rounded-xl border border-neutral-100 px-6 py-4 mx-2 min-w-[140px] hover:border-orange-200 hover:bg-orange-50/30 transition-all group cursor-default">
          <span className="text-sm font-semibold text-neutral-400 group-hover:text-orange-500 transition-colors whitespace-nowrap">{s}</span>
        </div>
      ))}
    </div>
  </div>
);

const SourcesSection = () => {
  const navigate = useNavigate();

  return (
    <section data-testid="sources-section" className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Animated marquee rows */}
        <MarqueeRow items={sourcesRow1} />
        <MarqueeRow items={sourcesRow2} reverse />

        {/* Center content */}
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mt-14 mb-10">
              <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 leading-tight mb-6">
                Toutes les sources.
                <br />
                <span className="italic">Un seul endroit.</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button data-testid="sources-cta" onClick={() => navigate('/signup')}
                  className="group bg-neutral-900 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-all hover:shadow-xl">
                  Lancer la recherche
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="text-neutral-500 hover:text-neutral-700 text-sm flex items-center gap-1.5 transition-colors" data-testid="sources-link">
                  Voir les 350+ sites supportés
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Tags with icons */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: "Veille Agences", icon: <Globe size={14} /> },
                { label: "Veille Portails", icon: <ExternalLink size={14} /> },
                { label: "Off-Market", icon: <CheckCircle2 size={14} /> },
              ].map((tag, i) => (
                <span key={i} className="bg-neutral-100 text-neutral-600 px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2">
                  {tag.icon} {tag.label}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default SourcesSection;
