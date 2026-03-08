import { Zap, FileCheck, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Zap className="text-orange-500" size={22} />,
    title: "D\u00e9tection Imm\u00e9diate",
    description: "Nous surveillons 350+ sites d'agences en direct. Nous voyons l'annonce 4h avant qu'elle n'arrive sur SeLoger."
  },
  {
    icon: <FileCheck className="text-orange-500" size={22} />,
    title: "Candidature Auto",
    description: "L'IA remplit les formulaires, joint votre dossier et r\u00e9dige une motivation personnalis\u00e9e instantan\u00e9ment."
  },
  {
    icon: <ShieldCheck className="text-orange-500" size={22} />,
    title: "Z\u00e9ro Faux Espoir",
    description: "L'IA lit les descriptions. Si l'annonce dit \u00abPas de coloc\u00bb ou \u00abRDC\u00bb, elle ne postule pas. On ne grille pas votre cr\u00e9dibilit\u00e9."
  }
];

const FeaturesGrid = () => {
  return (
    <section data-testid="features-grid" className="relative py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 border border-neutral-200 rounded-2xl bg-white">
          {features.map((f, i) => (
            <div key={i} className="p-8 text-center group hover:bg-neutral-50/50 transition-colors" data-testid={`feature-${i}`}>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-neutral-900 text-base mb-2">{f.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
