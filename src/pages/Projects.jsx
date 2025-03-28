import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

function Projects() {
  const { isDarkMode } = useContext(ThemeContext);
  const [projects, setProjects] = useState({});
  const navigate = useNavigate();

  // Datos de proyectos (misma estructura que en ProjectDetail.jsx)
  useEffect(() => {
    const projectsData = {
      'cantina-go': {
        title: 'Cantina Go',
        image: '/cantina_go.webp',
        shortDescription: 'Restaurant service management platform with microservices architecture.',
        technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Auth0', 'Docker', 'Microservices'],
        github: 'https://github.com/Alexmontesino96/CantinaGo',
      },
      'supplies-order-predict': {
        title: 'Supplies Order Predict',
        image: '/order_predict.webp',
        shortDescription: 'Inventory management and statistical analysis system using FastAPI, with order prediction and automation capabilities.',
        technologies: ['Python 3.8+', 'FastAPI', 'SQLAlchemy', 'Pandas', 'Auth0', 'PostgreSQL'],
        github: 'https://github.com/Alexmontesino96/Supplies-Order-Predict',
      },
      'financial-family-api': {
        title: 'Financial Family API',
        image: '/family_financial_api_photo.webp',
        shortDescription: 'Family finance platform with transaction management and expense analysis.',
        technologies: ['Python 3.8+', 'FastAPI', 'PostgreSQL 12+', 'SQLAlchemy', 'JWT', 'Docker'],
        github: 'https://github.com/Alexmontesino96/FinancialFamilyAPI',
      },
      'gym-api': {
        title: 'GymAPI',
        image: '/gym_api_photo.webp',
        shortDescription: 'Robust API for gym management with membership and access control.',
        technologies: ['Python', 'Flask', 'MongoDB', 'Redis', 'WebSocket', 'JWT'],
        github: 'https://github.com/Alexmontesino96/GymAPI',
      },
      'financial-family-telegram-bot': {
        title: 'Financial Family Telegram Bot',
        image: '/telegra_bot_financial_family.webp',
        shortDescription: 'Telegram bot for family financial management with conversational interaction.',
        technologies: ['Python', 'aiogram', 'SQLAlchemy', 'Pandas', 'matplotlib', 'Docker'],
        github: 'https://github.com/Alexmontesino96/FinancialFamilyTelegramBot',
        telegramBot: 'https://t.me/family_financial_econ_bot',
      },
      'details-food-scanner': {
        title: 'DetailsFoodScanner',
        image: '/detail_food_scanner.webp',
        shortDescription: 'Smart scanner for nutritional information using computer vision and ML.',
        technologies: ['Python', 'Computer Vision', 'Machine Learning', 'OCR', 'Nutritional Analysis'],
        github: 'https://github.com/Alexmontesino96/DetailsFoodScanner',
        externalLink: true
      },
      'api-medical': {
        title: 'Advanced Medical API',
        image: '/api_medical.webp',
        shortDescription: 'Medical appointment management system with doctor-patient interaction.',
        technologies: ['Python', 'Django', 'REST API', 'PostgreSQL', 'Authentication', 'Scheduling'],
        github: 'https://github.com/Alexmontesino96/api-citas-medicas-main',
        externalLink: true
      }
    };
    
    setProjects(projectsData);
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-10">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h1 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-[32px] font-bold leading-tight tracking-[-0.015em] mb-8`}>
          Projects
        </h1>
        
        {/* Introducción */}
        <div className={`${isDarkMode ? 'bg-[#161B22] border border-[#293038]' : 'bg-[#f0f0f0] border border-[#e0e0e0]'} rounded-xl p-6 mb-10`}>
          <p className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} text-base`}>
            Each of these projects showcases my experience in backend development and APIs. 
            I've selected these applications to demonstrate my skills in different technologies 
            and architectures, from microservices to RESTful APIs and messaging bots.
          </p>
        </div>
        
        {/* Filtros */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button className={`px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-b from-[--violet-9] to-[--violet-9] hover:to-[--violet-10] text-white transition-all border-t border-[rgba(255,255,255,0.21)]`}>
            All
          </button>
          <button className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-[#293038] text-white hover:bg-[--violet-9]' : 'bg-[#e0e0e0] text-[#111418] hover:bg-[--violet-9] hover:text-white'} transition-colors`}>
            API
          </button>
          <button className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-[#293038] text-white hover:bg-[--violet-9]' : 'bg-[#e0e0e0] text-[#111418] hover:bg-[--violet-9] hover:text-white'} transition-colors`}>
            Python
          </button>
          <button className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-[#293038] text-white hover:bg-[--violet-9]' : 'bg-[#e0e0e0] text-[#111418] hover:bg-[--violet-9] hover:text-white'} transition-colors`}>
            Database
          </button>
        </div>
        
        {/* Lista de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {Object.entries(projects).map(([id, project]) => (
            <div key={id} 
              className={`${isDarkMode ? 'bg-[#161B22] border border-[#293038]' : 'bg-[#f0f0f0] border border-[#e0e0e0]'} rounded-xl overflow-hidden transform md:hover:scale-[1.05] hover:scale-[1.02] transition-all duration-300 shadow-lg group cursor-pointer md:hover:shadow-[0_0_15px_rgba(var(--violet-9-rgb),0.4)] hover:border-[--violet-9]`}
              onClick={() => {
                if (project.externalLink) {
                  window.open(project.github, '_blank');
                } else {
                  navigate(`/project/${id}`);
                }
              }}
            >
              <div 
                className="w-full aspect-video bg-center bg-no-repeat bg-cover border-b border-[#293038] relative"
                style={{ backgroundImage: `url("${project.image}")` }}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </div>
              
              <div className="p-5">
                <h2 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-xl font-bold mb-2 group-hover:text-[--violet-9] transition-colors`}>
                  {project.title}
                </h2>
                
                <p className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} text-sm mb-4 min-h-[40px]`}>
                  {project.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span key={index} className={`inline-block px-2 py-1 text-xs rounded-lg ${isDarkMode ? 'bg-[#293038] text-white' : 'bg-[#e0e0e0] text-[#111418]'}`}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className={`inline-block px-2 py-1 text-xs rounded-lg ${isDarkMode ? 'bg-[#293038] text-white' : 'bg-[#e0e0e0] text-[#111418]'}`}>
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-3">
                  {!project.externalLink ? (
                    <Link 
                      to={`/project/${id}`} 
                      className="flex items-center justify-center rounded-xl h-10 px-4 bg-gradient-to-b from-[--violet-9] to-[--violet-9] hover:to-[--violet-10] text-white text-sm font-medium transition-all border-t border-[rgba(255,255,255,0.21)] flex-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View details
                    </Link>
                  ) : (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-xl h-10 px-4 bg-gradient-to-b from-[--violet-9] to-[--violet-9] hover:to-[--violet-10] text-white text-sm font-medium transition-all border-t border-[rgba(255,255,255,0.21)] flex-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on GitHub
                    </a>
                  )}
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center rounded-xl h-10 w-10 ${isDarkMode ? 'bg-black hover:bg-[#333]' : 'bg-[#111418] hover:bg-[#333]'} text-white transition-colors border border-white/30`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className={`${isDarkMode ? 'bg-[#161B22] border border-[#293038]' : 'bg-[#f0f0f0] border border-[#e0e0e0]'} rounded-xl p-6 text-center mb-6`}>
          <h2 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-xl font-bold mb-4`}>
            Interested in collaborating on a project?
          </h2>
          <p className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} mb-6 max-w-lg mx-auto`}>
            If you have any idea or project in mind, I'd be happy to discuss it with you.
            My experience in backend development and APIs can help you turn your idea into reality.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center rounded-xl h-12 px-6 bg-gradient-to-b from-[--violet-9] to-[--violet-9] hover:to-[--violet-10] text-white font-medium transition-all border-t border-[rgba(255,255,255,0.21)]">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Projects; 