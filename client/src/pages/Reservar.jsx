import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { getSpaces } from '../services/spaceService';
import { createBooking, checkAvailability } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const formatPrice = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);

export default function Reservar() {
  const { isAuth, user } = useAuth();
  const { push }         = useToast();
  const navigate         = useNavigate();
  const [params]         = useSearchParams();

  const [spaces, setSpaces]     = useState([]);
  const [loading, setLoading]   = useState(false);
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState(null);

  const [form, setForm] = useState({
    spaceId:   params.get('space') || '',
    date:      '',
    startTime: '08:00',
    endTime:   '09:00',
    notes:     '',
  });

  useEffect(() => {
    getSpaces().then(res => setSpaces(res.data)).catch(console.error);
  }, []);

  const selectedSpace = spaces.find(s => s._id === form.spaceId);

  const hours = (() => {
    if (!form.startTime || !form.endTime) return 0;
    const [sh, sm] = form.startTime.split(':').map(Number);
    const [eh, em] = form.endTime.split(':').map(Number);
    return ((eh * 60 + em) - (sh * 60 + sm)) / 60;
  })();

  const totalPrice = selectedSpace ? hours * selectedSpace.pricePerHour : 0;

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setAvailable(null);
  };

  const handleCheck = async () => {
    if (!form.spaceId || !form.date || !form.startTime || !form.endTime) {
      push('Completa espacio, fecha y horario para verificar.', 'info');
      return;
    }
    setChecking(true);
    try {
      const res = await checkAvailability({
        spaceId: form.spaceId, date: form.date,
        startTime: form.startTime, endTime: form.endTime,
      });
      setAvailable(res.data.available);
    } catch {
      push('Error al verificar disponibilidad.', 'error');
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuth) { navigate('/login', { state: { from: '/reservar' } }); return; }
    if (hours <= 0) { push('El horario de fin debe ser posterior al de inicio.', 'error'); return; }
    setLoading(true);
    try {
      await createBooking(form);
      push('¡Reserva confirmada exitosamente!', 'success');
      navigate('/mis-reservas');
    } catch (err) {
      push(err.response?.data?.message || 'Error al crear la reserva.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="form-section" style={{ minHeight: '100vh' }}>
      <div className="page-header">
        <div className="container text-center">
          <p className="section-label">WorkHub CoWorking</p>
          <h1 className="section-title">Reserva tu <em>Espacio</em></h1>
          <div className="divider mx-auto" />
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center g-4">
          {/* Formulario */}
          <div className="col-lg-6">
            <div className="wh-card">
              <h4 className="mb-4" style={{ fontFamily: 'Playfair Display', fontWeight: 700 }}>
                Datos de la Reserva
              </h4>
              <form onSubmit={handleSubmit}>
                {/* Espacio */}
                <div className="mb-3">
                  <label className="form-label">Espacio *</label>
                  <select
                    className="form-select"
                    name="spaceId"
                    value={form.spaceId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Selecciona un espacio --</option>
                    {spaces.map(s => (
                      <option key={s._id} value={s._id}>{s.name} — {formatPrice(s.pricePerHour)}/hr</option>
                    ))}
                  </select>
                </div>

                {/* Fecha */}
                <div className="mb-3">
                  <label className="form-label">Fecha *</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={form.date}
                    min={today}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label className="form-label">Hora de inicio *</label>
                    <input
                      type="time"
                      className="form-control"
                      name="startTime"
                      value={form.startTime}
                      min="08:00" max="17:00"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Hora de fin *</label>
                    <input
                      type="time"
                      className="form-control"
                      name="endTime"
                      value={form.endTime}
                      min="09:00" max="18:00"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Notas */}
                <div className="mb-4">
                  <label className="form-label">Notas adicionales</label>
                  <textarea
                    className="form-control"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Requerimientos especiales, configuración, etc."
                  />
                </div>

                {/* Verificar disponibilidad */}
                <button
                  type="button"
                  className="btn-outline-gold w-100 mb-3"
                  onClick={handleCheck}
                  disabled={checking}
                >
                  {checking
                    ? <><span className="spinner-border spinner-border-sm me-2" />Verificando...</>
                    : <><i className="bi bi-search me-2" />Verificar disponibilidad</>
                  }
                </button>

                {available !== null && (
                  <div
                    className={`alert mb-3 py-2 text-center ${available ? 'alert-success' : 'alert-danger'}`}
                    style={{ background: available ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.1)', border: `1px solid ${available ? 'rgba(34,197,94,.3)' : 'rgba(239,68,68,.3)'}`, color: available ? '#22c55e' : '#ef4444', borderRadius: '8px' }}
                  >
                    {available
                      ? <><i className="bi bi-check-circle me-2" />¡El horario está disponible!</>
                      : <><i className="bi bi-x-circle me-2" />El horario no está disponible.</>
                    }
                  </div>
                )}

                {!isAuth && (
                  <div className="mb-3 text-center" style={{ fontSize: '.87rem', color: 'var(--text-muted)' }}>
                    <i className="bi bi-info-circle me-1" />
                    Debes <Link to="/login" style={{ color: 'var(--gold)' }}>iniciar sesión</Link> para confirmar la reserva.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading || (available === false)}
                >
                  {loading
                    ? <><span className="spinner-border spinner-border-sm me-2" />Procesando...</>
                    : <><i className="bi bi-calendar-check me-2" />Confirmar Reserva</>
                  }
                </button>
              </form>
            </div>
          </div>

          {/* Resumen */}
          <div className="col-lg-4">
            <div className="wh-card" style={{ position: 'sticky', top: '100px' }}>
              <h5 className="mb-3" style={{ fontFamily: 'Playfair Display' }}>Resumen</h5>
              {selectedSpace ? (
                <>
                  <img
                    src={selectedSpace.image}
                    alt={selectedSpace.name}
                    style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }}
                  />
                  <h6 className="fw-bold mb-1">{selectedSpace.name}</h6>
                  <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <i className="bi bi-people me-1" />{selectedSpace.capacity} persona{selectedSpace.capacity > 1 ? 's' : ''}
                    &nbsp;·&nbsp;
                    <i className="bi bi-clock me-1" />{selectedSpace.openTime}–{selectedSpace.closeTime}
                  </p>
                  <hr style={{ borderColor: 'var(--border)' }} />
                  <div style={{ fontSize: '.88rem', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                    <div className="d-flex justify-content-between">
                      <span style={{ color: 'var(--text-muted)' }}>Fecha</span>
                      <span>{form.date || '—'}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span style={{ color: 'var(--text-muted)' }}>Horario</span>
                      <span>{form.startTime} – {form.endTime}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span style={{ color: 'var(--text-muted)' }}>Duración</span>
                      <span>{hours > 0 ? `${hours}h` : '—'}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span style={{ color: 'var(--text-muted)' }}>Precio/hora</span>
                      <span>{formatPrice(selectedSpace.pricePerHour)}</span>
                    </div>
                  </div>
                  <hr style={{ borderColor: 'var(--border)' }} />
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Total</span>
                    <span style={{ color: 'var(--gold)', fontSize: '1.3rem', fontWeight: 700 }}>
                      {totalPrice > 0 ? formatPrice(totalPrice) : '—'}
                    </span>
                  </div>
                </>
              ) : (
                <div className="empty-state" style={{ padding: '2rem 0' }}>
                  <i className="bi bi-building" />
                  <p style={{ fontSize: '.88rem' }}>Selecciona un espacio para ver el resumen.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
