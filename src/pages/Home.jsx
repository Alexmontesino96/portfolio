import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const profileRef = useRef(null);
  const projectRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Animar la imagen de perfil
      if (profileRef.current) {
        const elementRect = profileRef.current.getBoundingClientRect();
        const elementTop = elementRect.top;
        const elementHeight = elementRect.height;
        
        // Calcular cuando la imagen está cerca del borde superior
        // Se activa cuando está entrando en la pantalla (entre -20% y 30% de su altura)
        const activationThresholdTop = -0.2 * elementHeight;
        const activationThresholdBottom = 0.3 * elementHeight;
        
        // Solo activamos el efecto si no está demasiado cerca del header (al menos 70px desde la parte superior)
        if (elementTop <= activationThresholdBottom && elementTop >= activationThresholdTop && elementTop > 70) {
          // La imagen está en la zona de activación cerca del borde superior
          const distanceFactor = Math.abs((elementTop - activationThresholdTop) / (activationThresholdBottom - activationThresholdTop));
          // Escala de encogimiento: mayor en móviles, más sutil en pantallas grandes
          const maxShrink = window.innerWidth < 640 ? 0.15 : 0.08;
          const scaleValue = 1 - Math.min(maxShrink, maxShrink * distanceFactor);
          
          profileRef.current.style.transform = `scale(${scaleValue})`;
          profileRef.current.style.zIndex = '40'; // Reducido de 50 a 40 para estar bajo el header
          profileRef.current.style.borderColor = 'var(--violet-9)';
          profileRef.current.style.boxShadow = '0 0 20px rgba(var(--violet-9-rgb),0.4)';
        } else {
          // Reset cuando la imagen está fuera de la zona de activación
          profileRef.current.style.transform = 'scale(1)';
          profileRef.current.style.zIndex = 'auto';
          profileRef.current.style.borderColor = 'transparent';
          profileRef.current.style.boxShadow = '';
        }
      }

      // Animar las tarjetas de proyectos en móviles
      if (window.innerWidth < 640) {
        projectRefs.forEach((ref, index) => {
          if (ref.current) {
            const elementRect = ref.current.getBoundingClientRect();
            const elementTop = elementRect.top;
            const elementHeight = elementRect.height;
            
            // Calcular cuando la tarjeta está cerca del borde superior
            // Se activa cuando la tarjeta está entrando en la pantalla (entre -20% y 30% de su altura)
            const activationThresholdTop = -0.2 * elementHeight;
            const activationThresholdBottom = 0.3 * elementHeight;
            
            if (elementTop <= activationThresholdBottom && elementTop >= activationThresholdTop) {
              // La tarjeta está en la zona de activación cerca del borde superior
              const distanceFactor = Math.abs((elementTop - activationThresholdTop) / (activationThresholdBottom - activationThresholdTop));
              const scaleValue = 1 + Math.min(0.08, 0.08 * distanceFactor);
              
              ref.current.style.transform = `scale(${scaleValue})`;
              ref.current.style.zIndex = '40';
              ref.current.style.borderColor = 'var(--violet-9)';
              ref.current.style.boxShadow = '0 0 15px rgba(var(--violet-9-rgb),0.3)';
            } else {
              // Reset cuando la tarjeta está fuera de la zona de activación
              ref.current.style.transform = 'scale(1)';
              ref.current.style.zIndex = 'auto';
              ref.current.style.borderColor = '#293038';
              ref.current.style.boxShadow = '';
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-6 sm:py-10">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex min-h-[90vh] sm:min-h-0 items-start justify-center sm:items-center p-4 pt-10 sm:p-6 @container mb-6 sm:mb-8 md:mb-14" id="about">
            <div className="flex w-full flex-col sm:flex-row gap-8 sm:gap-6 mt-10 sm:mt-0 @[520px]:justify-between @[520px]:items-center">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex justify-center w-full sm:w-auto mb-6 sm:mb-0">
                  <div
                    ref={profileRef}
                    className="min-h-[220px] w-[220px] sm:min-h-48 sm:w-48 rounded-full overflow-hidden shadow-lg transition-all duration-300 cursor-pointer flex-shrink-0 border-2 border-transparent"
                    style={{
                      transformOrigin: 'center top',
                      transition: 'transform 0.5s ease, opacity 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease'
                    }}
                  >
                    <img 
                      src="/profile.png" 
                      alt="Alex Montesino profile" 
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center text-center sm:text-left my-auto sm:ml-8">
                  <p className="text-white text-[32px] sm:text-[28px] font-bold leading-tight tracking-[-0.015em] mb-2 sm:mb-1">Alex Montesino</p>
                  <p className="text-[#9dabb8] text-xl sm:text-xl font-normal leading-normal mb-4 sm:mb-3">Backend Developer | API Specialist</p>
                  <p className="text-[--violet-9] text-lg sm:text-sm font-medium mb-6 sm:mb-0">&gt; Transforming ideas into scalable solutions</p>
                  
                  <div className="flex flex-row sm:hidden items-center justify-center gap-4 mt-6">
                    <a 
                      href="https://www.linkedin.com/in/alex-montesino-03797b1b0/" 
                      target="_blank"
                      className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-gradient-to-b from-[--violet-9] to-[--violet-9] hover:to-[--violet-10] text-white text-base font-bold leading-normal tracking-[0.015em] w-full max-w-[150px] transition-all border-t border-[rgba(255,255,255,0.21)]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="truncate">Conectar</span>
                    </a>
                    
                    <a 
                      href="https://github.com/Alexmontesino96" 
                      target="_blank" 
                      className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-black text-white text-base font-bold leading-normal tracking-[0.015em] w-full max-w-[150px] hover:bg-[#333333] transition-colors border border-white/30"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="truncate">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col items-center justify-center gap-3 mt-0">
                <a 
                  href="https://www.linkedin.com/in/alex-montesino-03797b1b0/" 
                  target="_blank"
                  className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-gradient-to-b from-[--violet-9] to-[--violet-9] hover:to-[--violet-10] text-white text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[200px] transition-all border-t border-[rgba(255,255,255,0.21)] mb-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2 w-4 h-4">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="truncate">Conectar</span>
                </a>
                
                <a 
                  href="https://github.com/Alexmontesino96" 
                  target="_blank" 
                  className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[200px] hover:bg-[#333333] transition-colors border border-white/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2 w-4 h-4">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="truncate">GitHub</span>
                </a>
              </div>
            </div>
          </div>
          
          <h2 className="text-white text-[32px] sm:text-[28px] font-bold leading-tight tracking-[-0.015em] px-6 pb-6 pt-4 md:pt-10 border-b border-[#293038] mb-8" id="work">Featured Projects</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-6 mb-16">
            <Link to="/project/financial-family-api" className="flex flex-col gap-4 pb-3 group">
              <div
                ref={projectRefs[1]}
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl transform group-hover:scale-[1.02] transition-all duration-300 border border-[#293038] group-hover:border-[--violet-9] shadow-lg"
                style={{
                  backgroundImage: 'url("/family_financial_api_photo.webp")',
                  transition: 'transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
                  transformOrigin: 'center center'
                }}
              ></div>
              <div>
                <p className="text-white text-lg font-semibold leading-tight mb-2">Financial Family API</p>
                <p className="text-[#9dabb8] text-sm leading-normal">Family finance platform with transaction management and expense analysis.</p>
              </div>
            </Link>
            <Link to="/project/gym-api" className="flex flex-col gap-4 pb-3 group">
              <div
                ref={projectRefs[2]}
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl transform group-hover:scale-[1.02] transition-all duration-300 border border-[#293038] group-hover:border-[--violet-9] shadow-lg"
                style={{
                  backgroundImage: 'url("/gym_api_photo.webp")',
                  transition: 'transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
                  transformOrigin: 'center center'
                }}
              ></div>
              <div>
                <p className="text-white text-lg font-semibold leading-tight mb-2">GymAPI</p>
                <p className="text-[#9dabb8] text-sm leading-normal">Robust API for gym management with membership and access control.</p>
              </div>
            </Link>
            <Link to="/project/financial-family-telegram-bot" className="flex flex-col gap-4 pb-3 group">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl transform group-hover:scale-[1.02] transition-all duration-300 border border-[#293038] group-hover:border-[--violet-9] shadow-lg"
                style={{
                  backgroundImage: 'url("/telegra_bot_financial_family.webp")',
                  transition: 'transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
                  transformOrigin: 'center center'
                }}
              ></div>
              <div>
                <p className="text-white text-lg font-semibold leading-tight mb-2">Financial Family Telegram Bot</p>
                <p className="text-[#9dabb8] text-sm leading-normal">Bot de Telegram para gestión financiera familiar con interacción conversacional.</p>
              </div>
            </Link>
          </div>
          
          <h2 className="text-white text-[28px] font-bold leading-tight tracking-[-0.015em] px-6 pb-6 pt-10 border-b border-[#293038] mb-8">Technical Skills</h2>
          <div className="p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Backend & Data */}
              <div className="bg-[#161B22] rounded-xl p-4 shadow-md border border-[#293038]">
                <h3 className="text-[--violet-9] text-lg font-bold mb-3 border-b border-[#293038] pb-2">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">Python</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">FastAPI</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">Django</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">Node.js</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">RESTful APIs</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">Microservices</span>
                </div>
              </div>
              
              <div className="bg-[#161B22] rounded-xl p-4 shadow-md border border-[#293038]">
                <h3 className="text-[--violet-9] text-lg font-bold mb-3 border-b border-[#293038] pb-2">Data</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">SQL</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">PostgreSQL</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">MongoDB</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">Redis</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">ORM</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">SQLAlchemy</span>
                </div>
              </div>
              
              {/* DevOps & Security */}
              <div className="bg-[#161B22] rounded-xl p-4 shadow-md border border-[#293038]">
                <h3 className="text-[--violet-9] text-lg font-bold mb-3 border-b border-[#293038] pb-2">DevOps</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">Docker</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">Kubernetes</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">CI/CD</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">AWS</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">Git</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">GitHub Actions</span>
                </div>
              </div>
              
              <div className="bg-[#161B22] rounded-xl p-4 shadow-md border border-[#293038]">
                <h3 className="text-[--violet-9] text-lg font-bold mb-3 border-b border-[#293038] pb-2">Security</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">JWT</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">OAuth 2.0</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">API Security</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">HTTPS</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">Encryption</span>
                  <span className="inline-block px-3 py-1 bg-[#293038] text-white text-sm rounded-lg">Rate Limiting</span>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-white text-[28px] font-bold leading-tight tracking-[-0.015em] px-6 pb-6 pt-10 border-b border-[#293038] mb-8">Other Projects</h2>
          <div className="px-6 pt-3 mb-4">
            <Link to="/projects" className="text-[--violet-9] hover:text-[--violet-10] transition-colors text-sm flex items-center">
              <span>Ver todos los proyectos</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="ml-1">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 p-6 mb-16">
            <Link to="/project/supplies-order-predict" className="flex flex-col gap-4 pb-3 group">
              <div
                ref={projectRefs[0]}
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl transform group-hover:scale-[1.02] transition-all duration-300 border border-[#293038] group-hover:border-[--violet-9] shadow-lg"
                style={{
                  backgroundImage: 'url("/order_predict.webp")',
                  transition: 'transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
                  transformOrigin: 'center center'
                }}
              ></div>
              <div>
                <p className="text-white text-lg font-semibold leading-tight mb-2">Supplies Order Predict</p>
                <p className="text-[#9dabb8] text-sm leading-normal">Inventory management and statistical analysis system using FastAPI, with order prediction capabilities.</p>
              </div>
            </Link>
            
            <a href="https://github.com/Alexmontesino96/DetailsFoodScanner" target="_blank" className="flex flex-col gap-4 pb-3 group">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl transform group-hover:scale-[1.02] transition-all duration-300 border border-[#293038] group-hover:border-[--violet-9] shadow-lg"
                style={{
                  backgroundImage: 'url("/detail_food_scanner.webp")',
                  transition: 'transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
                  transformOrigin: 'center center'
                }}
              ></div>
              <div>
                <p className="text-white text-lg font-semibold leading-tight mb-2">DetailsFoodScanner</p>
                <p className="text-[#9dabb8] text-sm leading-normal">Smart scanner for nutritional information using computer vision and ML.</p>
              </div>
            </a>
            
            <a href="https://github.com/Alexmontesino96/api-citas-medicas-main" target="_blank" className="flex flex-col gap-4 pb-3 group">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl transform group-hover:scale-[1.02] transition-all duration-300 border border-[#293038] group-hover:border-[--violet-9] shadow-lg"
                style={{
                  backgroundImage: 'url("/api_medical.webp")',
                  transition: 'transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
                  transformOrigin: 'center center'
                }}
              ></div>
              <div>
                <p className="text-white text-lg font-semibold leading-tight mb-2">Advanced Medical API</p>
                <p className="text-[#9dabb8] text-sm leading-normal">Medical appointment management system with doctor-patient interaction.</p>
              </div>
            </a>
          </div>
          
          <div className="flex flex-col items-center justify-center px-6 py-12 bg-[#161B22] rounded-xl mb-16 border border-[#293038]" id="contact">
            <h2 className="text-white text-[28px] font-bold leading-tight tracking-[-0.015em] mb-6">Let's Work Together</h2>
            <p className="text-[#9dabb8] text-base text-center max-w-lg mb-8">I'm always open to discussing new projects, job opportunities or collaborations. Feel free to reach out!</p>
            <div className="flex gap-4">
              <a href="https://github.com/Alexmontesino96" target="_blank" className="flex items-center justify-center rounded-xl h-12 px-6 bg-black text-white font-medium transition-colors hover:bg-[#333333]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              <Link to="/contact" className="flex items-center justify-center rounded-xl h-12 px-6 bg-gradient-to-b from-[--violet-9] to-[--violet-9] hover:to-[--violet-10] text-white font-medium transition-all border-t border-[rgba(255,255,255,0.21)]">
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home; 