const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-neutral-950 border-t border-neutral-800 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="text-white font-semibold">Prems</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500">
            <a href="#tarifs" className="hover:text-white transition-colors">Tarifs</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <span>Mentions l&eacute;gales</span>
            <span>CGV</span>
          </div>
          <p className="text-neutral-600 text-xs">&copy; 2026 Prems. Tous droits r&eacute;serv&eacute;s.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
