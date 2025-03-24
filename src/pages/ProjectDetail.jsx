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
    shortDescription: 'Restaurant service management platform with microservices architecture.',
    description: 'CantinaGo is a restaurant service management platform that allows chefs to offer their meals and customers to place orders. The project has migrated from a monolithic architecture to a microservices architecture to improve scalability, maintainability, and resilience of the system.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Auth0', 'Docker', 'Microservices', 'Streamlit', 'SQLAlchemy', 'Pydantic', 'OpenAI API'],
    features: [
      { title: 'Microservices Architecture', description: 'Clear separation of responsibilities with 6 independent microservices.' },
      { title: 'API Gateway', description: 'Single entry point that routes requests to the corresponding services.' },
      { title: 'Authentication and Authorization', description: 'Integration with Auth0 for secure access management.' },
      { title: 'Database per Service', description: 'Each microservice has its own database to ensure independence.' },
      { title: 'AI Integration', description: 'Meal service uses OpenAI to enhance the user experience.' },
    ],
    architecture: 'Architecture based on microservices with 6 independent components: API Gateway as an entry point that routes requests, and 5 specific services (Authentication, Customer, Chef, Order, and Meal). Each service has its own PostgreSQL database to ensure low coupling. Communication between services is done via HTTP using httpx. Everything is containerized with Docker and orchestrated with Docker Compose for easy deployment.',
    github: 'https://github.com/Alexmontesino96/CantinaGo',
    useCustomComponent: false,
    codeExamples: {
      title: 'Proxy Middleware in API Gateway',
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
    description: 'System designed to automate and optimize inventory management and order processing, incorporating statistical analysis to improve decision-making in a retail chain. Developed with FastAPI, it integrates advanced features that facilitate automatic inventory updates, order management, and secure authentication using Auth0.',
    technologies: ['Python 3.8+', 'FastAPI', 'SQLAlchemy', 'Pandas', 'Auth0', 'CSV Processing', 'RESTful API', 'PostgreSQL', 'uvicorn', 'Pydantic'],
    features: [
      { title: 'Order Management', description: 'Full support for searching, adding, removing, and importing orders from CSV files.' },
      { title: 'Product Management', description: 'Includes importing product lists and efficiently updating prices.' },
      { title: 'Statistical Analysis', description: 'Uses historical data to generate statistics on product demand.' },
      { title: 'Secure Authentication', description: 'Implements Auth0 for user management and access control to protected features.' },
      { title: 'Intuitive Interface', description: 'Designed to facilitate daily operations for end users with automatic documentation.' },
    ],
    architecture: 'RESTful API built with FastAPI that provides endpoints for managing orders, products, and inventory. SQLAlchemy as ORM for database manipulation and querying. Integration with Auth0 for authentication and authorization handling. Data processing with Pandas for statistical analysis and report generation.',
    github: 'https://github.com/Alexmontesino96/Supplies-Order-Predict',
    useCustomComponent: true,
    codeExamples: {
      title: 'Order Processing Service',
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
    description: 'Family financial management API built with FastAPI. Allows family members to record expenses, make payments between people, calculate balances and debts, and obtain detailed reports. Implements a layered architecture with JWT-based authentication system and PostgreSQL storage.',
    technologies: ['Python 3.8+', 'FastAPI', 'PostgreSQL 12+', 'SQLAlchemy', 'Pydantic', 'JWT', 'Docker', 'Pytest', 'Alembic', 'SQLite'],
    features: [
      { title: 'Family Management', description: 'Creation and administration of family groups with multiple members, each identified by their Telegram ID.' },
      { title: 'Shared Expenses Recording', description: 'System for recording expenses and dividing them among specific family members or among all.' },
      { title: 'Smart Balance Calculation', description: 'Debt netting algorithm that simplifies transactions between members and prevents calculation errors.' },
      { title: 'Payment System', description: 'Recording of payments between members with consistency verification to maintain the integrity of financial data.' },
      { title: 'Complete RESTful API', description: 'Endpoints documented with OpenAPI for families, members, expenses and payments, with secure authentication using JWT tokens.' },
    ],
    architecture: 'Layered architecture with: (1) API Layer implemented with FastAPI to handle HTTP requests, (2) Service Layer containing the main business logic, (3) Model Layer that defines entities and their representation in the database, and (4) Persistence Layer that manages interaction with PostgreSQL through SQLAlchemy. Security implemented with JWT authentication.',
    github: 'https://github.com/Alexmontesino96/FinancialFamilyAPI',
    useCustomComponent: true,
    codeExamples: {
      title: 'Anomaly Detection Algorithm',
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
    description: 'Comprehensive management system for gyms developed with microservices architecture in Python. Uses MongoDB as the main database, Redis for cache, and WebSockets for real-time updates. Includes biometric access control, membership management, reservations, and progress tracking.',
    technologies: ['Python', 'Flask', 'MongoDB', 'Redis', 'WebSocket', 'JWT', 'Docker', 'RabbitMQ', 'Stripe API', 'QR Code', 'Nginx'],
    features: [
      { title: 'Biometric Access Control', description: 'Advanced access validation system using QR and optional facial recognition.' },
      { title: 'Membership and Payment Management', description: 'Different types of plans with recurring billing integrated with Stripe and automated reminders.' },
      { title: 'Class and Space Reservation', description: 'Interactive system for reservations with capacity limits and automatic cancellations.' },
      { title: 'Progress Tracking', description: 'Recording of workouts, body metrics, and personalized goals.' },
      { title: 'Usage Analytics', description: 'Dashboard with attendance, occupancy, and customer retention metrics.' },
    ],
    architecture: 'Distributed architecture with multiple microservices connected through asynchronous messaging with RabbitMQ. MongoDB as the main database, Redis for cache and sessions. Authentication using JWT with token rotation. WebSockets for real-time updates and push notifications.',
    github: 'https://github.com/Alexmontesino96/GymAPI',
    useCustomComponent: true,
    codeExamples: {
      title: 'Workout Recommendation System',
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
    description: 'Telegram bot for family financial management that allows members to record transactions, split shared expenses, set budgets, and view reports. Integrated with Financial Family API for data synchronization.',
    technologies: ['Python', 'aiogram', 'SQLAlchemy', 'Pandas', 'matplotlib', 'Redis', 'PIL', 'qrcode', 'pydantic', 'Docker'],
    features: [
      { title: 'Family Creation', description: 'System to create and manage family groups with QR invitation codes for new members.' },
      { title: 'Expense Recording', description: 'Conversational interface for recording individual or shared expenses among family members.' },
      { title: 'Expense Splitting', description: 'Algorithm to split expenses equally or with custom percentages among members.' },
      { title: 'Notifications', description: 'Alert system for pending payment reminders and periodic summaries.' },
      { title: 'Visual Statistics', description: 'Generation of graphs and statistical reports on spending patterns.' },
    ],
    architecture: 'Architecture based on handlers and services using aiogram for interaction with the Telegram API. Template system for generating dynamic messages. PostgreSQL database with SQLAlchemy as ORM. Separate modules for command processing, interaction with external API, and graphical report generation.',
    github: 'https://github.com/Alexmontesino96/FinancialFamilyTelegramBot',
    githubRepo: 'Alexmontesino96/FinancialFamilyTelegramBot',
    telegramBot: 'https://t.me/family_financial_econ_bot',
    useCustomComponent: true,
    codeExamples: {
      title: 'View code on GitHub',
      code: `# The complete source code is available on GitHub:
# https://github.com/Alexmontesino96/FinancialFamilyTelegramBot
      
# Bot key features:
# ----------------------------------------------------
# 1. Payment recording between family members
# 2. Balance and debt visualization between members
# 3. Shared expense management system
# 4. Automatic reports and notifications
# 5. Categories and budget management

# To see the complete code, visit the GitHub repository
# or try the bot directly on Telegram: @family_financial_econ_bot`
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
          <h2 className="text-white text-[28px] font-bold leading-tight tracking-[-0.015em] mb-6">Project not found</h2>
          <p className="text-[#9dabb8] text-base mb-8">The project you are looking for does not exist or has been removed.</p>
          <div className="mb-6 text-center sm:text-left">
            <Link to="/" className="flex items-center justify-center rounded-xl h-12 px-6 bg-gradient-to-b from-[--violet-9] to-[--violet-9] hover:to-[--violet-10] text-white font-medium transition-all border-t border-[rgba(255,255,255,0.21)]">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-4 sm:py-6 md:py-10">
      <div className="layout-content-container flex flex-col w-full max-w-[1000px] flex-1">
        {/* Botón volver */}
        <div className="mb-4 sm:mb-6">
          <Link to="/#work" className="inline-flex items-center text-[--violet-9] hover:text-[--violet-10] transition-colors text-sm sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="mr-2">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
            Back to projects
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
                Technologies
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
            Main Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {project.features.map((feature, index) => (
              <div key={index} className="bg-[#161B22] rounded-xl p-3 sm:p-4 md:p-5 shadow-md border border-[#293038]">
                <h3 className="text-[--violet-9] text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2">
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
            Architecture
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
            Featured Code
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
                        {project.codeExamples.title || 'Featured Code'}
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
            Interested in this project?
          </h2>
          <p className="text-[#9dabb8] text-xs sm:text-sm text-center max-w-lg mb-4 sm:mb-6">
            If you want to know more about this project or have any questions, don't hesitate to contact me.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            {project.telegramBot && (
              <a 
                href={project.telegramBot} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center rounded-xl h-10 px-4 sm:px-6 bg-[#293038] text-white text-sm font-medium transition-colors hover:bg-[--violet-9] w-full sm:w-auto"
              >
                <span>Try on Telegram</span>
              </a>
            )}
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center rounded-xl h-10 px-4 sm:px-6 bg-gradient-to-b from-[--violet-9] to-[--violet-9] hover:to-[--violet-10] text-white text-sm font-medium transition-all border-t border-[rgba(255,255,255,0.21)] w-full sm:w-auto"
            >
              <span>View on GitHub</span>
            </a>
            <a href="mailto:alex.montesino@example.com" 
              className="flex items-center justify-center rounded-xl h-10 px-4 sm:px-6 bg-gradient-to-b from-[--violet-9] to-[--violet-9] hover:to-[--violet-10] text-white text-sm font-medium transition-all border-t border-[rgba(255,255,255,0.21)] w-full sm:w-auto">
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail; 