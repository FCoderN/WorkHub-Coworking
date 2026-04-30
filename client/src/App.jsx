import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home       from './pages/Home';
import Reservar   from './pages/Reservar';
import MisReservas from './pages/MisReservas';
import Login      from './pages/Login';
import Register   from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Navbar />
          <main>
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/reservar"    element={<Reservar />} />
              <Route path="/login"       element={<Login />} />
              <Route path="/register"    element={<Register />} />
              <Route path="/mis-reservas" element={
                <ProtectedRoute><MisReservas /></ProtectedRoute>
              } />
              <Route path="*" element={
                <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <h2 style={{ fontFamily: 'Playfair Display', fontSize: '4rem', color: 'var(--gold)' }}>404</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Página no encontrada</p>
                  <a href="/" className="btn-gold mt-3" style={{ display: 'inline-block' }}>Volver al inicio</a>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
