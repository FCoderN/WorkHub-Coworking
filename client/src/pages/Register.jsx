import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export default function Register() {
  const { login } = useAuth();
  const { push }  = useToast();
  const navigate  = useNavigate();

  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { push('Las contraseñas no coinciden.', 'error'); return; }
    if (form.password.length < 6) { push('La contraseña debe tener al menos 6 caracteres.', 'error'); return; }
    setLoading(true);
    try {
      const res = await registerService({ name: form.name, email: form.email, password: form.password });
      login(res.data.token, res.data.user);
      push(`¡Bienvenido a WorkHub, ${res.data.user.name.split(' ')[0]}!`, 'success');
      navigate('/');
    } catch (err) {
      push(err.response?.data?.message || 'Error al registrarse.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const strength = form.password.length === 0 ? 0
    : form.password.length < 6 ? 1
    : form.password.length < 10 ? 2 : 3;
  const strengthColor = ['','#ef4444','#f59e0b','#22c55e'][strength];
  const strengthLabel = ['','Débil','Media','Fuerte'][strength];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'var(--dark-mid)', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-5">
            <div className="text-center mb-4">
              <p className="section-label">Únete</p>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Crear <em>Cuenta</em></h2>
            </div>
            <div className="wh-card">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    required
                    autoFocus
                  />
                </div>
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
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Contraseña</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPwd ? 'text' : 'password'}
                      className="form-control"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Mínimo 6 caracteres"
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
                {form.password && (
                  <div className="mb-3" style={{ fontSize: '.75rem' }}>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,.1)', borderRadius: '2px', marginBottom: '.3rem' }}>
                      <div style={{ width: `${(strength / 3) * 100}%`, height: '100%', background: strengthColor, borderRadius: '2px', transition: 'all .3s' }} />
                    </div>
                    <span style={{ color: strengthColor }}>{strengthLabel}</span>
                  </div>
                )}
                <div className="mb-4">
                  <label className="form-label">Confirmar contraseña</label>
                  <input
                    type={showPwd ? 'text' : 'password'}
                    className="form-control"
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    required
                    style={{ borderColor: form.confirm && form.confirm !== form.password ? '#ef4444' : undefined }}
                  />
                  {form.confirm && form.confirm !== form.password && (
                    <small style={{ color: '#ef4444' }}>Las contraseñas no coinciden</small>
                  )}
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading
                    ? <><span className="spinner-border spinner-border-sm me-2" />Creando cuenta...</>
                    : <><i className="bi bi-person-plus me-2" />Crear Cuenta</>
                  }
                </button>
              </form>

              <p className="text-center mt-4 mb-0" style={{ fontSize: '.875rem', color: 'var(--text-muted)' }}>
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" style={{ color: 'var(--gold)', fontWeight: 600 }}>
                  Iniciar Sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
