import React from 'react';

const GymApiModule = () => {
  return (
    <div className="bg-[#161B22] rounded-xl p-4 sm:p-6 shadow-md border border-[#293038] overflow-hidden">
      <div className="bg-[#0D1117] px-4 sm:px-6 py-3 -mx-4 sm:-mx-6 mb-4 sm:mb-6 border-b border-[#293038]">
        <p className="text-white text-base sm:text-lg font-medium">GymAPI</p>
      </div>
      <p className="text-[#9dabb8] text-sm mb-4">
        This gym management system implements a modular architecture with relational models
        and specialized services to handle users, events, workouts and communications.
      </p>

      <div className="mt-6 sm:mt-8">
        <h3 className="text-[--violet-9] text-base sm:text-lg font-bold mb-3">⭐ Featured Code</h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          
          {/* Modelo relacional con enumeraciones tipadas */}
          <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md border border-[#293038]">
            <p className="text-[--violet-9] font-bold mb-2 text-sm">Relational model with typed enumerations</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`class EventStatus(str, enum.Enum):
    """Event status."""
    SCHEDULED = "SCHEDULED"  # Scheduled event
    CANCELLED = "CANCELLED"  # Cancelled event
    COMPLETED = "COMPLETED"  # Completed event


class Event(Base):
    """Event model."""
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True, nullable=False)
    description = Column(Text, nullable=True)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    
    # Event status using typed enumeration
    status = Column(Enum(EventStatus), default=EventStatus.SCHEDULED)
    
    # Relationships with other entities
    creator_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    creator = relationship("User", back_populates="created_events")
    participants = relationship("EventParticipation", cascade="all, delete-orphan")`}
            </pre>
          </div>
          
          {/* Gestión de Relaciones con validación multinivel */}
          <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md border border-[#293038]">
            <p className="text-[--violet-9] font-bold mb-2 text-sm">Relationship management with multi-level validation</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`def create_relationship(
    self, db: Session, relationship_in: TrainerMemberRelationshipCreate, created_by_id: int
):
    """Create a new relationship between a trainer and a member."""
    
    # Cascade validation:
    
    # 1. Verify role and existence of trainer
    trainer = user_repository.get(db, id=relationship_in.trainer_id)
    if not trainer or trainer.role != UserRole.TRAINER:
        raise HTTPException(status_code=400, detail="Invalid trainer")
    
    # 2. Verify role and existence of member
    member = user_repository.get(db, id=relationship_in.member_id)
    if not member or member.role != UserRole.MEMBER:
        raise HTTPException(status_code=400, detail="Invalid member")
    
    # 3. Check for duplicate relationship
    existing = trainer_member_repository.get_by_trainer_and_member(
        db, trainer_id=relationship_in.trainer_id, member_id=relationship_in.member_id
    )
    
    # Create relationship only if all validations pass
    # ...`}
            </pre>
          </div>
          
          {/* API asíncrona con WebSockets para chat en tiempo real */}
          <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md border border-[#293038]">
            <p className="text-[--violet-9] font-bold mb-2 text-sm">Asynchronous API with WebSockets for real-time chat</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`@router.websocket("/ws/{chat_room_id}")
async def websocket_endpoint(
    websocket: WebSocket, 
    chat_room_id: int,
    db: Session = Depends(get_db),
    current_user: Auth0User = Depends(get_current_user_ws)
):
    """WebSocket endpoint for real-time chat"""
    await connection_manager.connect(websocket, chat_room_id, current_user.id)
    
    try:
        # Verify access to the room
        if not await chat_service.user_has_access_to_room(...):
            await connection_manager.disconnect(...)
            return
            
        # Notify other users about the connection
        await connection_manager.broadcast_to_room(
            chat_room_id,
            {"type": "user_joined", "user_id": current_user.id, ...}
        )
        
        # Message listening loop
        while True:
            data = await websocket.receive_json()
            # Process and transmit message
            # ...
            
    except WebSocketDisconnect:
        # Handle disconnection
        # ...`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        <h3 className="text-[--violet-9] text-base sm:text-lg font-bold mb-2 sm:mb-3">Main Features</h3>
        <ul className="list-disc pl-5 text-[#9dabb8] space-y-1 sm:space-y-2 text-sm">
          <li><strong>Event management:</strong> Complete system for creation, scheduling and tracking of classes and activities.</li>
          <li><strong>Trainer-member relationships:</strong> Structure for assigning members to trainers and managing their relationships.</li>
          <li><strong>Real-time chat:</strong> Direct communication between users and specific chat rooms for events.</li>
          <li><strong>Participation control:</strong> Registration, confirmation and attendance tracking for events with waitlist support.</li>
          <li><strong>Auth0 authentication:</strong> Secure integration with external identity system for user management.</li>
        </ul>
      </div>
      <div className="mt-5 sm:mt-6">
        <h3 className="text-[--violet-9] text-base sm:text-lg font-bold mb-2 sm:mb-3">Advanced Techniques</h3>
        <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md">
          <ul className="list-disc pl-5 text-[#9dabb8] space-y-1 sm:space-y-2 text-sm">
            <li><strong>Asynchronous API:</strong> Use of async/await for non-blocking operations and better performance on concurrent endpoints.</li>
            <li><strong>Abstraction layers:</strong> Clear separation between repositories, services and controllers to maintain organized code.</li>
            <li><strong>Typed enumerations:</strong> Use of enum to ensure data integrity of states and prevent invalid values.</li>
            <li><strong>Multi-level validation:</strong> Cascade verification system to ensure relationships between entities are valid.</li>
            <li><strong>Relational models:</strong> Robust implementation of entity relationships using SQLAlchemy with cascade deletes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GymApiModule; 