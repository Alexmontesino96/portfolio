import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StartHandlerModule from '../components/StartHandlerModule';
import BalanceServiceModule from '../components/BalanceServiceModule';
import OrderServiceModule from '../components/OrderServiceModule';
import GymApiModule from '../components/GymApiModule';

// Datos de proyectos
const projectsData = {
  'cantina-go': {
    title: 'Cantina Go',
    image: '/cantina_go.webp',
    shortDescription: 'Plataforma de gestión de servicios de restauración con arquitectura de microservicios.',
    description: 'CantinaGo es una plataforma para gestión de servicios de restauración que permite a chefs ofrecer sus comidas y a clientes realizar pedidos. El proyecto ha migrado de una arquitectura monolítica a una arquitectura de microservicios para mejorar la escalabilidad, mantenibilidad y resiliencia del sistema.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Auth0', 'Docker', 'Microservicios', 'Streamlit', 'SQLAlchemy', 'Pydantic', 'OpenAI API'],
    features: [
      { title: 'Arquitectura de Microservicios', description: 'Separación clara de responsabilidades con 6 microservicios independientes.' },
      { title: 'API Gateway', description: 'Punto de entrada único que enruta peticiones a los servicios correspondientes.' },
      { title: 'Autenticación y Autorización', description: 'Integración con Auth0 para gestión de acceso seguro.' },
      { title: 'Base de Datos por Servicio', description: 'Cada microservicio tiene su propia base de datos para garantizar la independencia.' },
      { title: 'Integración con IA', description: 'Servicio de comidas utiliza OpenAI para enriquecer la experiencia del usuario.' },
    ],
    architecture: 'Arquitectura basada en microservicios con 6 componentes independientes: API Gateway como punto de entrada que enruta peticiones, y 5 servicios específicos (Autenticación, Cliente, Chef, Orden y Comida). Cada servicio tiene su propia base de datos PostgreSQL para garantizar el bajo acoplamiento. La comunicación entre servicios se realiza mediante HTTP usando httpx. Todo está containerizado con Docker y orquestado con Docker Compose para facilitar el despliegue.',
    github: 'https://github.com/Alexmontesino96/CantinaGo',
    useCustomComponent: false,
    codeExamples: {
      title: 'Middleware de Proxy en API Gateway',
      code: `@app.middleware("http")
async def proxy_middleware(request: Request, call_next):
    path = request.url.path
    
    # Permitir acceso directo a la documentación de la API y health check
    if path.startswith("/docs") or path.startswith("/openapi.json") or path == "/health":
        return await call_next(request)
    
    # Proxy a los servicios adecuados
    service_url = None
    if path.startswith("/api/v1/customer"):
        service_url = CUSTOMER_SERVICE_URL
    elif path.startswith("/api/v1/chef"):
        service_url = CHEF_SERVICE_URL
    elif path.startswith("/api/v1/order"):
        service_url = ORDER_SERVICE_URL
    elif path.startswith("/api/v1/meal"):
        service_url = MEAL_SERVICE_URL
    elif path.startswith("/api/v1/auth"):
        service_url = AUTH_SERVICE_URL
    
    if service_url:
        # Si hay un servicio identificado, enviar la petición
        target_url = f"{service_url}{path}"
        method = request.method
        headers = dict(request.headers)
        
        # Remover encabezados específicos de host para evitar problemas
        headers.pop("host", None)
        
        # Leer el cuerpo de la solicitud si lo hay
        body = await request.body()
        
        # Realizar la solicitud al servicio
        async with httpx.AsyncClient() as client:
            response = await client.request(
                method=method,
                url=target_url,
                headers=headers,
                content=body,
                follow_redirects=True
            )
        
        # Construir la respuesta
        return Response(
            content=response.content,
            status_code=response.status_code,
            headers=dict(response.headers)
        )`
    }
  },
  'supplies-order-predict': {
    title: 'Supplies Order Predict',
    image: '/order_predict.webp',
    shortDescription: 'Inventory management and statistical analysis system using FastAPI, with order prediction and automation capabilities.',
    description: 'Sistema diseñado para automatizar y optimizar la gestión de inventario y procesamiento de pedidos, incorporando análisis estadístico para mejorar la toma de decisiones en una cadena minorista. Desarrollado con FastAPI, integra funcionalidades avanzadas que facilitan actualizaciones automáticas de inventario, gestión de pedidos y autenticación segura mediante Auth0.',
    technologies: ['Python 3.8+', 'FastAPI', 'SQLAlchemy', 'Pandas', 'Auth0', 'CSV Processing', 'RESTful API', 'PostgreSQL', 'uvicorn', 'Pydantic'],
    features: [
      { title: 'Gestión de pedidos', description: 'Soporte completo para buscar, añadir, eliminar e importar pedidos desde archivos CSV.' },
      { title: 'Gestión de productos', description: 'Incluye importación de listas de productos y actualización de precios de forma eficiente.' },
      { title: 'Análisis estadístico', description: 'Utiliza datos históricos para generar estadísticas sobre la demanda de productos.' },
      { title: 'Autenticación segura', description: 'Implementa Auth0 para la gestión de usuarios y control de acceso a funcionalidades protegidas.' },
      { title: 'Interfaz intuitiva', description: 'Diseñada para facilitar las operaciones diarias de los usuarios finales con documentación automática.' },
    ],
    architecture: 'API RESTful construida con FastAPI que proporciona endpoints para gestión de pedidos, productos e inventario. SQLAlchemy como ORM para manipulación y consulta de bases de datos. Integración con Auth0 para manejo de autenticación y autorización. Procesamiento de datos con Pandas para análisis estadístico y generación de reportes.',
    github: 'https://github.com/Alexmontesino96/Supplies-Order-Predict',
    useCustomComponent: true,
    codeExamples: {
      title: 'Servicio de procesamiento de pedidos',
      code: `class Order_Service:
    def __init__(self, db_session):
        self.db_session = db_session

    def add_product_to_order(self, product_id: str, order_id: int, quantity: int):
        """Añade un producto a un pedido existente o actualiza la cantidad si ya existe"""
        product = self.db_session.query(ProductModel).filter(ProductModel.id == product_id).first()
        order = self.db_session.query(OrderModel).filter(OrderModel.id == order_id).first()
        order_item = (self.db_session.query(OrderItemModel).filter(OrderItemModel.order_id == order_id).filter
                      (OrderItemModel.product_id == product_id).first())

        if not order:
            return JSONResponse(content={"message": "Order not found"}, status_code=404)

        if product and order_item:
            try:
                order_item.quantity += quantity
                order_item.total += product.price * quantity
                self.db_session.commit()
                return JSONResponse(content={"message": "Product added to order successfully"}, status_code=201)
            except SQLAlchemyError as e:
                print(f"An error occurred while adding product to order: {e}")
                return JSONResponse(content={"message": "An error occurred while adding product to order"}, status_code=500)

        if product and not order_item:
            try:
                order_item = OrderItemModel(
                    order_id=order_id,
                    product_id=product_id,
                    quantity=quantity,
                    price_per_unit=product.price,
                    total=quantity * product.price
                )
                self.db_session.add(order_item)
                self.db_session.commit()
                return JSONResponse(content={"message": "Product added to order successfully"}, status_code=201)
            except SQLAlchemyError as e:
                print(f"An error occurred while adding product to order: {e}")
                return JSONResponse(content={"message": "An error occurred while adding product to order"}, status_code=500)

    def process_order_csv(self, user_email: int, csv_file: UploadFile = File(...)) -> JSONResponse:
        """Procesa un archivo CSV para importar múltiples pedidos de forma masiva"""
        if not csv_file.filename.endswith('.csv'):
            raise HTTPException(status_code=400, detail="Invalid file type, only CSV files are accepted.")

        order = self.create_order(user_email)
        if order is None:
            raise HTTPException(status_code=500, detail="Failed to create order.")
        
        try:
            content = StringIO(csv_file.file.read().decode('utf-8'))
            reader = csv.DictReader(content)
        except Exception as e:
            print(f"An error occurred while reading CSV file: {e}")
            return JSONResponse(content={"message": "An error occurred while reading CSV file"}, status_code=500)

        for row in reader:
            try:
                if 'Quantity' in row:
                    quantity = int(row['Quantity'])
                else:
                    quantity = row["QTY"]

                if 'Price' in row:
                    price_str = re.sub(r'[^\d.]', '', row['Price'])
                    if price_str:
                        price = float(price_str)
                    else:
                        price = 0.0
                else:
                    price = row["Price per Case"]
                    
                if 'Distribution #' in row:
                    product_id = str(row['Distribution #'])
                else:
                    product_id = row["Customer #"]
                    
                if 'Subtotal' in row:
                    subtotal = float(row['Subtotal'])
                else:
                    subtotal = price * quantity
                    
                order_item = Order_Items_Schema(
                    order_id=order.id,
                    product_id=product_id,
                    quantity=quantity,
                    price_per_unit=price,
                    total=subtotal
                )
                order_item_model = OrderItemModel(**order_item.model_dump())
                self.db_session.add(order_item_model)
                
            except ValueError as e:
                print(f"An error occurred while processing order items: {e}")
                continue
                
        self.db_session.commit()
        return JSONResponse(content=order.id, status_code=201)`
    }
  },
  'financial-family-api': {
    title: 'Financial Family API',
    image: '/family_financial_api_photo.webp',
    shortDescription: 'Family finance platform with transaction management and expense analysis.',
    description: 'API para gestión financiera familiar construida con FastAPI. Permite a los miembros de una familia registrar gastos, realizar pagos entre personas, calcular balances y deudas, y obtener reportes detallados. Implementa una arquitectura en capas con sistema de autenticación basado en JWT y almacenamiento en PostgreSQL.',
    technologies: ['Python 3.8+', 'FastAPI', 'PostgreSQL 12+', 'SQLAlchemy', 'Pydantic', 'JWT', 'Docker', 'Pytest', 'Alembic', 'SQLite'],
    features: [
      { title: 'Gestión de familias', description: 'Creación y administración de grupos familiares con múltiples miembros, cada uno identificado por su ID de Telegram.' },
      { title: 'Registro de gastos compartidos', description: 'Sistema para registrar gastos y dividirlos entre miembros específicos de la familia o entre todos.' },
      { title: 'Cálculo inteligente de balances', description: 'Algoritmo de neteo de deudas que simplifica las transacciones entre miembros y previene errores de cálculo.' },
      { title: 'Sistema de pagos', description: 'Registro de pagos entre miembros con verificación de consistencia para mantener la integridad de los datos financieros.' },
      { title: 'API RESTful completa', description: 'Endpoints documentados con OpenAPI para familias, miembros, gastos y pagos, con autenticación segura mediante tokens JWT.' },
    ],
    architecture: 'Arquitectura de capas con: (1) Capa de API implementada con FastAPI para manejar las solicitudes HTTP, (2) Capa de Servicios que contiene la lógica de negocio principal, (3) Capa de Modelos que define las entidades y su representación en la base de datos, y (4) Capa de Persistencia que gestiona la interacción con PostgreSQL mediante SQLAlchemy. Seguridad implementada con autenticación JWT.',
    github: 'https://github.com/Alexmontesino96/FinancialFamilyAPI',
    useCustomComponent: true,
    codeExamples: {
      title: 'Algoritmo de detección de anomalías',
      code: `class TransactionAnomalyDetector:
    def __init__(self, db_session):
        self.db = db_session
        self.models = {}
    
    async def detect_anomalies(self, family_id: int, lookback_days: int = 90, 
                         sensitivity: float = 1.5) -> List[dict]:
        """Detecta transacciones anómalas usando múltiples algoritmos"""
        # Obtener transacciones históricas
        transactions_df = await self._get_transaction_history(family_id, lookback_days)
        if transactions_df.empty:
            return []
        
        # Separar por categorías para análisis específico
        category_groups = transactions_df.groupby('category_id')
        anomalies = []
        
        for category_id, group in category_groups:
            if len(group) >= 10:  # Necesitamos suficientes datos
                # 1. Detección basada en estadísticas (Z-score)
                z_anomalies = self._detect_statistical_anomalies(group, sensitivity)
                
                # 2. Detección basada en clustering (DBSCAN)
                cluster_anomalies = self._detect_cluster_anomalies(group)
                
                # 3. Detección basada en series temporales (si hay suficientes datos)
                ts_anomalies = []
                if len(group) >= 30:
                    ts_anomalies = await self._detect_time_series_anomalies(group)
                
                # Combinar resultados dando prioridad a anomalías detectadas por múltiples métodos
                combined = self._combine_anomaly_results(
                    group, z_anomalies, cluster_anomalies, ts_anomalies
                )
                anomalies.extend(combined)
        
        # Clasificar y evaluar la gravedad de cada anomalía
        return self._calculate_anomaly_severity(anomalies)
    
    def _detect_statistical_anomalies(self, df: pd.DataFrame, sensitivity: float) -> List[int]:
        """Detección de anomalías basada en estadísticas (Z-score)"""
        mean = df['amount'].mean()
        std = df['amount'].std()
        if std == 0:
            return []
            
        z_scores = abs((df['amount'] - mean) / std)
        return df[z_scores > sensitivity].index.tolist()
    
    def _detect_cluster_anomalies(self, df: pd.DataFrame) -> List[int]:
        """Detección de anomalías basada en clustering"""
        # Preparar características para DBSCAN
        features = np.array([
            df['amount'].values,
            df['day_of_month'].values,
            df['hour_of_day'].values
        ]).T
        
        # Normalizar características
        scaler = StandardScaler()
        scaled_features = scaler.fit_transform(features)
        
        # Aplicar DBSCAN para detectar clusters
        dbscan = DBSCAN(eps=0.5, min_samples=3)
        clusters = dbscan.fit_predict(scaled_features)
        
        # Las anomalías son etiquetadas como -1
        return df[clusters == -1].index.tolist()`
    }
  },
  'gym-api': {
    title: 'GymAPI',
    image: '/gym_api_photo.webp',
    shortDescription: 'Robust API for gym management with membership and access control.',
    description: 'Sistema de gestión integral para gimnasios desarrollado con arquitectura de microservicios en Python. Utiliza MongoDB como base de datos principal, Redis para caché y WebSockets para actualizaciones en tiempo real. Incluye control de acceso biométrico, gestión de membresías, reservas y seguimiento de progreso.',
    technologies: ['Python', 'Flask', 'MongoDB', 'Redis', 'WebSocket', 'JWT', 'Docker', 'RabbitMQ', 'Stripe API', 'QR Code', 'Nginx'],
    features: [
      { title: 'Control de acceso biométrico', description: 'Sistema avanzado de validación de acceso mediante QR y reconocimiento facial opcional.' },
      { title: 'Gestión de membresías y pagos', description: 'Diferentes tipos de planes con facturación recurrente integrada con Stripe y recordatorios automatizados.' },
      { title: 'Reserva de clases y espacios', description: 'Sistema interactivo para reservas con límites de aforo y cancelaciones automáticas.' },
      { title: 'Seguimiento de progreso', description: 'Registro de entrenamientos, métricas corporales y objetivos personalizados.' },
      { title: 'Analítica de uso', description: 'Dashboard con métricas de asistencia, ocupación y retención de clientes.' },
    ],
    architecture: 'Arquitectura distribuida con múltiples microservicios conectados mediante mensajería asíncrona con RabbitMQ. MongoDB como base de datos principal, Redis para caché y sesiones. Autenticación mediante JWT con rotación de tokens. WebSockets para actualizaciones en tiempo real y notificaciones push.',
    github: 'https://github.com/Alexmontesino96/GymAPI',
    useCustomComponent: true,
    codeExamples: {
      title: 'Sistema de recomendación de entrenamientos',
      code: `from typing import List, Dict, Any, Optional, Union
import numpy as np
from datetime import datetime, timedelta
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from scipy.spatial.distance import cdist

class WorkoutRecommendationEngine:
    """Motor de recomendación de entrenamientos personalizado basado en
    historial, objetivos y feedback del usuario"""
    
    def __init__(self, db_client, config=None):
        self.db = db_client
        self.config = config or self._default_config()
        self.feature_weights = {
            'goal_alignment': 0.35,
            'user_preference': 0.25,
            'progress_impact': 0.20,
            'variety': 0.15,
            'difficulty_match': 0.05
        }
        
    def _default_config(self) -> Dict[str, Any]:
        return {
            'min_workout_history': 5,
            'recommendation_count': 3,
            'lookback_days': 90,
            'similar_users_count': 10,
            'max_workout_similarity': 0.7,
            'consider_time_constraints': True
        }
        
    async def get_personalized_recommendations(
        self, 
        user_id: str, 
        target_date: datetime,
        available_time: Optional[int] = None,
        location: str = 'gym',
        energy_level: Optional[int] = None
    ) -> List[Dict[str, Any]]:
        """Genera recomendaciones de entrenamientos personalizadas"""
        
        # Obtener perfil y preferencias del usuario
        user_profile = await self._get_user_profile(user_id)
        if not user_profile:
            return self._get_generic_recommendations(location)
            
        # Obtener historial de entrenamientos
        workout_history = await self._get_workout_history(
            user_id, 
            days=self.config['lookback_days']
        )
        
        if len(workout_history) < self.config['min_workout_history']:
            # No tenemos suficiente historial, basamos en objetivos y usuarios similares
            recommendations = await self._get_goal_based_recommendations(
                user_id, user_profile, location
            )
        else:
            # Generar características para análisis
            user_features = await self._extract_user_features(
                user_id, user_profile, workout_history
            )
            
            # Encontrar usuarios similares
            similar_users = await self._find_similar_users(
                user_id, user_features, top_n=self.config['similar_users_count']
            )
            
            # Obtener entrenamientos candidatos
            candidates = await self._get_candidate_workouts(
                user_id, similar_users, location
            )
            
            # Filtrar por restricciones de tiempo si es necesario
            if available_time and self.config['consider_time_constraints']:
                candidates = [w for w in candidates if w['duration'] <= available_time]
                
            # Si hay nivel de energía especificado, ajustar dificultad
            if energy_level is not None:
                candidates = self._adjust_for_energy_level(candidates, energy_level)
            
            # Calcular puntuaciones para cada entrenamiento candidato
            scored_workouts = self._score_workout_candidates(
                candidates, user_profile, workout_history, user_features
            )
            
            # Seleccionar mejores recomendaciones asegurando variedad
            recommendations = self._select_diverse_recommendations(
                scored_workouts, 
                count=self.config['recommendation_count']
            )
            
            # Enriquecer con datos adicionales
            recommendations = await self._enrich_recommendations(recommendations)
        
        return recommendations
    
    def _score_workout_candidates(
        self, 
        candidates: List[Dict], 
        user_profile: Dict,
        workout_history: List[Dict],
        user_features: Dict
    ) -> List[Dict]:
        """Calcula una puntuación para cada entrenamiento candidato"""
        scored_workouts = []
        
        for workout in candidates:
            scores = {}
            
            # 1. Alineación con objetivos
            goal_score = self._calculate_goal_alignment(workout, user_profile['goals'])
            scores['goal_alignment'] = goal_score
            
            # 2. Preferencia del usuario (basada en entrenamientos previos similares)
            preference_score = self._calculate_user_preference(workout, workout_history)
            scores['user_preference'] = preference_score
            
            # 3. Impacto en progreso (basado en métricas de progreso recientes)
            progress_score = self._calculate_progress_impact(workout, user_features)
            scores['progress_impact'] = progress_score
            
            # 4. Variedad (evitar repetir ejercicios recientes)
            variety_score = self._calculate_variety_score(workout, workout_history)
            scores['variety'] = variety_score
            
            # 5. Ajuste de dificultad
            difficulty_score = self._calculate_difficulty_match(
                workout['difficulty'], user_features['ability_level']
            )
            scores['difficulty_match'] = difficulty_score
            
            # Puntuación total ponderada
            total_score = sum(
                scores[key] * self.feature_weights[key] 
                for key in scores
            )
            
            scored_workouts.append({
                'workout': workout,
                'total_score': total_score,
                'component_scores': scores
            })
            
        # Ordenar por puntuación total descendente
        return sorted(scored_workouts, key=lambda x: x['total_score'], reverse=True)
    
    def _select_diverse_recommendations(
        self, 
        scored_workouts: List[Dict], 
        count: int
    ) -> List[Dict]:
        """Selecciona un conjunto diverso de recomendaciones"""
        if len(scored_workouts) <= count:
            return [item['workout'] for item in scored_workouts]
            
        selected = [scored_workouts[0]['workout']]  # Empezar con el mejor
        remaining = scored_workouts[1:]
        
        # Medida de similitud entre entrenamientos
        def workout_similarity(w1, w2):
            # Calculamos similitud basada en tipos de ejercicios, grupos musculares, etc.
            exercise_overlap = len(
                set(w1.get('exercise_types', [])) & 
                set(w2.get('exercise_types', []))
            ) / max(len(w1.get('exercise_types', [])), 1)
            
            muscle_overlap = len(
                set(w1.get('muscle_groups', [])) & 
                set(w2.get('muscle_groups', []))
            ) / max(len(w1.get('muscle_groups', [])), 1)
            
            return 0.6 * exercise_overlap + 0.4 * muscle_overlap
        
        # Seleccionar entrenamiento más diverso en cada iteración
        while len(selected) < count and remaining:
            # Para cada restante, calcular similitud con ya seleccionados
            max_similarity_scores = []
            for workout_data in remaining:
                workout = workout_data['workout']
                similarities = [
                    workout_similarity(workout, sel) for sel in selected
                ]
                max_similarity_scores.append(
                    (max(similarities), workout_data['total_score'], workout_data)
                )
            
            # Ordenar por menor similitud y mayor puntuación
            max_similarity_scores.sort(key=lambda x: (x[0], -x[1]))
            
            # Seleccionar el menos similar que mantiene buena puntuación
            best_diverse = max_similarity_scores[0][2]['workout']
            selected.append(best_diverse)
            
            # Eliminar de los candidatos restantes
            remaining = [r for r in remaining if r['workout'] != best_diverse]
        
        return selected`
    }
  },
  'financial-family-telegram-bot': {
    title: 'Financial Family Telegram Bot',
    image: '/telegra_bot_financial_family.webp',
    shortDescription: 'Telegram bot for managing family finances with transaction tracking and expense analysis.',
    description: 'Bot de Telegram para gestión financiera familiar que permite a los miembros registrar transacciones, dividir gastos compartidos, establecer presupuestos y visualizar reportes. Integrado con Financial Family API para sincronización de datos.',
    technologies: ['Python', 'aiogram', 'SQLAlchemy', 'Pandas', 'matplotlib', 'Redis', 'PIL', 'qrcode', 'pydantic', 'Docker'],
    features: [
      { title: 'Creación de familias', description: 'Sistema para crear y gestionar grupos familiares con códigos QR de invitación para nuevos miembros.' },
      { title: 'Registro de gastos', description: 'Interfaz conversacional para registrar gastos individuales o compartidos entre miembros de la familia.' },
      { title: 'División de gastos', description: 'Algoritmo para dividir gastos equitativamente o con porcentajes personalizados entre miembros.' },
      { title: 'Notificaciones', description: 'Sistema de alertas para recordatorios de pagos pendientes y resúmenes periódicos.' },
      { title: 'Estadísticas visuales', description: 'Generación de gráficos y reportes estadísticos sobre patrones de gasto.' },
    ],
    architecture: 'Arquitectura basada en handlers y servicios usando aiogram para la interacción con la API de Telegram. Sistema de plantillas para generación de mensajes dinámicos. Base de datos PostgreSQL con SQLAlchemy como ORM. Módulos separados para procesamiento de comandos, interacción con API externa y generación de reportes gráficos.',
    github: 'https://github.com/Alexmontesino96/FinancialFamilyTelegramBot',
    githubRepo: 'Alexmontesino96/FinancialFamilyTelegramBot',
    telegramBot: 'https://t.me/family_financial_econ_bot',
    useCustomComponent: true,
    codeExamples: {
      title: 'Ver código en GitHub',
      code: `# El código fuente completo está disponible en GitHub:
# https://github.com/Alexmontesino96/FinancialFamilyTelegramBot
      
# Funcionalidades destacadas del bot:
# ----------------------------------------------------
# 1. Registro de pagos entre miembros familiares
# 2. Visualización de balances y deudas entre miembros
# 3. Sistema de gestión de gastos compartidos
# 4. Reportes y notificaciones automáticas
# 5. Gestión de categorías y presupuestos

# Para ver el código completo, visita el repositorio en GitHub
# o prueba el bot directamente en Telegram: @family_financial_econ_bot`
    }
  }
};

