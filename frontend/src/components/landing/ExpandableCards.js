const cards = [
  {
    icon: "\u26a1",
    title: "R\u00e9activit\u00e9 24/7",
    description: "Vous dormez, vous travaillez, vous vivez. L'IA, elle, est active jour et nuit. Aucune annonce ne passe \u00e0 travers les mailles du filet."
  },
  {
    icon: "\ud83d\udcc8",
    title: "Volume de candidatures",
    description: "Envoyer 50 dossiers par jour \u00e0 la main est \u00e9puisant. Prems le fait sans effort. Plus vous postulez, plus vous avez de chances de visiter."
  },
  {
    icon: "\ud83e\uddd8\u200d\u2642\ufe0f",
    title: "Z\u00e9ro Stress",
    description: "La charge mentale de la recherche d'appartement est \u00e9norme. Enlevez-vous ce poids. Attendez juste que votre t\u00e9l\u00e9phone sonne."
  }
];

const ExpandableCards = () => {
  return (
    <section data-testid="expandable-cards" className="py-20 bg-neutral-50/50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-sm bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full font-medium mb-6">
            Efficacit&eacute;
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 leading-tight">
            Pourquoi d&eacute;l&eacute;guer &agrave; une IA ?
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              data-testid={`expandable-card-${i}`}
              className="bg-white rounded-2xl border border-neutral-200 p-8 hover:border-orange-200 hover:shadow-lg transition-all group"
            >
              <span className="text-3xl mb-4 block">{card.icon}</span>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 group-hover:text-orange-600 transition-colors">{card.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpandableCards;
