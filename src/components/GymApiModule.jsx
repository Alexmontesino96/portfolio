import React from 'react';

const GymApiModule = () => {
  return (
    <div className="bg-[#161B22] rounded-xl p-4 sm:p-6 shadow-md border border-[#293038] overflow-hidden">
      <div className="bg-[#0D1117] px-4 sm:px-6 py-3 -mx-4 sm:-mx-6 mb-4 sm:mb-6 border-b border-[#293038]">
        <p className="text-white text-base sm:text-lg font-medium">GymAPI</p>
      </div>
      <p className="text-[#9dabb8] text-sm mb-4">
        Este sistema de gestión para gimnasios implementa una arquitectura modular con modelos
        relacionales y servicios especializados para manejar usuarios, eventos, entrenamientos y comunicaciones.
      </p>

      <div className="mt-6 sm:mt-8">
        <h3 className="text-[#E3B341] text-base sm:text-lg font-bold mb-3">⭐ Código Destacado</h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          
          {/* Modelo relacional con enumeraciones tipadas */}
          <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md border border-[#293038]">
            <p className="text-[#3B82F6] font-bold mb-2 text-sm">Modelo relacional con enumeraciones tipadas</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`class EventStatus(str, enum.Enum):
    """Estado del evento."""
    SCHEDULED = "SCHEDULED"  # Evento programado
    CANCELLED = "CANCELLED"  # Evento cancelado
    COMPLETED = "COMPLETED"  # Evento completado


class Event(Base):
    """Modelo para eventos."""
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True, nullable=False)
    description = Column(Text, nullable=True)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    
    # Estado del evento usando enumeración tipada
    status = Column(Enum(EventStatus), default=EventStatus.SCHEDULED)
    
    # Relaciones con otras entidades
    creator_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    creator = relationship("User", back_populates="created_events")
    participants = relationship("EventParticipation", cascade="all, delete-orphan")`}
            </pre>
          </div>
          
          {/* Gestión de Relaciones con validación multinivel */}
          <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md border border-[#293038]">
            <p className="text-[#3B82F6] font-bold mb-2 text-sm">Gestión de relaciones con validación multinivel</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`def create_relationship(
    self, db: Session, relationship_in: TrainerMemberRelationshipCreate, created_by_id: int
):
    """Crear una nueva relación entre un entrenador y un miembro."""
    
    # Validación en cascada:
    
    # 1. Verificar rol y existencia del entrenador
    trainer = user_repository.get(db, id=relationship_in.trainer_id)
    if not trainer or trainer.role != UserRole.TRAINER:
        raise HTTPException(status_code=400, detail="Entrenador inválido")
    
    # 2. Verificar rol y existencia del miembro
    member = user_repository.get(db, id=relationship_in.member_id)
    if not member or member.role != UserRole.MEMBER:
        raise HTTPException(status_code=400, detail="Miembro inválido")
    
    # 3. Verificar relación duplicada
    existing = trainer_member_repository.get_by_trainer_and_member(
        db, trainer_id=relationship_in.trainer_id, member_id=relationship_in.member_id
    )
    
    # Crear relación solo si todas las validaciones son correctas
    # ...`}
            </pre>
          </div>
          
          {/* API asíncrona con WebSockets para chat en tiempo real */}
          <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md border border-[#293038]">
            <p className="text-[#3B82F6] font-bold mb-2 text-sm">API asíncrona con WebSockets para chat en tiempo real</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`@router.websocket("/ws/{chat_room_id}")
async def websocket_endpoint(
    websocket: WebSocket, 
    chat_room_id: int,
    db: Session = Depends(get_db),
    current_user: Auth0User = Depends(get_current_user_ws)
):
    """Endpoint WebSocket para chat en tiempo real"""
    await connection_manager.connect(websocket, chat_room_id, current_user.id)
    
    try:
        # Verificar acceso a la sala
        if not await chat_service.user_has_access_to_room(...):
            await connection_manager.disconnect(...)
            return
            
        # Notificar a otros usuarios sobre la conexión
        await connection_manager.broadcast_to_room(
            chat_room_id,
            {"type": "user_joined", "user_id": current_user.id, ...}
        )
        
        # Ciclo de escucha de mensajes
        while True:
            data = await websocket.receive_json()
            # Procesar y transmitir mensaje
            # ...
            
    except WebSocketDisconnect:
        # Manejar desconexión
        # ...`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        <h3 className="text-[#3B82F6] text-base sm:text-lg font-bold mb-2 sm:mb-3">Funcionalidades Principales</h3>
        <ul className="list-disc pl-5 text-[#9dabb8] space-y-1 sm:space-y-2 text-sm">
          <li><strong>Gestión de eventos:</strong> Sistema completo para creación, programación y seguimiento de clases y actividades.</li>
          <li><strong>Relaciones entrenador-miembro:</strong> Estructura para asignar miembros a entrenadores y gestionar sus relaciones.</li>
          <li><strong>Chat en tiempo real:</strong> Comunicación directa entre usuarios y salas de chat específicas para eventos.</li>
          <li><strong>Control de participación:</strong> Registro, confirmación y seguimiento de asistencia a eventos con soporte para listas de espera.</li>
          <li><strong>Autenticación con Auth0:</strong> Integración segura con sistema de identidad externo para gestión de usuarios.</li>
        </ul>
      </div>
      <div className="mt-5 sm:mt-6">
        <h3 className="text-[#3B82F6] text-base sm:text-lg font-bold mb-2 sm:mb-3">Técnicas Avanzadas</h3>
        <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md">
          <ul className="list-disc pl-5 text-[#9dabb8] space-y-1 sm:space-y-2 text-sm">
            <li><strong>API asíncrona:</strong> Uso de async/await para operaciones no bloqueantes y mejor rendimiento en endpoints concurridos.</li>
            <li><strong>Capas de abstracción:</strong> Separación clara entre repositorios, servicios y controladores para mantener un código organizado.</li>
            <li><strong>Enumeraciones tipadas:</strong> Uso de enum para garantizar la integridad de datos de estados y evitar valores inválidos.</li>
            <li><strong>Validación multinivel:</strong> Sistema de verificaciones en cascada para asegurar que las relaciones entre entidades son válidas.</li>
            <li><strong>Modelos relacionales:</strong> Implementación robusta de relaciones entre entidades utilizando SQLAlchemy con cascade deletes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GymApiModule; 