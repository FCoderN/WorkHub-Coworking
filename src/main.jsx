import React from 'react'
import ReactDOM from 'react-dom/client'

// Bootstrap CSS + JS + Icons
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Estilos personalizados de WorkHub
import './App.css'

// Componente raíz
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
