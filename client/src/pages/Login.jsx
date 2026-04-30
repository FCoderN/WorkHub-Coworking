import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login as loginService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export default function Login() {
  const { login } = useAuth();
  const { push }  = useToast();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from || '/';

  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginService(form);
      login(res.data.token, res.data.user);
      push(`¡Bienvenido de vuelta, ${res.data.user.name.split(' ')[0]}!`, 'success');
      navigate(from, { replace: true });
    } catch (err) {
      push(err.response?.data?.message || 'Credenciales incorrectas.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'var(--dark-mid)', paddingTop: '80px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-5">
            <div className="text-center mb-4">
              <p className="section-label">Acceso</p>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Iniciar <em>Sesión</em></h2>
            </div>
            <div className="wh-card">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@correo.com"
                    required
                    autoFocus
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Contraseña</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPwd ? 'text' : 'password'}
                      className="form-control"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      style={{ paddingRight: '2.8rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(v => !v)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}
                    >
                      <i className={`bi bi-eye${showPwd ? '-slash' : ''}`} />
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading
                    ? <><span className="spinner-border spinner-border-sm me-2" />Ingresando...</>
                    : <><i className="bi bi-box-arrow-in-right me-2" />Iniciar Sesión</>
                  }
                </button>
              </form>

              <p className="text-center mt-4 mb-0" style={{ fontSize: '.875rem', color: 'var(--text-muted)' }}>
                ¿No tienes cuenta?{' '}
                <Link to="/register" style={{ color: 'var(--gold)', fontWeight: 600 }}>
                  Regístrate gratis
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
