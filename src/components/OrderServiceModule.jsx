import React from 'react';

const OrderServiceModule = () => {
  return (
    <div className="bg-[#161B22] rounded-xl p-4 sm:p-6 shadow-md border border-[#293038] overflow-hidden">
      <div className="bg-[#0D1117] px-4 sm:px-6 py-3 -mx-4 sm:-mx-6 mb-4 sm:mb-6 border-b border-[#293038]">
        <p className="text-white text-base sm:text-lg font-medium">Order Service</p>
      </div>
      <p className="text-[#9dabb8] text-sm mb-4">
        Este servicio implementa la gestión de productos y pedidos con manejo inteligente de transacciones,
        validación de datos y procesamiento CSV para importación masiva.
      </p>

      <div className="mt-6 sm:mt-8">
        <h3 className="text-[#E3B341] text-base sm:text-lg font-bold mb-3">⭐ Código Destacado</h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          
          {/* Procesamiento inteligente de archivos CSV */}
          <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md border border-[#293038]">
            <p className="text-[#3B82F6] font-bold mb-2 text-sm">Procesamiento inteligente de archivos CSV</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`def process_order_csv(self, user_email: int, csv_file: UploadFile = File(...)) -> JSONResponse:
    """Procesa un archivo CSV para importar múltiples pedidos de forma masiva"""
    # Validación de archivo
    if not csv_file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Invalid file type, only CSV files are accepted.")

    # Crear orden base
    order = self.create_order(user_email)
    
    # Procesamiento de contenido CSV
    try:
        content = StringIO(csv_file.file.read().decode('utf-8'))
        reader = csv.DictReader(content)
        
        # Procesamiento de filas adaptándose a diferentes formatos CSV
        for row in reader:
            # Extracción inteligente de datos según el formato
            quantity = int(row.get('Quantity', row.get("QTY", 0)))
            product_id = str(row.get('Distribution #', row.get("Customer #", "")))
            
            # Cálculos de precio y subtotal
            # ...
            
            # Creación del item de orden
            # ...
            
    except Exception as e:
        # Manejo de errores
        
    # Confirmar transacción    
    self.db_session.commit()
    return JSONResponse(content=order.id, status_code=201)`}
            </pre>
          </div>
          
          {/* Transacciones anidadas con manejo de errores */}
          <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md border border-[#293038]">
            <p className="text-[#3B82F6] font-bold mb-2 text-sm">Transacciones anidadas con manejo de errores</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`def update_bulk_products(self, product_price_list: List[ProductPrice]) -> JSONResponse:
    """Actualiza precios de múltiples productos en una sola transacción"""
    success_count = 0
    error_count = 0
    errors = []
    
    # Transacción principal
    try:
        for item in product_price_list:
            try:
                # Subtransacción para cada producto con rollback independiente
                with self.db_session.begin_nested():
                    # Obtener producto con bloqueo
                    product = self.db_session.query(ProductModel).with_for_update().first()
                    
                    # Auditoría y actualización
                    # ...
                    
                    success_count += 1
                    
            except Exception as e:
                # Capturar error pero continuar con otros productos
                error_count += 1
                # ...
                
        # Confirmar transacciones exitosas
        self.db_session.commit()
        
        return JSONResponse(
            content={
                "success_count": success_count,
                "error_count": error_count,
                "errors": errors
            },
            status_code=200 if success_count > 0 else 500
        )
        
    except SQLAlchemyError as e:
        # Rollback completo en caso de error general
        self.db_session.rollback()
        # ...`}
            </pre>
          </div>
          
          {/* Sistema inteligente de búsqueda y filtrado */}
          <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md border border-[#293038]">
            <p className="text-[#3B82F6] font-bold mb-2 text-sm">Sistema inteligente de búsqueda y filtrado</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`def search_orders(
    self, 
    search_term: Optional[str] = None,
    status: Optional[str] = None,
    min_total: Optional[float] = None,
    max_total: Optional[float] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    limit: int = 100,
    offset: int = 0
) -> Dict:
    """Búsqueda avanzada de pedidos con múltiples criterios y paginación"""
    # Consulta base
    query = self.db_session.query(OrderModel)
    
    # Búsqueda en múltiples campos relacionados
    if search_term:
        query = query.join(OrderModel.user).filter(
            or_(
                OrderModel.id.cast(String).ilike(f"%{search_term}%"),
                UserModel.email.ilike(f"%{search_term}%"),
                # Más campos de búsqueda...
            )
        )
    
    # Aplicación dinámica de filtros adicionales
    # Filtrado por estado, rango de precios, fechas, etc.
    
    # Conteo para paginación y ejecución de consulta
    # ...
    
    # Transformación de resultados
    # ...
    
    return {
        "data": result,
        "pagination": {
            "total": total_count,
            "limit": limit,
            "offset": offset,
            "has_more": total_count > (offset + limit)
        }
    }`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        <h3 className="text-[#3B82F6] text-base sm:text-lg font-bold mb-2 sm:mb-3">Funcionalidades Principales</h3>
        <ul className="list-disc pl-5 text-[#9dabb8] space-y-1 sm:space-y-2 text-sm">
          <li><strong>Gestión de inventario:</strong> Sistema completo para gestionar productos con actualizaciones en tiempo real.</li>
          <li><strong>Procesamiento de pedidos:</strong> Creación, modificación y seguimiento de pedidos con cálculos automáticos.</li>
          <li><strong>Importación masiva:</strong> Soporte para procesamiento de archivos CSV con detección automática de formato.</li>
          <li><strong>Transacciones seguras:</strong> Sistema de transacciones anidadas con manejo de errores y rollback automático.</li>
          <li><strong>API RESTful:</strong> Endpoints documentados para integración con sistemas externos y frontends.</li>
        </ul>
      </div>
      <div className="mt-5 sm:mt-6">
        <h3 className="text-[#3B82F6] text-base sm:text-lg font-bold mb-2 sm:mb-3">Técnicas Avanzadas</h3>
        <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md">
          <ul className="list-disc pl-5 text-[#9dabb8] space-y-1 sm:space-y-2 text-sm">
            <li><strong>Adaptación de datos:</strong> Sistema flexible para adaptarse a diferentes formatos de entrada de datos.</li>
            <li><strong>Transacciones anidadas:</strong> Uso de subtransacciones para mantener consistencia incluso en operaciones parcialmente fallidas.</li>
            <li><strong>Validación multinivel:</strong> Verificación de datos en múltiples niveles para garantizar integridad.</li>
            <li><strong>Control de concurrencia:</strong> Bloqueo optimista y pesimista para operaciones críticas que afectan al inventario.</li>
            <li><strong>Auditoría automática:</strong> Registro histórico de cambios para seguimiento y cumplimiento normativo.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderServiceModule; 