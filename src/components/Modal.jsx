import { React, useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import BtnCerrar from '../img/cerrar.svg' 

function Modal({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) {

  const [mensaje, setMensaje] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [id, setId] = useState('');

  //Se va ejecutar cuando el componente este listo
  useEffect( () => {
    //Si el objeto trae algo entonces estamos editando
    if( Object.keys(gastoEditar).length > 0 ){
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId( gastoEditar.id );
      setFecha(gastoEditar.fecha);
    }
  }, [])


  const ocultarModal= () => {
    setAnimarModal(false);
    //Regresar el gastoEditar a un objeto vacio
    setGastoEditar({});
    //Que despues de medio segundo se cierre el modal
    setTimeout( () => {
        setModal(false);
    },500);
  }

  //Función para enviar el formulario al darle click al boton de enviar
  const handleSubmit = (e) => {
    e.preventDefault();

    //Validar que todos los campos tenga un valor
    if([ nombre, cantidad, categoria ].includes('')){
      setMensaje('Todos los campos son obligatorios');

      //Quitar el mensaje de error despues de 1s
      setTimeout(() => {
        setMensaje('');
      }, 2000);
      return;
    }

    //En caso de que pasemos la validación se va guardar el gasto en esta función que viene del App.jsx
    guardarGasto({nombre, cantidad, categoria, id, fecha });

  }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img 
                src={ BtnCerrar } 
                alt="Cerrar Modal"
                onClick={ ocultarModal }
            />
        </div>

        <form 
          onSubmit={ handleSubmit }
          className={`formulario ${ animarModal ? "animar" : 'cerrar'}`}
        >
            <legend>{ gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto" }</legend>
            { mensaje && <Mensaje tipo="error">{ mensaje }</Mensaje> }

            <div className='campo'>
              <label htmlFor="nombre">Nombre Gasto</label>

              <input 
                id='nombre'
                type="text" 
                placeholder='Añade el Nombre del Gasto'
                value={ nombre }
                onChange={ e => setNombre( e.target.value ) }
              />
            </div>

            <div className='campo'>
              <label htmlFor="cantidad">Cantidad</label>

              <input 
                id='cantidad'
                type="number" 
                placeholder='Añade la Cantidad del Gasto: ej. 300'
                value={ cantidad }
                onChange={ e => setCantidad( Number(e.target.value) ) }
              />
            </div>

            <div className='campo'>
              <label htmlFor="categoria">Categoría</label>

              <select id="categoria" value={ categoria } onChange={ e => setCategoria( e.target.value ) } >
                <option value="">-- Seleccione --</option>
                <option value="ahorro">Ahorro</option>
                <option value="comida">Comida</option>
                <option value="gastos">Gastos Varios</option>
                <option value="ocio">Ocio</option>
                <option value="salud">Salud</option>
                <option value="suscripciones">Suscripciones</option>
              </select>
            </div>

            <input type="submit" value={ gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto' } />
        </form>
    </div>
  )
}

export default Modal
