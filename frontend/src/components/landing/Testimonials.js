import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Julien M.",
    role: "Locataire \u00e0 Paris",
    quote: "J'ai re\u00e7u un appel d'une agence alors que je n'avais m\u00eame pas vu l'annonce. J'ai visit\u00e9 l'apr\u00e8s-midi m\u00eame et j'ai eu l'appartement. Simple et efficace."
  },
  {
    name: "Sarah L.",
    role: "Locataire \u00e0 Lyon",
    quote: "Je n'en pouvais plus de rafra\u00eechir Jinka toute la journ\u00e9e. Prems a tout g\u00e9r\u00e9 pour moi pendant que j'\u00e9tais au travail. \u00c7a vaut largement les 29\u20ac."
  },
  {
    name: "Thomas & L\u00e9a",
    role: "Couple \u00e0 Bordeaux",
    quote: "On cherchait un grand T2. L'IA a \u00e9t\u00e9 super rapide pour envoyer notre dossier complet. On a eu 3 visites en une semaine."
  },
  {
    name: "Marc D.",
    role: "\u00c9tudiant \u00e0 Nantes",
    quote: "C'est impressionnant de voir les mails de confirmation de candidature tomber tout seuls dans la bo\u00eete mail. Je recommande."
  }
];

const stats = [
  { value: "+1500", label: "Candidatures envoy\u00e9es" },
  { value: "+400", label: "Visites obtenues" },
  { value: "100%", label: "Automatis\u00e9" }
];

const Testimonials = () => {
  return (
    <section data-testid="testimonials-section" className="py-20 bg-neutral-50/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-4">
            Ils ont trouv&eacute; gr&acirc;ce &agrave; Prems.
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <div key={i} data-testid={`testimonial-${i}`} className="bg-white rounded-2xl border border-neutral-200 p-7 hover:border-orange-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="text-orange-400 fill-orange-400" />
                ))}
              </div>
              <p className="text-neutral-700 leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 text-sm">{t.name}</p>
                  <p className="text-neutral-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <div key={i} data-testid={`stat-${i}`} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-neutral-900 font-serif">{s.value}</p>
              <p className="text-sm text-neutral-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
