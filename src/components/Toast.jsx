import { useEffect } from 'react';

function Toast({ mensaje, tipo, onCerrar }) {
  useEffect(() => {
    if (!mensaje) return;
    const timer = setTimeout(() => onCerrar(), 3000);
    return () => clearTimeout(timer);
  }, [mensaje]);

  if (!mensaje) return null;

  const borderColor = tipo === 'exito' ? '#B5883E' : '#dc3545';
  const emoji = tipo === 'exito' ? '✅' : '⚠️';

  return (
    <div className="wh-toast show" style={{ borderLeftColor: borderColor }}>
      {emoji} {mensaje}
    </div>
  );
}

export default Toast;
