import React from 'react'
import { useState } from 'react'
import Mensaje from './Mensaje'

function NuevoPresupuesto({ presupuesto, setPresupuesto, setIsValidPresupuesto }) {

  const [mensaje, setMensaje] = useState('');

  // Función para validar el presupuesto
  const handlePresupuesto = (e) =>{
    e.preventDefault();

    if( !presupuesto || presupuesto < 0 ) {
      setMensaje('No es un presupuesto valido');

      return;
    }

    // Resetear el Mensaje
    setMensaje('');

    //En caso de que el presupuesto sea valido entonces cambiaremos el valor a true
    setIsValidPresupuesto(true);  


  }


  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={ handlePresupuesto } className='formulario'>

        <div className='campo'>
            <label htmlFor="">Definir Presupuesto</label>

            <input
              className='nuevo-presupuesto' 
              type="number"
              placeholder='Añade tu presupuesto' 
              value={presupuesto}
              onChange={ (e) => setPresupuesto( Number(e.target.value) ) }
            />
        </div>

        <input type="submit" value="Añadir" />

        { mensaje && <Mensaje tipo="error" >{mensaje}</Mensaje>}
        
      </form>
    </div>
  )
}

export default NuevoPresupuesto
