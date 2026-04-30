import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyBookings, cancelBooking } from '../services/bookingService';
import { useToast } from '../components/Toast';

const formatPrice = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);

const formatDate = (d) =>
  new Date(d + 'T12:00:00').toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

export default function MisReservas() {
  const { push } = useToast();
  const [bookings, setBookings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [cancelling, setCancelling] = useState(null);
  const [filter, setFilter]       = useState('all');

  const load = () => {
    setLoading(true);
    getMyBookings()
      .then(res => setBookings(res.data))
      .catch(() => push('Error al cargar reservas.', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleCancel = async (id) => {
    if (!confirm('¿Cancelar esta reserva?')) return;
    setCancelling(id);
    try {
      await cancelBooking(id);
      push('Reserva cancelada exitosamente.', 'success');
      load();
    } catch (err) {
      push(err.response?.data?.message || 'Error al cancelar.', 'error');
    } finally {
      setCancelling(null);
    }
  };

  const displayed = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="bookings-page">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
          <div>
            <p className="section-label mb-1">Panel de usuario</p>
            <h2 className="section-title">Mis <em>Reservas</em></h2>
          </div>
          <Link to="/reservar" className="btn-gold">
            <i className="bi bi-plus-circle me-2" />Nueva Reserva
          </Link>
        </div>

        {/* Filtros */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          {[['all','Todas'],['confirmed','Confirmadas'],['cancelled','Canceladas']].map(([val,label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              style={{
                padding: '.38rem 1rem', borderRadius: '20px', border: '1.5px solid',
                borderColor: filter === val ? 'var(--gold)' : 'rgba(255,255,255,.12)',
                background: filter === val ? 'rgba(181,136,62,.12)' : 'transparent',
                color: filter === val ? 'var(--gold)' : 'var(--text-muted)',
                fontSize: '.82rem', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border spinner-gold" /></div>
        ) : displayed.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-calendar-x" />
            <p>No hay reservas{filter !== 'all' ? ' en esta categoría' : ''}.</p>
            <Link to="/reservar" className="btn-gold mt-2" style={{ display: 'inline-block' }}>
              Hacer una reserva
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {displayed.map(b => (
              <BookingCard
                key={b._id}
                booking={b}
                onCancel={handleCancel}
                cancelling={cancelling === b._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BookingCard({ booking: b, onCancel, cancelling }) {
  const isConfirmed = b.status === 'confirmed';
  const isPast = new Date(b.date + 'T' + b.endTime) < new Date();

  return (
    <div className="booking-card d-flex gap-3 flex-wrap flex-sm-nowrap align-items-start">
      {b.space?.image && (
        <img src={b.space.image} alt={b.space?.name} />
      )}
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-1">
          <h6 className="mb-0 fw-bold" style={{ fontSize: '1rem' }}>{b.space?.name || 'Espacio'}</h6>
          <span className={`status-badge ${isConfirmed ? 'badge-confirmed' : 'badge-cancelled'}`}>
            {isConfirmed ? '✓ Confirmada' : '✗ Cancelada'}
          </span>
        </div>
        <div style={{ fontSize: '.83rem', color: 'var(--text-muted)', display: 'flex', flexWrap: 'wrap', gap: '.6rem', marginTop: '.3rem' }}>
          <span><i className="bi bi-calendar3 me-1" />{formatDate(b.date)}</span>
          <span><i className="bi bi-clock me-1" />{b.startTime} – {b.endTime}</span>
          <span style={{ color: 'var(--gold)', fontWeight: 600 }}>
            <i className="bi bi-currency-dollar me-1" />{formatPrice(b.totalPrice)}
          </span>
        </div>
        {b.notes && (
          <p style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginTop: '.4rem', marginBottom: 0 }}>
            <i className="bi bi-chat-text me-1" />{b.notes}
          </p>
        )}
      </div>
      {isConfirmed && !isPast && (
        <button
          onClick={() => onCancel(b._id)}
          disabled={cancelling}
          style={{
            background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)',
            color: '#ef4444', borderRadius: '6px', padding: '.35rem .85rem',
            fontSize: '.8rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0,
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          {cancelling ? <span className="spinner-border spinner-border-sm" /> : 'Cancelar'}
        </button>
      )}
    </div>
  );
}
