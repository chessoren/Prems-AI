import { useNavigate } from 'react-router-dom';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section data-testid="final-cta" className="relative py-24 bg-neutral-950 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-600/10 via-orange-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 60px), repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 60px)' }} />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
          Pr&ecirc;t &agrave; gagner la guerre ?
        </h2>
        <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Le prochain appartement de vos r&ecirc;ves sera publi&eacute; dans environ 10 minutes. Serez-vous le premier dossier re&ccedil;u ?
        </p>
        <button
          data-testid="final-cta-btn"
          onClick={() => navigate('/signup')}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-base font-semibold transition-all hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          Passer devant tout le monde
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
