import React from 'react';

const StartHandlerModule = () => {
  return (
    <div className="bg-[#161B22] rounded-xl p-6 shadow-md border border-[#293038] overflow-hidden">
      <div className="bg-[#0D1117] px-6 py-3 -m-6 mb-6 border-b border-[#293038]">
        <p className="text-white text-lg font-medium">Financial Family Telegram Bot</p>
      </div>
      <p className="text-[#9dabb8] mb-4">
        Conversational Telegram bot that allows managing family finances, recording shared expenses
        and visualizing balances between family members with an intuitive interface.
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
    """Telegram bot for family finance management with integration 
    to Financial Family API and intuitive conversational system"""
    
    def __init__(self, token, api_client):
        self.bot = Bot(token=token)
        self.dp = Dispatcher(self.bot)
        self.api_client = api_client
        self.logger = logging.getLogger("telegram_bot")
        
        # Register handlers`}
      </pre>
      
      <div className="mt-8">
        <h3 className="text-[--violet-9] text-lg font-bold mb-3">⭐ Featured Code</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Recomendación personalizada */}
          <div className="bg-[#0D1117] p-4 rounded-md border border-[#293038]">
            <p className="text-[--violet-9] font-bold mb-2">Conversation System</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`class ExpenseForm(StatesGroup):
    """State machine for expense registration"""
    family_selection = State()
    expense_type = State()
    expense_amount = State()
    expense_description = State()
    members_selection = State()
    split_type = State()
    confirmation = State()

async def cmd_add_expense(message: types.Message):
    """Handler to start the expense registration process"""
    # Get available families for the user
    user_id = message.from_user.id
    families = await api_client.get_user_families(user_id)
    
    if not families:
        await message.answer(
            "You don't belong to any family. Use /create_family to create one."
        )
        return
        
    # Show keyboard with available families
    keyboard = ReplyKeyboardMarkup(resize_keyboard=True, one_time_keyboard=True)
    for family in families:
        keyboard.add(KeyboardButton(family["name"]))
    
    # Start state machine
    await ExpenseForm.family_selection.set()
    await message.answer("Select family:", reply_markup=keyboard)`}
            </pre>
          </div>
          
          {/* Puntuación de candidatos */}
          <div className="bg-[#0D1117] p-4 rounded-md border border-[#293038]">
            <p className="text-[--violet-9] font-bold mb-2">Report Generation</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`async def generate_balance_report(family_id: int, 
                           period: str = "month",
                           format_type: str = "text") -> str:
    """
    Generates a balance report for the family
    """
    # Get balances from API
    balances = await api_client.get_balances(family_id, period)
    members = await api_client.get_family_members(family_id)
    
    # Create name dictionary for more friendly references
    member_names = {m["id"]: m["name"] for m in members}
    
    # Generate report according to requested format
    if format_type == "text":
        return generate_text_report(balances, member_names)
    elif format_type == "graph":
        # Generate graph with matplotlib and send as image
        image_path = generate_graph_report(balances, member_names)
        return image_path
    else:
        raise ValueError(f"Unsupported format: {format_type}")`}
            </pre>
          </div>
          
          {/* Algoritmo de diversidad */}
          <div className="bg-[#0D1117] p-4 rounded-md border border-[#293038]">
            <p className="text-[--violet-9] font-bold mb-2">Group Management</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`async def create_family_group(message: types.Message, state: FSMContext):
    """Creates a new family group and generates QR invitation code"""
    user_id = message.from_user.id
    user_data = await state.get_data()
    family_name = user_data["family_name"]
    
    # Create family in API
    try:
        family = await api_client.create_family(
            name=family_name,
            admin_id=user_id,
            admin_name=message.from_user.full_name
        )
        
        # Generate invitation QR code
        invite_code = family["invite_code"]
        qr_image = QRGenerator.generate_invite_qr(invite_code)
        
        # Send QR code to user
        await bot.send_photo(
            chat_id=message.chat.id,
            photo=qr_image,
            caption=f"Family '{family_name}' created successfully.\n"
                   f"Share this QR code to invite members:\n"
                   f"Code: {invite_code}"
        )
        
    except Exception as e:
        logger.error(f"Error creating family: {e}")
        await message.answer("Error creating family. Please try again.")`}
            </pre>
          </div>
          
          {/* Adaptación Energética */}
          <div className="bg-[#0D1117] p-4 rounded-md border border-[#293038]">
            <p className="text-[--violet-9] font-bold mb-2">Expense Splitting</p>
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
            <p className="text-[--violet-9] font-bold mb-2">Visualization of Data</p>
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
        <h3 className="text-[--violet-9] text-lg font-bold mb-3">Main Features</h3>
        <ul className="list-disc pl-5 text-[#9dabb8] space-y-2">
          <li><strong>Family Group Management:</strong> Family creation, member invitation via QR codes, and permission management.</li>
          <li><strong>Shared Expense Recording:</strong> Conversational system for recording expenses with different methods of division between members.</li>
          <li><strong>Balance Visualization:</strong> Current balance, debt and credit status reports between family members.</li>
          <li><strong>Graphical Reports:</strong> Generation of graphical and visual expense reports by category, member, and period.</li>
          <li><strong>Payment Reminders:</strong> Automatic system for notifying pending debts and recurring payments.</li>
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-[--violet-9] text-lg font-bold mb-3">Technical Concepts</h3>
        <div className="bg-[#0D1117] p-4 rounded-md">
          <ul className="list-disc pl-5 text-[#9dabb8] space-y-2">
            <li><strong>State Machines:</strong> Implementation of complex conversational flows with aiogram and FSM.</li>
            <li><strong>API Integration:</strong> Asynchronous communication with the Financial Family API for data synchronization.</li>
            <li><strong>Dynamic UI Generation:</strong> Creation of keyboards and buttons adapted to each conversation context.</li>
            <li><strong>Image Processing:</strong> Generation of graphical and QR codes to enhance user experience.</li>
            <li><strong>Custom Middleware:</strong> System of filters and handlers for access control and data validation.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StartHandlerModule; 