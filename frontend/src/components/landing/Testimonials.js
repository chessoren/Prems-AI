import { Star } from 'lucide-react';
import { FadeIn, ScaleIn } from './AnimationUtils';
import { motion } from 'framer-motion';
import { useInView } from './AnimationUtils';

const testimonials = [
  { name: "Julien M.", role: "Locataire à Paris", quote: "J'ai reçu un appel d'une agence alors que je n'avais même pas vu l'annonce. J'ai visité l'après-midi même et j'ai eu l'appartement. Simple et efficace." },
  { name: "Sarah L.", role: "Locataire à Lyon", quote: "Je n'en pouvais plus de rafraîchir Jinka toute la journée. Prems a tout géré pour moi pendant que j'étais au travail. Ça vaut largement les 29€." },
  { name: "Thomas & Léa", role: "Couple à Bordeaux", quote: "On cherchait un grand T2. L'IA a été super rapide pour envoyer notre dossier complet. On a eu 3 visites en une semaine." },
  { name: "Marc D.", role: "Étudiant à Nantes", quote: "C'est impressionnant de voir les mails de confirmation de candidature tomber tout seuls dans la boîte mail. Je recommande." }
];

const stats = [
  { value: "+1500", label: "Candidatures envoyées" },
  { value: "+400", label: "Visites obtenues" },
  { value: "100%", label: "Automatisé" }
];

const AnimatedCounter = ({ value }) => {
  const [ref, inView] = useInView();
  return (
    <motion.span ref={ref} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
      {value}
    </motion.span>
  );
};

const Testimonials = () => {
  return (
    <section data-testid="testimonials-section" className="py-20 bg-neutral-50/50">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-4">
              Ils ont trouvé grâce à Prems.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <ScaleIn key={i} delay={i * 0.1}>
              <div data-testid={`testimonial-${i}`} className="bg-white rounded-2xl border border-neutral-200 p-7 hover:border-orange-200 hover:shadow-lg transition-all h-full">
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
            </ScaleIn>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={0.3 + i * 0.1}>
              <div data-testid={`stat-${i}`} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-neutral-900 font-serif">
                  <AnimatedCounter value={s.value} />
                </p>
                <p className="text-sm text-neutral-500 mt-1">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
