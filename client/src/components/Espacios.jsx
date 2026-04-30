import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getSpaces } from '../services/spaceService';

const formatPrice = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);

const typeLabel = { escritorio: 'Individual', reunion: 'Reuniones', oficina: 'Privada' };

export default function Espacios() {
  const [spaces, setSpaces]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [filters, setFilters] = useState({ type: '', maxPrice: '' });
  const trackRef = useRef(null);

  useEffect(() => {
    getSpaces(filters.type ? { type: filters.type } : {})
      .then(res => { setSpaces(res.data); setCurrent(0); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filters]);

  const prev = () => setCurrent(c => (c - 1 + spaces.length) % spaces.length);
  const next = () => setCurrent(c => (c + 1) % spaces.length);

  const filtered = filters.maxPrice
    ? spaces.filter(s => s.pricePerHour <= Number(filters.maxPrice))
    : spaces;

  return (
    <section id="espacios" className="section" style={{ background: 'var(--dark-mid)' }}>
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-5 mx-auto text-center">
            <p className="section-label">Nuestras Salas</p>
            <h2 className="section-title">Espacios <em>diseñados</em><br />para ti</h2>
            <div className="divider mx-auto" />
          </div>
        </div>

        {/* Filtros */}
        <div className="filter-bar mb-4">
          <div>
            <label>Tipo de espacio</label>
            <select
              className="filter-select"
              value={filters.type}
              onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
            >
              <option value="">Todos</option>
              <option value="escritorio">Escritorio Individual</option>
              <option value="reunion">Sala de Reuniones</option>
              <option value="oficina">Oficina Privada</option>
            </select>
          </div>
          <div>
            <label>Precio máximo / hora</label>
            <select
              className="filter-select"
              value={filters.maxPrice}
              onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))}
            >
              <option value="">Sin límite</option>
              <option value="5000">$5.000</option>
              <option value="10000">$10.000</option>
              <option value="20000">$20.000</option>
            </select>
          </div>
          {(filters.type || filters.maxPrice) && (
            <button
              className="btn-outline-gold"
              style={{ alignSelf: 'flex-end' }}
              onClick={() => setFilters({ type: '', maxPrice: '' })}
            >
              <i className="bi bi-x-circle me-1" /> Limpiar
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border spinner-gold" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-building-slash" />
            <p>No hay espacios con esos filtros.</p>
          </div>
        ) : (
          <>
            {/* Carrusel en mobile, grid en desktop */}
            <div className="d-none d-md-block">
              <div className="row g-4">
                {filtered.map(space => (
                  <div key={space._id} className="col-md-4">
                    <SpaceCard space={space} />
                  </div>
                ))}
              </div>
            </div>

            <div className="d-block d-md-none position-relative">
              <div className="carousel-container">
                <div
                  ref={trackRef}
                  className="carousel-track"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {filtered.map(space => (
                    <div key={space._id} className="carousel-slide">
                      <SpaceCard space={space} />
                    </div>
                  ))}
                </div>
              </div>
              {filtered.length > 1 && (
                <>
                  <button className="carousel-btn prev" onClick={prev}>
                    <i className="bi bi-chevron-left" />
                  </button>
                  <button className="carousel-btn next" onClick={next}>
                    <i className="bi bi-chevron-right" />
                  </button>
                  <div className="carousel-dots">
                    {filtered.map((_, i) => (
                      <button
                        key={i}
                        className={`carousel-dot${i === current ? ' active' : ''}`}
                        onClick={() => setCurrent(i)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function SpaceCard({ space }) {
  return (
    <div className="space-card">
      <div style={{ overflow: 'hidden' }}>
        <img src={space.image} alt={space.name} />
      </div>
      <div className="space-card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="space-badge">{typeLabel[space.type]}</span>
          <span className="space-card-text">
            <i className="bi bi-people me-1" />{space.capacity} persona{space.capacity > 1 ? 's' : ''}
          </span>
        </div>
        <h5 className="space-card-title">{space.name}</h5>
        <p className="space-card-text">{space.description}</p>
        <div className="mt-2 mb-3">
          {space.equipment.slice(0, 3).map((eq, i) => (
            <span key={i} className="equip-tag"><i className="bi bi-check2 me-1" />{eq}</span>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="space-price">{formatPrice(space.pricePerHour)}<span style={{ fontSize: '.75rem', color: 'var(--text-muted)', fontWeight: 400 }}> / hora</span></span>
          <Link
            to={`/reservar?space=${space._id}`}
            className="btn-gold"
            style={{ fontSize: '.82rem', padding: '.45rem 1rem' }}
          >
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}
