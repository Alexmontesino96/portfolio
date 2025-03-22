import React from 'react';

const BalanceServiceModule = () => {
  return (
    <div className="bg-[#161B22] rounded-xl p-4 sm:p-6 shadow-md border border-[#293038] overflow-hidden">
      <div className="bg-[#0D1117] px-4 sm:px-6 py-3 -mx-4 sm:-mx-6 mb-4 sm:mb-6 border-b border-[#293038]">
        <p className="text-white text-base sm:text-lg font-medium">Balance Service</p>
      </div>
      <p className="text-[#9dabb8] text-sm mb-4">
        Servicio especializado para la gestión de balances financieros familiares con algoritmos de neteo de deudas,
        detección de anomalías y procesamiento seguro de pagos entre miembros.
      </p>

      <div className="mt-6 sm:mt-8">
        <h3 className="text-[--violet-9] text-base sm:text-lg font-bold mb-3">⭐ Código Destacado</h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          
          {/* Algoritmo de neteo de deudas mutuas */}
          <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md border border-[#293038]">
            <p className="text-[--violet-9] font-bold mb-2 text-sm">Algoritmo de neteo de deudas mutuas</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`def optimize_debts(self, family_id: int) -> Dict[str, Any]:
    """
    Optimiza las deudas entre miembros para minimizar transacciones
    usando un algoritmo de flujo de red.
    """
    # Calcular balances actuales
    balances = self._calculate_raw_balances(family_id)
    
    # Clasificar miembros como deudores o acreedores
    debtors = [(id, -balance["net_balance"]) 
              for id, balance in balances.items() 
              if balance["net_balance"] < 0]
    
    creditors = [(id, balance["net_balance"]) 
                for id, balance in balances.items() 
                if balance["net_balance"] > 0]
    
    # Algoritmo de optimización de flujo
    # ...
    
    # Resultado con transacciones optimizadas
    return {
        "transactions": readable_transactions,
        "total_transactions": len(readable_transactions)
    }`}
            </pre>
          </div>
          
          {/* Verificación de consistencia de balances */}
          <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md border border-[#293038]">
            <p className="text-[--violet-9] font-bold mb-2 text-sm">Verificación de consistencia de balances</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`def verify_balance_consistency(self, family_id: int, debug_mode: bool = False) -> Dict[str, Any]:
    """
    Verifica la consistencia interna de los balances familiares.
    
    Comprueba:
    1. Suma de balances netos = cero
    2. Pagos registrados con contrapartes correctas
    3. Distribución adecuada de gastos compartidos
    """
    # Obtener balances actuales
    balances = self._calculate_raw_balances(family_id)
    
    # Verificar suma total (debe ser cero)
    total_net_balance = sum(balance["net_balance"] for balance in balances.values())
    
    # Verificar pagos registrados y su consistencia
    # ...
    
    # Verificar gastos compartidos
    # ...
    
    return {
        "is_consistent": len(inconsistent_payments) == 0 and len(inconsistent_expenses) == 0,
        "total_net_balance": round(total_net_balance, 2),
        "inconsistencies": [...] # Detalle de problemas encontrados
    }`}
            </pre>
          </div>
          
          {/* Detección avanzada de pagos duplicados */}
          <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md border border-[#293038]">
            <p className="text-[--violet-9] font-bold mb-2 text-sm">Detección avanzada de pagos duplicados</p>
            <pre className="overflow-x-auto text-[#9dabb8] text-xs">
{`def detect_duplicate_payments(self, family_id: int, threshold_minutes: int = 10, 
                         threshold_percentage: float = 5.0) -> List[Dict[str, Any]]:
    """
    Detecta posibles pagos duplicados basados en proximidad temporal
    y similitud de montos.
    """
    # Obtener historial de pagos
    payments = self.payment_repository.get_all_by_family(
        self.db, family_id=family_id
    )
    
    # Agrupar pagos por pares de miembros
    member_pair_payments = {}
    
    # Analizar cada grupo para detectar posibles duplicados usando:
    # - Proximidad temporal (dentro de threshold_minutes)
    # - Similitud de monto (dentro de threshold_percentage)
    
    # Retornar grupos de potenciales duplicados 
    # con información para revisión humana
    return potential_duplicates`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        <h3 className="text-[--violet-9] text-base sm:text-lg font-bold mb-2 sm:mb-3">Funcionalidades Principales</h3>
        <ul className="list-disc pl-5 text-[#9dabb8] space-y-1 sm:space-y-2 text-sm">
          <li><strong>Cálculo de balances:</strong> Sistema para determinar saldos entre miembros de una familia.</li>
          <li><strong>Optimización de deudas:</strong> Algoritmo para minimizar el número de transacciones necesarias para saldar deudas.</li>
          <li><strong>Verificación de consistencia:</strong> Mecanismos para asegurar la integridad de los datos financieros.</li>
          <li><strong>Detección de duplicados:</strong> Identificación inteligente de posibles pagos duplicados por error.</li>
          <li><strong>Diagnóstico financiero:</strong> Herramientas avanzadas para analizar la salud financiera familiar.</li>
        </ul>
      </div>
      <div className="mt-5 sm:mt-6">
        <h3 className="text-[--violet-9] text-base sm:text-lg font-bold mb-2 sm:mb-3">Conceptos Técnicos</h3>
        <div className="bg-[#0D1117] p-3 sm:p-4 rounded-md">
          <ul className="list-disc pl-5 text-[#9dabb8] space-y-1 sm:space-y-2 text-sm">
            <li><strong>Algoritmos de grafos:</strong> Técnicas de flujo de red para optimizar transacciones financieras entre múltiples partes.</li>
            <li><strong>Verificación multinivel:</strong> Sistema en capas para detectar inconsistencias en diferentes niveles de los datos.</li>
            <li><strong>Análisis temporal:</strong> Procesamiento basado en patrones temporales para identificar anomalías en transacciones.</li>
            <li><strong>Balance cero:</strong> Principio matemático que asegura que la suma de todos los balances en un sistema cerrado es cero.</li>
            <li><strong>Tolerancia a errores:</strong> Mecanismos para manejar errores de redondeo y aproximación en cálculos financieros.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BalanceServiceModule; 