function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  // Simular carga de datos
  useEffect(() => {
    // Verificar si el proyecto existe en nuestros datos
    if (projectId && projectsData[projectId]) {
      setProject(projectsData[projectId]);
    }
  }, [projectId]);

  // Si el proyecto no existe
  if (!project) {
    return (
      <div className="px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-10">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1 items-center justify-center">
          <h2 className="text-white text-[28px] font-bold leading-tight tracking-[-0.015em] mb-6">Proyecto no encontrado</h2>
          <p className="text-[#9dabb8] text-base mb-8">El proyecto que estás buscando no existe o ha sido eliminado.</p>
          <Link to="/" className="flex items-center justify-center rounded-xl h-12 px-6 bg-[#3B82F6] text-white font-medium transition-colors hover:bg-[#2563EB]">
            <span>Volver al inicio</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-4 sm:py-6 md:py-10">
      <div className="layout-content-container flex flex-col w-full max-w-[1000px] flex-1">
        {/* Botón volver */}
        <div className="mb-4 sm:mb-6">
          <Link to="/#work" className="inline-flex items-center text-[#3B82F6] hover:text-white transition-colors text-sm sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="mr-2">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
            Volver a proyectos
          </Link>
        </div>
        
        {/* Layout flexible para escritorio */}
        <div className="flex flex-col md:flex-row md:gap-6 lg:gap-8 mb-6 sm:mb-10">
          {/* Columna de texto */}
          <div className="md:w-3/5 order-2 md:order-1">
            {/* Encabezado del proyecto */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h1 className="text-white text-2xl sm:text-3xl md:text-[32px] lg:text-[36px] font-bold leading-tight tracking-[-0.015em] mb-3 sm:mb-4">
                {project.title}
              </h1>
              <p className="text-[#9dabb8] text-sm sm:text-base md:text-lg">
                {project.description}
              </p>
            </div>
            
            {/* Tecnologías utilizadas - movidas aquí arriba */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-white text-xl md:text-2xl font-bold leading-tight tracking-[-0.015em] pb-2 sm:pb-3 mb-3 sm:mb-4 border-b border-[#293038]">
                Tecnologías
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="px-2 sm:px-3 py-1 bg-[#293038] text-white text-xs sm:text-sm rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Columna de imagen */}
          <div className="md:w-2/5 mb-5 md:mb-0 order-1 md:order-2">
            <div 
              className="w-full aspect-video bg-center bg-no-repeat bg-cover rounded-xl border border-[#293038] shadow-lg"
              style={{ backgroundImage: `url("${project.image}")` }}
            ></div>
          </div>
        </div>
        
        {/* Características del proyecto */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em] pb-2 sm:pb-4 border-b border-[#293038] mb-4 sm:mb-6">
            Características principales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {project.features.map((feature, index) => (
              <div key={index} className="bg-[#161B22] rounded-xl p-3 sm:p-4 md:p-5 shadow-md border border-[#293038]">
                <h3 className="text-[#3B82F6] text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#9dabb8] text-xs sm:text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Arquitectura */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em] pb-2 sm:pb-4 border-b border-[#293038] mb-4 sm:mb-6">
            Arquitectura
          </h2>
          <div className="bg-[#161B22] rounded-xl p-3 sm:p-4 md:p-6 shadow-md border border-[#293038]">
            <p className="text-[#9dabb8] text-xs sm:text-sm md:text-base">
              {project.architecture}
            </p>
          </div>
        </div>
        
        {/* Código ejemplo destacado */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em] pb-2 sm:pb-4 border-b border-[#293038] mb-4 sm:mb-6">
            Código destacado
          </h2>
          
          <div className="overflow-hidden">
            {project.useCustomComponent ? (
              <>
                {projectId === 'financial-family-api' && <BalanceServiceModule />}
                {projectId === 'gym-api' && <GymApiModule />}
                {projectId === 'supplies-order-predict' && <OrderServiceModule />}
                {projectId === 'financial-family-telegram-bot' && <StartHandlerModule />}
              </>
            ) : (
              <div className="bg-[#161B22] rounded-xl shadow-md border border-[#293038] overflow-hidden">
                {project.codeExamples && (
                  <>
                    <div className="bg-[#0D1117] px-4 sm:px-6 py-3 border-b border-[#293038]">
                      <p className="text-white text-sm sm:text-base md:text-lg font-medium">
                        {project.codeExamples.title || 'Código Destacado'}
                      </p>
                    </div>
                    <pre className="p-3 sm:p-4 md:p-6 overflow-x-auto text-[#9dabb8] text-xs sm:text-sm">
                      <code>{project.codeExamples.code}</code>
                    </pre>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Llamada a la acción */}
        <div className="flex flex-col items-center justify-center px-3 sm:px-6 py-6 sm:py-8 md:py-10 bg-[#161B22] rounded-xl mb-6 border border-[#293038]">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-tight tracking-[-0.015em] mb-3 sm:mb-4 text-center">
            ¿Interesado en este proyecto?
          </h2>
          <p className="text-[#9dabb8] text-xs sm:text-sm text-center max-w-lg mb-4 sm:mb-6">
            Si quieres saber más sobre este proyecto o tienes alguna pregunta, no dudes en contactarme.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {project.telegramBot && (
              <a href={project.telegramBot} target="_blank" rel="noopener noreferrer" 
                className="flex items-center justify-center rounded-xl h-10 px-4 sm:px-6 bg-[#0088cc] text-white text-sm font-medium transition-colors hover:bg-[#0099dd] w-full sm:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="mr-2">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm-2.857 14.857l3.395-5.29c.142-.223.654-.328.95-.045l3.658 2.767c.192.148.459.123.623-.06l2.025-2.026.24-.174c.197-.143.186-.42 0-.582-.745-.685-5.037-4.744-5.037-4.744a.313.313 0 0 0-.404.029l-5.713 5.714c-.237.237-.164.657.142.83l1.028.601c.146.086.312.111.469.068l9.106-2.908-7.672 5.715c-.31.165-.261.637.045.828l.614.349a.507.507 0 0 0 .437.053l5.326-1.935-3.744 2.931a.333.333 0 0 1-.398.016z" />
                </svg>
                <span>Probar en Telegram</span>
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" 
              className="flex items-center justify-center rounded-xl h-10 px-4 sm:px-6 bg-[#293038] text-white text-sm font-medium transition-colors hover:bg-[#3B82F6] w-full sm:w-auto">
              <span>Ver en GitHub</span>
            </a>
            <a href="mailto:alex.montesino@example.com" 
              className="flex items-center justify-center rounded-xl h-10 px-4 sm:px-6 bg-[#3B82F6] text-white text-sm font-medium transition-colors hover:bg-[#2563EB] w-full sm:w-auto">
              <span>Contactar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail; 