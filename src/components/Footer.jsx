import { useContext } from 'react';
import { ThemeContext } from '../App';

function Footer() {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <footer className={`py-8 px-6 ${isDarkMode ? 'text-[#9dabb8]' : 'text-[#555]'} text-center text-sm`}>
      <p>© {new Date().getFullYear()} Alex Montesino. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer; 