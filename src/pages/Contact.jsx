import { useContext, useState } from 'react';
import { ThemeContext } from '../App';

function Contact() {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({
      submitting: true,
      submitted: false,
      error: null
    });

    // Simulación de envío (en un caso real, aquí iría la lógica para enviar el formulario)
    setTimeout(() => {
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null
      });
      // Resetear el formulario después de enviarlo
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-10">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h1 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-[32px] font-bold leading-tight tracking-[-0.015em] mb-8`}>
          Contacto
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-[#161B22] border border-[#293038]' : 'bg-[#f0f0f0] border border-[#e0e0e0]'}`}>
              <div className="p-6">
                <h2 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-xl font-bold mb-4`}>
                  Información de Contacto
                </h2>
                <div className={`${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'} space-y-4`}>
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="flex-shrink-0 mt-1 text-[#3B82F6]">
                      <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                    </svg>
                    <div>
                      <h3 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} font-bold text-sm mb-1`}>Ubicación</h3>
                      <p className="text-sm">Miami, Florida</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="flex-shrink-0 mt-1 text-[#3B82F6]">
                      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                    </svg>
                    <div>
                      <h3 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} font-bold text-sm mb-1`}>Email</h3>
                      <a 
                        href="mailto:alexmontesinocastro9@gmail.com" 
                        className="text-sm hover:text-[#3B82F6] transition-colors"
                      >
                        alexmontesinocastro9@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="flex-shrink-0 mt-1 text-[#3B82F6]">
                      <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" />
                    </svg>
                    <div>
                      <h3 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} font-bold text-sm mb-1`}>Teléfono</h3>
                      <a href="tel:+17866130320" className="text-sm hover:text-[#3B82F6] transition-colors">
                        786-613-0320
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-lg font-bold mb-4`}>
                    Redes Sociales
                  </h2>
                  <div className="flex gap-4">
                    <a 
                      href="https://github.com/Alexmontesino96" 
                      target="_blank" 
                      className={`${isDarkMode ? 'bg-[#0D1117]' : 'bg-[#e0e0e0]'} w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-[#111418]'} hover:text-[#3B82F6] transition-colors`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/alex-montesino-03797b1b0/" 
                      target="_blank"
                      className={`${isDarkMode ? 'bg-[#0D1117]' : 'bg-[#e0e0e0]'} w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-[#111418]'} hover:text-[#3B82F6] transition-colors`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank"
                      className={`${isDarkMode ? 'bg-[#0D1117]' : 'bg-[#e0e0e0]'} w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-[#111418]'} hover:text-[#3B82F6] transition-colors`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-[#161B22] border border-[#293038]' : 'bg-[#f0f0f0] border border-[#e0e0e0]'}`}>
              <div className="p-6">
                <h2 className={`${isDarkMode ? 'text-white' : 'text-[#111418]'} text-xl font-bold mb-6`}>
                  Envíame un mensaje
                </h2>
                
                {formStatus.submitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">¡Mensaje enviado con éxito!</span>
                    </div>
                    <p className="mt-2 text-sm">Gracias por tu mensaje. Te responderé lo antes posible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label 
                          htmlFor="name" 
                          className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'}`}
                        >
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg ${
                            isDarkMode 
                              ? 'bg-[#0D1117] border border-[#293038] text-white focus:border-[#3B82F6]' 
                              : 'bg-white border border-[#ddd] text-[#111418] focus:border-[#3B82F6]'
                          } outline-none transition-colors`}
                          required
                        />
                      </div>
                      <div>
                        <label 
                          htmlFor="email" 
                          className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'}`}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg ${
                            isDarkMode 
                              ? 'bg-[#0D1117] border border-[#293038] text-white focus:border-[#3B82F6]' 
                              : 'bg-white border border-[#ddd] text-[#111418] focus:border-[#3B82F6]'
                          } outline-none transition-colors`}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="subject" 
                        className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'}`}
                      >
                        Asunto
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg ${
                          isDarkMode 
                            ? 'bg-[#0D1117] border border-[#293038] text-white focus:border-[#3B82F6]' 
                            : 'bg-white border border-[#ddd] text-[#111418] focus:border-[#3B82F6]'
                        } outline-none transition-colors`}
                        required
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="message" 
                        className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-[#9dabb8]' : 'text-[#666]'}`}
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-2 rounded-lg ${
                          isDarkMode 
                            ? 'bg-[#0D1117] border border-[#293038] text-white focus:border-[#3B82F6]' 
                            : 'bg-white border border-[#ddd] text-[#111418] focus:border-[#3B82F6]'
                        } outline-none transition-colors`}
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <button 
                        type="submit" 
                        disabled={formStatus.submitting} 
                        className={`px-6 py-3 bg-gradient-to-b from-[--violet-9] to-[--violet-9] text-white font-bold rounded-xl transition-all border-t border-[rgba(255,255,255,0.21)] ${
                          formStatus.submitting 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:to-[--violet-10]'
                        }`}
                      >
                        {formStatus.submitting ? 'Enviando...' : 'Enviar mensaje'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mapa o imagen ilustrativa */}
        <div className={`rounded-xl overflow-hidden h-64 mb-12 ${isDarkMode ? 'border border-[#293038]' : 'border border-[#e0e0e0]'}`}>
          <div className="w-full h-full bg-center bg-cover" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80")'}}></div>
        </div>
      </div>
    </div>
  );
}

export default Contact; 