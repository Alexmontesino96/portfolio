import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../App';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  // Efecto para detectar scroll y cambiar la apariencia del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para prevenir scroll cuando el menú está abierto en móvil
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid ${isDarkMode ? 'border-b-[#293038]' : 'border-b-[#e0e0e0]'} px-4 sm:px-10 py-3 transition-all duration-300 will-change-transform ${scrolled 
      ? isDarkMode 
        ? 'bg-[#111418]/90 backdrop-blur-md shadow-md' 
        : 'bg-[#f5f5f5]/90 backdrop-blur-md shadow-md' 
      : isDarkMode 
        ? 'bg-[#111418]' 
        : 'bg-[#f5f5f5]'}`}
      style={{ WebkitBackfaceVisibility: 'hidden', WebkitPerspective: 1000 }}
    >
      <div className="flex items-center gap-4 text-white">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill={isDarkMode ? "white" : "#111418"}></path></svg>
        </div>
        <Link to="/" className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-lg font-bold leading-tight tracking-[-0.015em]`}>Alex Montesino</Link>
      </div>
      
      {/* Menú navegación desktop */}
      <div className="hidden md:flex flex-1 justify-end items-center gap-8">
        <div className="flex items-center gap-9">
          <Link to="/about" className={`${isDarkMode ? 'text-white hover:text-[--violet-9]' : 'text-[#111418] hover:text-[--violet-9]'} text-sm font-medium leading-normal transition-colors`}>About</Link>
          <Link to="/projects" className={`${isDarkMode ? 'text-white hover:text-[--violet-9]' : 'text-[#111418] hover:text-[--violet-9]'} text-sm font-medium leading-normal transition-colors`}>Projects</Link>
          <Link to="/contact" className={`${isDarkMode ? 'text-white hover:text-[--violet-9]' : 'text-[#111418] hover:text-[--violet-9]'} text-sm font-medium leading-normal transition-colors`}>Contact</Link>
        </div>
        <div className="flex gap-2">
          <button
            className={`p-2 rounded-md flex items-center gap-2 transition-all ${isDarkMode ? 'bg-[#21262D] text-white hover:bg-[#30363D]' : 'bg-[#F0F0F0] hover:bg-[#E0E0E0]'}`}
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path>
              </svg>
            )}
            <span className="text-sm">{isDarkMode ? "Modo claro" : "Modo oscuro"}</span>
          </button>
        </div>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{backgroundImage: 'url("/profile.png")'}}
        ></div>
      </div>
      
      {/* Botón hamburguesa para móvil */}
      <div className="flex md:hidden items-center gap-4">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col justify-center items-center w-10 h-10 p-2 relative z-50 active:opacity-70 touch-manipulation"
          aria-label="Toggle menu"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <span className={`block w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-[#111418]'} transition-all duration-300 ease-out ${isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`}></span>
          <span className={`block w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-[#111418]'} transition-all duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-[#111418]'} transition-all duration-300 ease-out ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`}></span>
        </button>
      </div>
      
      {/* Menú móvil */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-300 flex flex-col pt-20 px-6 md:hidden ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{
          backgroundColor: isDarkMode 
            ? 'rgba(13, 17, 23, 0.98)' 
            : 'rgba(245, 245, 245, 0.98)',
          backdropFilter: isMenuOpen ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: isMenuOpen ? 'blur(10px)' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 40
        }}
        onClick={(e) => {
          // Cerrar el menú al tocar el fondo
          if (e.target === e.currentTarget) {
            setIsMenuOpen(false);
          }
        }}
      >
        <nav className="flex flex-col items-center gap-8 py-8">
          <Link 
            to="/about" 
            className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-xl font-medium hover:text-[--violet-9] transition-colors py-4 px-8 active:opacity-70 touch-manipulation rounded-xl ${isDarkMode ? 'bg-[#161B22]/30' : 'bg-white/10'}`}
            onClick={() => setIsMenuOpen(false)}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            About
          </Link>
          <Link 
            to="/projects" 
            className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-xl font-medium hover:text-[--violet-9] transition-colors py-4 px-8 active:opacity-70 touch-manipulation rounded-xl ${isDarkMode ? 'bg-[#161B22]/30' : 'bg-white/10'}`}
            onClick={() => setIsMenuOpen(false)}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Projects
          </Link>
          <Link 
            to="/contact" 
            className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-xl font-medium hover:text-[--violet-9] transition-colors py-4 px-8 active:opacity-70 touch-manipulation rounded-xl ${isDarkMode ? 'bg-[#161B22]/30' : 'bg-white/10'}`}
            onClick={() => setIsMenuOpen(false)}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Contact
          </Link>
        </nav>
        
        <div className="mt-auto flex items-center justify-between pb-8">
          <div className="flex gap-2">
            <button 
              onClick={toggleTheme}
              className={`flex items-center justify-center rounded-xl h-10 w-10 ${
                isDarkMode 
                  ? 'bg-[#161B22]/30 text-white hover:bg-[--violet-9]' 
                  : 'bg-white/10 text-[#111418] hover:bg-[--violet-9] hover:text-white'
              } transition-colors active:opacity-70 touch-manipulation`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path>
                </svg>
              )}
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Alexmontesino96" 
              target="_blank" 
              className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} hover:text-[--violet-9] transition-colors p-2 rounded-xl ${isDarkMode ? 'bg-[#161B22]/30' : 'bg-white/10'} active:opacity-70 touch-manipulation`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/alex-montesino-03797b1b0/"
              target="_blank" 
              className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} hover:text-[--violet-9] transition-colors p-2 rounded-xl ${isDarkMode ? 'bg-[#161B22]/30' : 'bg-white/10'} active:opacity-70 touch-manipulation`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{backgroundImage: 'url("/profile.png")'}}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 