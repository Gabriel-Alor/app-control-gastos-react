import {React, useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function ControlPresupuesto({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) {

    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

   //UseEffect que se va quedar escuchando por los cambios que sucedan en gastos
   useEffect( () => {
    //sumando lo que se va gastando
    const totalGastado = gastos.reduce( ( total, gasto ) => gasto.cantidad + total, 0 );
    //Calcular lo que queda de disponible
    const totalDisponible = presupuesto - totalGastado;

    //Calcular el porcentaje gastado
    const nuevoPorcentaje = (( ( presupuesto - totalDisponible ) / presupuesto ) * 100).toFixed(2);

    setTimeout(() => {
        setPorcentaje(nuevoPorcentaje);
    }, 1000);

    //Asignar los valores
    setGastado(totalGastado);
    setDisponible(totalDisponible);

   }, [ gastos ]); 

  //Función para formatear cantidad para que aparezca en formato de dinero
  const formatearCantidad = ( cantidad ) => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
  }

  //Resetear la App con un boton de resetear
  const handleResetApp = () => {
    const resultado = confirm('¿Deseas reinciar presupuesto y gastos?');

    if(resultado){
        setGastos([]);
        setPresupuesto([]);
        setIsValidPresupuesto(false);
    }
  }

  return ( 
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            {/* Importar el componente de la gráfica */}
            <CircularProgressbar 
            // Cambiar los estilos de la gráfica
                styles={ buildStyles({
                    //color de la linea que se va llenando
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    //color del contenedor de la linea
                    trailColor: '#F5F5F5',
                    //Color del texto del centro de la gráfica
                    textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                })}
                value={ porcentaje }
                //Poner texto en el centro de la gráfica
                text={`${porcentaje}% Gastado`}
            />
        </div>

        <div className='contenido-presupuesto'>
            <button
                className='reset-app'
                type='button'
                onClick={ handleResetApp }
            >
                ResetearApp
            </button>
            <p>
                <span>Presupuesto: </span> { formatearCantidad(presupuesto) }
            </p>
            {/* ------ */}
            <p className={`${disponible < 0 ? 'negativo' : ''}`} >
                <span>Disponible: </span> { formatearCantidad( disponible ) }
            </p>
            {/* ------ */}
            <p>
                <span>Gastado: </span> { formatearCantidad( gastado ) }
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto
