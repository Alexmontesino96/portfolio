import React from 'react';

const StartHandlerModule = () => {
  return (
    <div className="bg-[#161B22] rounded-xl p-6 shadow-md border border-[#293038] overflow-hidden">
      <div className="bg-[#0D1117] px-6 py-3 -m-6 mb-6 border-b border-[#293038]">
        <p className="text-white text-lg font-medium">Financial Family Telegram Bot</p>
      </div>
      <p className="text-[#9dabb8] mb-4">
        Bot conversacional para Telegram que permite gestionar finanzas familiares, registrar gastos compartidos
        y visualizar balances entre miembros de la familia con una interfaz intuitiva.
      </p>
      <pre className="overflow-x-auto text-[#9dabb8] text-sm p-4 bg-[#0D1117] rounded-md">
{`from aiogram import Bot, Dispatcher, types, executor
from aiogram.contrib.middlewares.logging import LoggingMiddleware
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.dispatcher.filters import Text, Command
from aiogram.types import ParseMode, ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton

from config import API_TOKEN, FAMILY_API_URL
from services import FamilyApiClient, QRGenerator
from utils import format_currency, generate_expense_summary
import asyncio
import logging

class FinancialFamilyBot:
    """Bot de Telegram para gestión de finanzas familiares con integración 
    a Financial Family API y sistema conversacional intuitivo"""
    
    def __init__(self, token, api_client):
        self.bot = Bot(token=token)
        self.dp = Dispatcher(self.bot)
        self.api_client = api_client
        self.logger = logging.getLogger("telegram_bot")
        
        # Registrar handlers`}
      </pre>
      
      <div className="mt-8">
        <h3 className="text-[#E3B341] text-lg font-bold mb-3">⭐ Código Destacado</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Recomendación personalizada */}
          <div className="bg-[#0D1117] p-4 rounded-md border border-[#293038]">
            <p className="text-[#3B82F6] font-bold mb-2">Sistema de Conversación</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`class ExpenseForm(StatesGroup):
    """Máquina de estados para el registro de gastos"""
    family_selection = State()
    expense_type = State()
    expense_amount = State()
    expense_description = State()
    members_selection = State()
    split_type = State()
    confirmation = State()

async def cmd_add_expense(message: types.Message):
    """Handler para iniciar el proceso de registro de gastos"""
    # Obtener familias disponibles para el usuario
    user_id = message.from_user.id
    families = await api_client.get_user_families(user_id)
    
    if not families:
        await message.answer(
            "No perteneces a ninguna familia. Usa /create_family para crear una."
        )
        return
        
    # Mostrar teclado con familias disponibles
    keyboard = ReplyKeyboardMarkup(resize_keyboard=True, one_time_keyboard=True)
    for family in families:
        keyboard.add(KeyboardButton(family["name"]))
    
    # Iniciar máquina de estados
    await ExpenseForm.family_selection.set()
    await message.answer("Selecciona la familia:", reply_markup=keyboard)`}
            </pre>
          </div>
          
          {/* Puntuación de candidatos */}
          <div className="bg-[#0D1117] p-4 rounded-md border border-[#293038]">
            <p className="text-[#3B82F6] font-bold mb-2">Generación de Informes</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`async def generate_balance_report(family_id: int, 
                           period: str = "month",
                           format_type: str = "text") -> str:
    """
    Genera un informe de balances para la familia
    """
    # Obtener balances de la API
    balances = await api_client.get_balances(family_id, period)
    members = await api_client.get_family_members(family_id)
    
    # Crear diccionario de nombres para referencias más amigables
    member_names = {m["id"]: m["name"] for m in members}
    
    # Generar informe según formato solicitado
    if format_type == "text":
        return generate_text_report(balances, member_names)
    elif format_type == "graph":
        # Generar gráfico con matplotlib y enviarlo como imagen
        image_path = generate_graph_report(balances, member_names)
        return image_path
    else:
        raise ValueError(f"Formato no soportado: {format_type}")`}
            </pre>
          </div>
          
          {/* Algoritmo de diversidad */}
          <div className="bg-[#0D1117] p-4 rounded-md border border-[#293038]">
            <p className="text-[#3B82F6] font-bold mb-2">Gestión de Grupos</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`async def create_family_group(message: types.Message, state: FSMContext):
    """Crea un nuevo grupo familiar y genera código QR de invitación"""
    user_id = message.from_user.id
    user_data = await state.get_data()
    family_name = user_data["family_name"]
    
    # Crear familia en la API
    try:
        family = await api_client.create_family(
            name=family_name,
            admin_id=user_id,
            admin_name=message.from_user.full_name
        )
        
        # Generar código QR de invitación
        invite_code = family["invite_code"]
        qr_image = QRGenerator.generate_invite_qr(invite_code)
        
        # Enviar código QR al usuario
        await bot.send_photo(
            chat_id=message.chat.id,
            photo=qr_image,
            caption=f"Familia '{family_name}' creada correctamente.\n"
                   f"Comparte este código QR para invitar miembros:\n"
                   f"Código: {invite_code}"
        )
        
    except Exception as e:
        logger.error(f"Error al crear familia: {e}")
        await message.answer("Error al crear la familia. Intenta de nuevo.")`}
            </pre>
          </div>
          
          {/* Adaptación Energética */}
          <div className="bg-[#0D1117] p-4 rounded-md border border-[#293038]">
            <p className="text-[#3B82F6] font-bold mb-2">División de Gastos</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`async def process_expense_split(expense_data: dict, split_type: str):
    """Procesa la división de un gasto entre miembros"""
    amount = expense_data["amount"]
    members = expense_data["members"]
    
    if split_type == "equal":
        # Dividir equitativamente
        share_amount = amount / len(members)
        shares = {member_id: share_amount for member_id in members}
        
    elif split_type == "percentage":
        # Usar porcentajes personalizados
        shares = {}
        for member_id, percentage in expense_data["percentages"].items():
            shares[member_id] = amount * (percentage / 100)
            
    elif split_type == "custom":
        # Usar montos personalizados
        shares = expense_data["custom_amounts"]
        # Verificar que la suma coincide con el monto total
        if abs(sum(shares.values()) - amount) > 0.01:
            raise ValueError("La suma de montos no coincide con el total")
            
    return shares`}
            </pre>
          </div>
          
          {/* Detección de Anomalías */}
          <div className="bg-[#0D1117] p-4 rounded-md border border-[#293038] md:col-span-2">
            <p className="text-[#3B82F6] font-bold mb-2">Visualización de Datos</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`async def generate_monthly_overview(chat_id: int, family_id: int):
    """Genera y envía un resumen visual mensual de gastos"""
    # Obtener datos de gastos del mes
    today = datetime.now()
    start_date = datetime(today.year, today.month, 1)
    end_date = (datetime(today.year, today.month + 1, 1) 
               if today.month < 12 
               else datetime(today.year + 1, 1, 1)) - timedelta(days=1)
               
    expenses = await api_client.get_expenses(
        family_id=family_id,
        start_date=start_date.isoformat(),
        end_date=end_date.isoformat()
    )
    
    # Preparar datos para visualización
    categories = {}
    for expense in expenses:
        category = expense.get("category", "Sin categoría")
        if category not in categories:
            categories[category] = 0
        categories[category] += expense["amount"]
    
    # Generar gráficos
    fig, axs = plt.subplots(2, 1, figsize=(10, 12))
    
    # Gráfico de torta por categorías
    axs[0].pie(
        categories.values(), 
        labels=categories.keys(),
        autopct='%1.1f%%',
        startangle=90
    )
    axs[0].set_title('Gastos por Categoría')
    
    # Gráfico de barras por miembro
    # Código para el segundo gráfico...
    
    # Guardar y enviar imagen
    img_path = f"temp/{family_id}_monthly_{today.strftime('%Y%m')}.png"
    plt.savefig(img_path)
    
    await bot.send_photo(
        chat_id=chat_id,
        photo=open(img_path, 'rb'),
        caption=f"Resumen de gastos: {start_date.strftime('%d/%m/%Y')} - {end_date.strftime('%d/%m/%Y')}"
    )`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-[#3B82F6] text-lg font-bold mb-3">Funcionalidades Principales</h3>
        <ul className="list-disc pl-5 text-[#9dabb8] space-y-2">
          <li><strong>Gestión de grupos familiares:</strong> Creación de familias, invitación de miembros mediante códigos QR y administración de permisos.</li>
          <li><strong>Registro de gastos compartidos:</strong> Sistema conversacional para registrar gastos con diferentes métodos de división entre miembros.</li>
          <li><strong>Visualización de balances:</strong> Reportes de saldos actuales, estados de deuda y crédito entre miembros de la familia.</li>
          <li><strong>Informes gráficos:</strong> Generación de gráficos y visualizaciones de gastos por categoría, miembro y periodo.</li>
          <li><strong>Recordatorios de pagos:</strong> Sistema automático de notificaciones para recordar deudas pendientes y pagos recurrentes.</li>
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-[#3B82F6] text-lg font-bold mb-3">Conceptos Técnicos</h3>
        <div className="bg-[#0D1117] p-4 rounded-md">
          <ul className="list-disc pl-5 text-[#9dabb8] space-y-2">
            <li><strong>Máquinas de estado:</strong> Implementación de flujos conversacionales complejos con aiogram y FSM.</li>
            <li><strong>Integración API:</strong> Comunicación asíncrona con la Financial Family API para sincronización de datos.</li>
            <li><strong>Generación dinámica de UI:</strong> Creación de teclados y botones adaptados al contexto de cada conversación.</li>
            <li><strong>Procesamiento de imágenes:</strong> Generación de gráficos y códigos QR para mejorar la experiencia del usuario.</li>
            <li><strong>Middleware personalizado:</strong> Sistema de filtros y handlers para control de acceso y validación de datos.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StartHandlerModule; 