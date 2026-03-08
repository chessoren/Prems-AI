import { Check, X } from 'lucide-react';

const rows = [
  {
    criteria: "Temps de r\u00e9action",
    manual: "2 \u00e0 4 heures",
    prems: "< 60 secondes"
  },
  {
    criteria: "Couverture",
    manual: "SeLoger / Leboncoin",
    prems: "+350 sites d'agences en direct"
  },
  {
    criteria: "Effort",
    manual: "2h / jour",
    prems: "0 min / jour"
  },
  {
    criteria: "R\u00e9sultat",
    manual: "\u00abD\u00e9j\u00e0 lou\u00e9\u00bb",
    prems: "\u00abVisite confirm\u00e9e\u00bb"
  }
];

const ComparisonSection = () => {
  return (
    <section data-testid="comparison-section" className="relative py-24 bg-neutral-950 overflow-hidden">
      {/* Top gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-neutral-950 -translate-y-full" />

      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-40 h-40 bg-gradient-to-b from-orange-400/40 to-orange-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center border border-neutral-700">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
        </div>
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 80px)' }} />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <span className="inline-flex items-center gap-2 text-sm bg-neutral-800 text-neutral-300 px-4 py-1.5 rounded-full font-medium mb-6 border border-neutral-700">
            <span className="text-orange-400">&#9826;</span> La diff&eacute;rence
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-4">
            La diff&eacute;rence Prems.
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Dans une zone tendue, la vitesse est le seul crit&egrave;re qui compte vraiment.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900/50 backdrop-blur">
          {/* Header Row */}
          <div className="grid grid-cols-3 border-b border-neutral-800">
            <div className="p-5 text-neutral-400 font-semibold text-sm">Crit&egrave;res</div>
            <div className="p-5 text-neutral-400 font-semibold text-sm text-center border-l border-neutral-800">Recherche Manuelle</div>
            <div className="p-5 text-center border-l border-neutral-800 bg-gradient-to-b from-orange-950/30 to-transparent">
              <div className="flex items-center justify-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-[10px]">P</span>
                </div>
                <span className="text-white font-semibold text-sm">Prems</span>
              </div>
            </div>
          </div>

          {/* Data Rows */}
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-b border-neutral-800/50 last:border-b-0 hover:bg-neutral-800/20 transition-colors" data-testid={`comparison-row-${i}`}>
              <div className="p-5">
                <span className="text-white font-semibold text-sm">{row.criteria}</span>
              </div>
              <div className="p-5 text-center border-l border-neutral-800/50 flex items-center justify-center">
                <span className="text-neutral-500 text-sm">{row.manual}</span>
              </div>
              <div className="p-5 text-center border-l border-neutral-800/50 bg-gradient-to-b from-orange-950/10 to-transparent flex items-center justify-center">
                <span className="text-orange-400 font-semibold text-sm">{row.prems}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
