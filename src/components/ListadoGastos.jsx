import React from 'react'
import Gasto from './Gasto'

function ListadoGastos({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) {
  return (
    <div className='listado-gastos contenedor'>
      {/* Validar si hay algo en el filtro */}
      { filtro ? (
        <>
          <h2>{ gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos en esta Cateoría'}</h2>
          { gastosFiltrados.map( gasto => (
            <Gasto 
                key={ gasto.id }
                gasto={ gasto }
                setGastoEditar={ setGastoEditar }
                eliminarGasto={ eliminarGasto }
            />
          ))}
        </>
      ) : (
        <>
          <h2>{ gastos.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
          {gastos.map( gasto => (
            <Gasto 
                key={ gasto.id }
                gasto={ gasto }
                setGastoEditar={ setGastoEditar }
                eliminarGasto={ eliminarGasto }
            />
          ))}
        </>
      ) }
      {/* Se va recorrer los gastos para crear elementos */}
    </div>
  )
}

export default ListadoGastos
