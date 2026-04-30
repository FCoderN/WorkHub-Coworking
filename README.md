# WorkHub CoWorking — MERN Stack

Plataforma web completa para reserva de espacios de coworking. Construida con el stack **MERN** (MongoDB, Express, React, Node.js).

## Stack tecnológico

| Capa        | Tecnología                                      |
|-------------|-------------------------------------------------|
| Frontend    | React 18 + Vite + React Router DOM + Axios      |
| Backend     | Node.js + Express.js                            |
| Base de datos | MongoDB + Mongoose                            |
| Auth        | JWT (jsonwebtoken) + bcryptjs                   |
| Estilos     | Bootstrap 5 + CSS custom (Playfair Display + Outfit) |

## Estructura del proyecto

```
WorkHub-Coworking-main/
├── client/                        # Frontend React (Vite)
│   ├── public/
│   │   └── recursos/              # Imágenes de espacios
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── Espacios.jsx       # Carrusel + grid + filtros
│       │   ├── Servicios.jsx
│       │   ├── Footer.jsx
│       │   ├── Toast.jsx          # Sistema de notificaciones
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   └── AuthContext.jsx    # Estado global de autenticación
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Reservar.jsx       # Formulario + resumen + verificación
│       │   ├── MisReservas.jsx    # Historial y cancelación
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       ├── services/
│       │   ├── api.js             # Instancia Axios configurada
│       │   ├── authService.js
│       │   ├── spaceService.js
│       │   └── bookingService.js
│       ├── App.jsx
│       └── main.jsx
│
├── server/                        # Backend Express
│   ├── config/
│   │   └── db.js                  # Conexión MongoDB
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── spaceController.js
│   │   └── bookingController.js
│   ├── middleware/
│   │   ├── auth.js                # JWT protect + adminOnly
│   │   └── validate.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Space.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── spaces.js
│   │   └── bookings.js
│   ├── seeds/
│   │   └── seedSpaces.js          # Carga inicial de datos
│   ├── .env.example
│   └── index.js
│
├── package.json                   # Scripts raíz (concurrently)
└── README.md
```

## Instalación y puesta en marcha

### Requisitos previos

- **Node.js** v18 o superior
- **MongoDB** corriendo localmente (o Atlas URI)
- **npm** v9+

---

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/FCoderN/WorkHub-Coworking
cd WorkHub-Coworking-main

# Instala dependencias de root + server + client de una vez
npm run install:all
```

---

### 2. Variables de entorno

```bash
# Copia el ejemplo y edita los valores
cp server/.env.example server/.env
```

Edita `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/workhub
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

### 3. Seed inicial (carga los 3 espacios en MongoDB)

```bash
npm run seed
```

---

### 4. Iniciar en desarrollo

```bash
# Levanta servidor (puerto 5000) y cliente (puerto 5173) en paralelo
npm run dev
```

O por separado:

```bash
npm run server   # solo backend
npm run client   # solo frontend
```

Accede en: **http://localhost:5173**

---

## API REST

### Auth — `/api/auth`

| Método | Ruta         | Descripción              | Auth  |
|--------|--------------|--------------------------|-------|
| POST   | `/register`  | Registro de usuario      | No    |
| POST   | `/login`     | Login + JWT              | No    |
| GET    | `/me`        | Datos del usuario actual | Token |

### Spaces — `/api/spaces`

| Método | Ruta    | Descripción                             | Auth    |
|--------|---------|-----------------------------------------|---------|
| GET    | `/`     | Lista de espacios (filtros: type, maxPrice, capacity) | No |
| GET    | `/:id`  | Detalle de espacio                      | No      |
| POST   | `/`     | Crear espacio                           | Admin   |
| PUT    | `/:id`  | Actualizar espacio                      | Admin   |
| DELETE | `/:id`  | Desactivar espacio                      | Admin   |

### Bookings — `/api/bookings`

| Método | Ruta                | Descripción                             | Auth  |
|--------|---------------------|-----------------------------------------|-------|
| GET    | `/availability`     | Verificar disponibilidad de horario     | No    |
| POST   | `/`                 | Crear reserva (valida solapamiento)     | Token |
| GET    | `/mine`             | Reservas del usuario actual             | Token |
| PATCH  | `/:id/cancel`       | Cancelar reserva propia                 | Token |
| GET    | `/`                 | Todas las reservas (admin)              | Admin |

---

## Funcionalidades

- **Ver y filtrar espacios** por tipo y precio máximo
- **Reservar** con selección de fecha, hora inicio y fin
- **Verificar disponibilidad** en tiempo real antes de confirmar
- **Resumen de reserva** con cálculo de precio total
- **Historial** de reservas con filtros (todas / confirmadas / canceladas)
- **Cancelar reservas** activas
- **Autenticación JWT** con registro, login y sesión persistente
- **Rutas protegidas** — "Mis Reservas" requiere login
- **Notificaciones toast** para feedback del usuario
- **Diseño responsivo** fiel al original (Playfair Display + Outfit + paleta dorada)

---

## Paleta de colores

| Variable     | Hex       |
|--------------|-----------|
| Gold         | `#B5883E` |
| Gold Light   | `#D4A85A` |
| Dark         | `#141414` |
| Dark Mid     | `#1E1E1E` |
| Light Beige  | `#F2EFE9` |

---

## Licencia

MIT © 2026 WorkHub CoWorking
