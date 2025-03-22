import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';

// Crear contexto para el tema
export const ThemeContext = createContext();

function App() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true); // Por defecto tema oscuro

  // Función para alternar entre modos
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`relative flex size-full min-h-screen flex-col ${isDarkMode ? 'bg-[#111418] text-white' : 'bg-[#f5f5f5] text-[#111418]'} overflow-x-hidden`} style={{fontFamily: '"Space Grotesk", "Noto Sans", sans-serif'}}>
        <div className="layout-container flex h-full grow flex-col">
          <Header />
          
          <div className="mt-16 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:projectId" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </div>
          
          <Footer />
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
