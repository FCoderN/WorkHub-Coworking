import { useState, useEffect } from 'react';

import Navbar        from './components/Navbar.jsx';
import Hero          from './components/Hero.jsx';
import Espacios      from './components/Espacios.jsx';
import Servicios     from './components/Servicios.jsx';
import FormReserva   from './components/FormReserva.jsx';
import ListaReservas from './components/ListaReservas.jsx';
import Toast         from './components/Toast.jsx';
import Footer        from './components/Footer.jsx';

import { StorageService } from './services/StorageService.js';

function App() {
  // Estado principal: lista de reservas
  const [reservas, setReservas] = useState([]);

  // Estado del toast
  const [toast, setToast] = useState({ mensaje: '', tipo: '' });

  // Cargar reservas de localStorage al iniciar
  useEffect(() => {
    const datos = StorageService.obtenerReservas();
    setReservas(datos);
  }, []);

  // Cuando se crea una nueva reserva
  const handleReservaCreada = (nuevaReserva) => {
    setReservas(prev => [...prev, nuevaReserva]);
  };

  // Cuando se elimina una reserva
  const handleEliminar = (id) => {
    setReservas(prev => prev.filter(r => r.id !== id));
    setToast({ mensaje: 'Reserva eliminada.', tipo: 'exito' });
  };

  // Mostrar mensaje en el toast
  const handleMensaje = (mensaje, tipo) => {
    setToast({ mensaje, tipo });
  };

  return (
    <>
      <Navbar />
      <Hero />

      <main>
        <Espacios />
        <Servicios />
        <FormReserva
          reservas={reservas}
          onReservaCreada={handleReservaCreada}
          onMensaje={handleMensaje}
        />
        <ListaReservas
          reservas={reservas}
          onEliminar={handleEliminar}
        />
      </main>

      <Footer />

      <Toast
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast({ mensaje: '', tipo: '' })}
      />
    </>
  );
}

export default App;
