import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {

  const [presupuesto, setPresupuesto] = useState( Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState( localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect( () => {
    if( Object.keys( gastoEditar ).length > 0){
      setModal(true); 
  
      setTimeout( () => {
        setAnimarModal(true);
      }, 500)
    }
  }, [ gastoEditar ]);

  //Guardar el presupuesto en el localStorage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto])

  //Obtener el presupuesto y saltarse la ventana principal
  useEffect( () => {
    const presupuestoLS = Number( localStorage.getItem('presupuesto') );

    if( presupuestoLS > 0){
      setIsValidPresupuesto(true);
    }
  }, [])

  useEffect( () => {
    if( filtro ) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro );
      setGastosFiltrados(gastosFiltrados);
    }
  },[filtro])

  //guardar los gastos
  useEffect( () => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  },[gastos])

  const handleNuevoGasto = () => {
    setModal(true); 
    setGastoEditar({});

    setTimeout( () => {
      setAnimarModal(true);
    }, 500)
  }
  

  const guardarGasto = (gasto) => { 

    if( gasto.id ) {
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos( gastosActualizados );
      setGastoEditar({});
    }else{
      //TODO: Nuevo gasto
      gasto.id = generarId();
      //Agregar una fecha de en el momento en el que se hizo el gasto
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal( false );

    setTimeout(() => {
      setModal( false );
    }, 500);
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id);

    setGastos( gastosActualizados );
  }

  return (
    <div className={ modal ? 'fijar' : ''}>
      <Header 
        gastos={ gastos }
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
      />

      { isValidPresupuesto && (
        <>
          <main>
            {/* Componente para filtrar los gastos */}
            <Filtros
              filtro={ filtro }
              setFiltro={ setFiltro }
            />
            {/* Pasaremos el arreglo de gastos al componente donde se mostrarán visualmente */}
            <ListadoGastos 
              gastos={ gastos }
              setGastoEditar={ setGastoEditar }
              eliminarGasto={ eliminarGasto }
              filtro={ filtro }
              gastosFiltrados={ gastosFiltrados }
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={ IconoNuevoGasto } 
              alt="Icono nuevo gasto" 
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      { modal && 
        <Modal 
          setModal={ setModal } 
          animarModal={ animarModal }
          setAnimarModal={ setAnimarModal }
          guardarGasto={ guardarGasto }
          gastoEditar={ gastoEditar }
          setGastoEditar={ setGastoEditar }
        />
      }
    </div>
  )

}

export default App
