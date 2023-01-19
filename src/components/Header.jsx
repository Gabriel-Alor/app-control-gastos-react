import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

function Header({ presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos }) {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      { isValidPresupuesto ? (
        //llamamos el componente control presupuesto
        <ControlPresupuesto
          gastos={ gastos }
          presupuesto={presupuesto}
          setGastos={setGastos}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      ) : (
        // Llamamos el componente presupuesto
        <NuevoPresupuesto 
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}
      
    </header>
  )
}

export default Header
