import { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';

function About() {
  const { isDarkMode } = useContext(ThemeContext);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Animar la imagen de perfil con un efecto más sutil
      if (profileRef.current) {
        const elementRect = profileRef.current.getBoundingClientRect();
        const elementTop = elementRect.top;
        const viewportHeight = window.innerHeight;
        
        // Calculamos qué tan centrada está la imagen en la pantalla
        // Valor máximo cuando está en el centro, disminuye hacia los extremos
        const distanceFromCenter = 1 - Math.min(1, Math.abs(elementTop - viewportHeight * 0.4) / (viewportHeight * 0.5));
        
        // Efecto de escala sutil, evitando valores extremos
        const scaleValue = 1 + Math.min(0.08, 0.08 * distanceFromCenter);
        
        // Aplicamos la escala con una transición muy suave
        profileRef.current.style.transform = `scale(${scaleValue})`;
      }
    };

    // Ejecutar una vez cuando el componente se monta para aplicar efectos iniciales
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-10">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h1 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-[32px] font-bold leading-tight tracking-[-0.015em] mb-8 text-center sm:text-left`}>
          About Me
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex justify-center mb-8 md:mb-6">
              <div
                ref={profileRef}
                className="min-h-44 w-44 sm:min-h-48 sm:w-48 rounded-full overflow-hidden shadow-lg transition-all duration-300 cursor-pointer flex-shrink-0 border-2 border-transparent"
                style={{
                  transformOrigin: 'center center',
                  transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)'
                }}
              >
                <img 
                  src="/profile.png"
                  alt="Alex Montesino" 
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              </div>
            </div>
            
            <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-[#161B22] border border-[#293038]' : 'bg-[#f0f0f0] border border-[#e0e0e0]'} mb-6`}>
              <h3 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-lg font-bold mb-3`}>Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="mailto:alexmontesinocastro9@gmail.com" 
                    className={`flex items-center gap-2 ${isDarkMode ? 'text-[#9dabb8] hover:text-[--violet-9]' : 'text-[#666] hover:text-[--violet-9]'} transition-colors`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 min-w-[18px]">
                      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                    </svg>
                    <span className="text-sm sm:text-base break-all">alexmontesinocastro9@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+17866130320" 
                    className={`flex items-center gap-2 ${isDarkMode ? 'text-[#9dabb8] hover:text-[--violet-9]' : 'text-[#666] hover:text-[--violet-9]'} transition-colors`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 min-w-[18px]">
                      <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/>
                    </svg>
                    <span className="text-sm sm:text-base">786-613-0320</span>
                  </a>
                </li>
                <li>
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 min-w-[18px]">
                      <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                    </svg>
                    <span className="text-sm sm:text-base">Miami, Florida</span>
                  </div>
                </li>
                <li>
                  <a 
                    href="https://github.com/Alexmontesino96" 
                    target="_blank"
                    className={`flex items-center gap-2 ${isDarkMode ? 'text-[#9dabb8] hover:text-[--violet-9]' : 'text-[#666] hover:text-[--violet-9]'} transition-colors`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 min-w-[18px]">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-sm sm:text-base">GitHub</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/alex-montesino-03797b1b0/" 
                    target="_blank"
                    className={`flex items-center gap-2 ${isDarkMode ? 'text-[#9dabb8] hover:text-[--violet-9]' : 'text-[#666] hover:text-[--violet-9]'} transition-colors`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 min-w-[18px]">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="text-sm sm:text-base">LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} space-y-4`}>
              <p>
                My path is unconventional: trained as an artist, I discovered my true passion in code. I always felt drawn to technology and problem-solving, which led me to learn software development on my own.
              </p>
              
              <p>
                I'm motivated by creating elegant solutions to complex problems, leveraging my artistic perspective to see patterns and structures in code.
              </p>
              
              <p>
                In the last five years, I've focused on backend and APIs, participating in diverse projects from finance to conversational bots, specializing in Python and scalable architectures to transform ideas into simple and effective solutions.
              </p>
              
              <h2 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-xl font-bold mt-8 mb-4`}>Professional Experience</h2>
              
              <div className={`${isDarkMode ? 'bg-[#161B22] border border-[#293038]' : 'bg-[#f0f0f0] border border-[#e0e0e0]'} rounded-xl p-4 mb-4`}>
                <h3 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} font-bold`}>Senior Backend Developer</h3>
                <p className="text-sm text-[--violet-9]">TechSolutions Inc. · 2020 - Present</p>
                <ul className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} mt-2 list-disc pl-5 text-sm space-y-1`}>
                  <li>Development and maintenance of RESTful APIs for financial services.</li>
                  <li>Optimization of database queries and improvement of system performance.</li>
                  <li>Implementation of CI/CD with GitHub Actions and Docker.</li>
                </ul>
              </div>
              
              <div className={`${isDarkMode ? 'bg-[#161B22] border border-[#293038]' : 'bg-[#f0f0f0] border border-[#e0e0e0]'} rounded-xl p-4 mb-4`}>
                <h3 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} font-bold`}>Python Developer</h3>
                <p className="text-sm text-[--violet-9]">DataCorp · 2018 - 2020</p>
                <ul className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} mt-2 list-disc pl-5 text-sm space-y-1`}>
                  <li>Development of microservices with Python and FastAPI.</li>
                  <li>Integration with third-party systems through APIs.</li>
                  <li>Implementation of data processing algorithms.</li>
                </ul>
              </div>
              
              <h2 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-xl font-bold mt-8 mb-4`}>Education</h2>
              
              <div className={`${isDarkMode ? 'bg-[#161B22] border border-[#293038]' : 'bg-[#f0f0f0] border border-[#e0e0e0]'} rounded-xl p-4 mb-4`}>
                <h3 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} font-bold`}>Bachelor of Arts</h3>
                <p className="text-sm text-[--violet-9]">University of Fine Arts · 2014 - 2018</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-[#161B22] border border-[#293038]' : 'bg-[#f0f0f0] border border-[#e0e0e0]'} rounded-xl p-4 sm:p-6 mb-8`}>
          <h2 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-xl font-bold mb-4 text-center sm:text-left`}>Technical Skills</h2>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="mb-3">
              <h3 className={`${isDarkMode ? 'text-[--violet-9]' : 'text-[--violet-9]'} font-bold mb-2 text-sm sm:text-base`}>Languages</h3>
              <ul className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} list-disc pl-5 text-xs sm:text-sm space-y-1`}>
                <li>Python</li>
                <li>JavaScript/TypeScript</li>
                <li>SQL</li>
                <li>Go</li>
              </ul>
            </div>
            
            <div className="mb-3">
              <h3 className={`${isDarkMode ? 'text-[--violet-9]' : 'text-[--violet-9]'} font-bold mb-2 text-sm sm:text-base`}>Frameworks</h3>
              <ul className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} list-disc pl-5 text-xs sm:text-sm space-y-1`}>
                <li>FastAPI</li>
                <li>Django</li>
                <li>Flask</li>
                <li>Express.js</li>
              </ul>
            </div>
            
            <div className="mb-3">
              <h3 className={`${isDarkMode ? 'text-[--violet-9]' : 'text-[--violet-9]'} font-bold mb-2 text-sm sm:text-base`}>Databases</h3>
              <ul className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} list-disc pl-5 text-xs sm:text-sm space-y-1`}>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
                <li>Redis</li>
                <li>SQLite</li>
              </ul>
            </div>
            
            <div className="mb-3">
              <h3 className={`${isDarkMode ? 'text-[--violet-9]' : 'text-[--violet-9]'} font-bold mb-2 text-sm sm:text-base`}>DevOps</h3>
              <ul className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} list-disc pl-5 text-xs sm:text-sm space-y-1`}>
                <li>Docker</li>
                <li>Kubernetes</li>
                <li>GitHub Actions</li>
                <li>AWS</li>
              </ul>
            </div>
            
            <div className="mb-3">
              <h3 className={`${isDarkMode ? 'text-[--violet-9]' : 'text-[--violet-9]'} font-bold mb-2 text-sm sm:text-base`}>Tools</h3>
              <ul className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} list-disc pl-5 text-xs sm:text-sm space-y-1`}>
                <li>Git</li>
                <li>Postman</li>
                <li>VS Code</li>
                <li>Swagger/OpenAPI</li>
              </ul>
            </div>
            
            <div className="mb-3">
              <h3 className={`${isDarkMode ? 'text-[--violet-9]' : 'text-[--violet-9]'} font-bold mb-2 text-sm sm:text-base`}>Otros</h3>
              <ul className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} list-disc pl-5 text-xs sm:text-sm space-y-1`}>
                <li>RESTful APIs</li>
                <li>GraphQL</li>
                <li>WebSockets</li>
                <li>JWT</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-10 bg-[#161B22] rounded-xl mb-6 border border-[#293038]">
          <h2 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center`}>Interested in collaborating?</h2>
          <p className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} text-center max-w-lg mb-5 sm:mb-6 text-sm sm:text-base`}>
            I'm always open to new opportunities and interesting projects. If you have any ideas or proposals, don't hesitate to contact me.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Link to="/contact" className="flex items-center justify-center rounded-xl h-11 px-5 sm:px-6 bg-gradient-to-b from-[--violet-9] to-[--violet-9] hover:to-[--violet-10] text-white font-medium transition-all border-t border-[rgba(255,255,255,0.21)] w-full sm:w-auto">
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 