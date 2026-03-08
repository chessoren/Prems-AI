import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav data-testid="navbar" className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? 'shadow-2xl scale-[0.98]' : ''} bg-neutral-900/95 backdrop-blur-xl rounded-full px-3 py-2.5 flex items-center`} style={{ width: 'min(92vw, 720px)' }}>
      <div className="flex items-center gap-2 pl-3 cursor-pointer" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm font-sans">P</span>
        </div>
        <span className="text-white text-lg font-semibold font-sans tracking-tight">Prems</span>
      </div>
      <div className="hidden md:flex items-center gap-1 ml-6">
        {[{ label: 'Accueil', id: 'hero' }, { label: 'Tarifs', id: 'tarifs' }, { label: 'Blog', id: 'blog' }].map(item => (
          <button key={item.id} onClick={() => scrollTo(item.id)} className="text-white/70 hover:text-white px-3.5 py-1.5 text-sm transition-colors rounded-full hover:bg-white/10" data-testid={`nav-${item.id}`}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button onClick={() => navigate('/signup')} data-testid="nav-signup-btn" className="hidden md:flex bg-white text-neutral-900 px-5 py-2 rounded-full text-sm font-semibold items-center gap-1.5 hover:bg-neutral-100 transition-all hover:shadow-lg">
          S'inscrire <ChevronRight size={14} />
        </button>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-2" data-testid="mobile-menu-btn">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900/95 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-2 shadow-2xl md:hidden">
          {[{ label: 'Accueil', id: 'hero' }, { label: 'Tarifs', id: 'tarifs' }, { label: 'Blog', id: 'blog' }].map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="text-white/80 hover:text-white px-4 py-2.5 text-sm text-left rounded-xl hover:bg-white/10 transition-colors">
              {item.label}
            </button>
          ))}
          <button onClick={() => { setMobileOpen(false); navigate('/signup'); }} className="bg-white text-neutral-900 px-4 py-2.5 rounded-xl text-sm font-semibold mt-1">
            S'inscrire - 29€
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
