import React, { useState } from 'react';
import { User, Calendar, CreditCard, Bell, Home, LogIn, Search, Dumbbell, CheckCircle } from 'lucide-react';

const GymManagementSystem = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Datos de clases disponibles
  const classes = [
    { id: 1, name: 'Yoga Matutino', instructor: 'María González', time: '07:00 AM', capacity: 20, enrolled: 15, specialty: 'Relajación' },
    { id: 2, name: 'CrossFit Intenso', instructor: 'Carlos Ruiz', time: '06:00 PM', capacity: 15, enrolled: 12, specialty: 'Alta Intensidad' },
    { id: 3, name: 'Spinning', instructor: 'Ana Torres', time: '08:00 AM', capacity: 25, enrolled: 20, specialty: 'Cardio' },
    { id: 4, name: 'Pilates', instructor: 'Laura Vega', time: '05:00 PM', capacity: 18, enrolled: 10, specialty: 'Flexibilidad' },
    { id: 5, name: 'Zumba', instructor: 'Pedro Sánchez', time: '07:00 PM', capacity: 30, enrolled: 25, specialty: 'Baile Fitness' },
    { id: 6, name: 'Entrenamiento Funcional', instructor: 'Roberto Díaz', time: '09:00 AM', capacity: 20, enrolled: 18, specialty: 'Fuerza' }
  ];

  // Planes de suscripción
  const plans = [
    { id: 1, name: 'Plan Mensual', price: 'S/ 150', duration: '1 mes', benefits: ['Acceso a todas las clases', 'Uso de equipos', 'Casillero personal'] },
    { id: 2, name: 'Plan Trimestral', price: 'S/ 400', duration: '3 meses', benefits: ['Acceso a todas las clases', 'Uso de equipos', 'Casillero personal', '10% descuento', 'Asesoría nutricional'] },
    { id: 3, name: 'Plan Semestral', price: 'S/ 720', duration: '6 meses', benefits: ['Acceso a todas las clases', 'Uso de equipos', 'Casillero personal', '20% descuento', 'Asesoría nutricional', 'Plan de entrenamiento personalizado'] },
    { id: 4, name: 'Plan Anual', price: 'S/ 1,200', duration: '12 meses', benefits: ['Acceso a todas las clases', 'Uso de equipos', 'Casillero personal', '33% descuento', 'Asesoría nutricional', 'Plan de entrenamiento personalizado', 'Evaluación física mensual'] }
  ];

  const handleLogin = (email, password) => {
    // Simulación de autenticación
    setUserData({
      name: 'Juan Pérez',
      email: email,
      subscription: 'Plan Mensual',
      expirationDate: '15/01/2026',
      reservedClasses: []
    });
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    showNotificationMessage('¡Bienvenido! Has iniciado sesión correctamente');
  };

  const handleRegister = (name, email, password) => {
    setUserData({
      name: name,
      email: email,
      subscription: null,
      expirationDate: null,
      reservedClasses: []
    });
    setIsLoggedIn(true);
    setCurrentView('plans');
    showNotificationMessage('¡Registro exitoso! Selecciona un plan para comenzar');
  };

  const handleReserveClass = (classItem) => {
    if (!userData.subscription) {
      showNotificationMessage('Debes tener una suscripción activa para reservar clases');
      return;
    }
    
    const updatedClasses = [...(userData.reservedClasses || []), classItem];
    setUserData({...userData, reservedClasses: updatedClasses});
    showNotificationMessage(`¡Reserva confirmada para ${classItem.name}!`);
  };

  const handleSubscribe = (plan) => {
    const expirationDate = new Date();
    const months = plan.duration.includes('mes') ? parseInt(plan.duration) : 12;
    expirationDate.setMonth(expirationDate.getMonth() + months);
    
    setUserData({
      ...userData, 
      subscription: plan.name,
      expirationDate: expirationDate.toLocaleDateString('es-PE')
    });
    setCurrentView('payment');
  };

  const handlePayment = (method) => {
    showNotificationMessage(`¡Pago procesado exitosamente con ${method}! Tu suscripción está activa`);
    setCurrentView('dashboard');
  };

  const showNotificationMessage = (message) => {
    setShowNotification(message);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Vista de inicio
  const HomeView = () => (
    <div className="space-y-8">
      <div className="hero">
        <h1 className="text-5xl font-bold text-white mb-4">Gimnasio Juan Pérez</h1>
        <p className="text-xl text-white mb-8">Tu mejor versión comienza aquí</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => setCurrentView('login')} className="btn-primary">
            Iniciar Sesión
          </button>
          <button onClick={() => setCurrentView('register')} className="btn-secondary">
            Registrarse
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="card">
          <Calendar className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Clases Variadas</h3>
          <p className="text-gray-600">Yoga, CrossFit, Spinning, Pilates y más. Encuentra la clase perfecta para ti.</p>
        </div>
        <div className="card">
          <User className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Instructores Certificados</h3>
          <p className="text-gray-600">Profesionales capacitados que te guiarán en cada entrenamiento.</p>
        </div>
        <div className="card">
          <Dumbbell className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Equipamiento Moderno</h3>
          <p className="text-gray-600">Instalaciones de primer nivel con tecnología de punta.</p>
        </div>
      </div>
    </div>
  );

  // Vista de login
  const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div className="max-w-md mx-auto">
        <div className="card">
          <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field" 
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field" 
                placeholder="••••••••"
              />
            </div>
            <button onClick={() => handleLogin(email, password)} className="btn-primary w-full">
              Ingresar
            </button>
            <p className="text-center text-sm">
              ¿No tienes cuenta? 
              <button onClick={() => setCurrentView('register')} className="text-purple-600 ml-2 font-semibold">
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Vista de registro
  const RegisterView = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div className="max-w-md mx-auto">
        <div className="card">
          <h2 className="text-3xl font-bold mb-6 text-center">Crear Cuenta</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre Completo</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field" 
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field" 
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field" 
                placeholder="••••••••"
              />
            </div>
            <button onClick={() => handleRegister(name, email, password)} className="btn-primary w-full">
              Registrarse
            </button>
            <p className="text-center text-sm">
              ¿Ya tienes cuenta? 
              <button onClick={() => setCurrentView('login')} className="text-purple-600 ml-2 font-semibold">
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard del usuario
  const DashboardView = () => (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <h2 className="text-3xl font-bold mb-2">Bienvenido, {userData.name}</h2>
        <p className="text-lg">Tu membresía está activa</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <User className="w-6 h-6" />
            Mi Suscripción
          </h3>
          <div className="space-y-2">
            <p><strong>Plan:</strong> {userData.subscription || 'Sin plan activo'}</p>
            <p><strong>Vencimiento:</strong> {userData.expirationDate || 'N/A'}</p>
            <button onClick={() => setCurrentView('plans')} className="btn-secondary mt-4">
              Renovar / Cambiar Plan
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Mis Clases Reservadas
          </h3>
          {userData.reservedClasses && userData.reservedClasses.length > 0 ? (
            <div className="space-y-2">
              {userData.reservedClasses.map((cls, idx) => (
                <div key={idx} className="p-3 bg-purple-50 rounded-lg">
                  <p className="font-semibold">{cls.name}</p>
                  <p className="text-sm text-gray-600">{cls.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No tienes clases reservadas</p>
          )}
          <button onClick={() => setCurrentView('classes')} className="btn-secondary mt-4">
            Reservar Clases
          </button>
        </div>
      </div>
    </div>
  );

  // Vista de clases
  const ClassesView = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Clases Disponibles</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {classes.map(cls => (
          <div key={cls.id} className="card hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{cls.name}</h3>
                <p className="text-purple-600 font-semibold">{cls.specialty}</p>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                {cls.time}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-gray-600">👨‍🏫 Instructor: {cls.instructor}</p>
              <p className="text-gray-600">
                👥 Cupos: {cls.enrolled}/{cls.capacity}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{width: `${(cls.enrolled/cls.capacity)*100}%`}}
                />
              </div>
            </div>
            <button 
              onClick={() => handleReserveClass(cls)}
              disabled={cls.enrolled >= cls.capacity}
              className={cls.enrolled >= cls.capacity ? 'btn-disabled' : 'btn-primary'}
            >
              {cls.enrolled >= cls.capacity ? 'Clase Llena' : 'Reservar Clase'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Vista de planes
  const PlansView = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Elige tu Plan</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className="card hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-4xl font-bold text-purple-600 mb-4">{plan.price}</p>
            <p className="text-gray-600 mb-4">{plan.duration}</p>
            <ul className="space-y-2 mb-6">
              {plan.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => handleSubscribe(plan)} className="btn-primary w-full">
              Seleccionar Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Vista de pago
  const PaymentView = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center">Procesar Pago</h2>
      
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Resumen de Compra</h3>
        <div className="space-y-2 mb-6">
          <p><strong>Plan seleccionado:</strong> {userData.subscription}</p>
          <p><strong>Usuario:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Método de Pago</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <button onClick={() => handlePayment('Yape')} className="payment-btn">
            <CreditCard className="w-8 h-8 mb-2" />
            <span className="font-bold">Yape</span>
          </button>
          <button onClick={() => handlePayment('Plin')} className="payment-btn">
            <CreditCard className="w-8 h-8 mb-2" />
            <span className="font-bold">Plin</span>
          </button>
          <button onClick={() => handlePayment('PayPal')} className="payment-btn">
            <CreditCard className="w-8 h-8 mb-2" />
            <span className="font-bold">PayPal</span>
          </button>
          <button onClick={() => handlePayment('Tarjeta')} className="payment-btn">
            <CreditCard className="w-8 h-8 mb-2" />
            <span className="font-bold">Tarjeta</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
      {/* Notificación */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl p-4 flex items-center gap-3 max-w-md">
            <Bell className="w-6 h-6 text-purple-600" />
            <p className="text-sm font-medium">{showNotification}</p>
          </div>
        </div>
      )}

      {/* Navegación */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-800">Gimnasio Juan Pérez</span>
            </div>
            
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <button onClick={() => setCurrentView('dashboard')} className="nav-btn">
                    <Home className="w-5 h-5" />
                    <span>Inicio</span>
                  </button>
                  <button onClick={() => setCurrentView('classes')} className="nav-btn">
                    <Calendar className="w-5 h-5" />
                    <span>Clases</span>
                  </button>
                  <button onClick={() => setCurrentView('plans')} className="nav-btn">
                    <CreditCard className="w-5 h-5" />
                    <span>Planes</span>
                  </button>
                  <button 
                    onClick={() => {
                      setIsLoggedIn(false);
                      setUserData(null);
                      setCurrentView('home');
                    }} 
                    className="btn-secondary"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setCurrentView('home')} className="nav-btn">
                    <Home className="w-5 h-5" />
                    <span>Inicio</span>
                  </button>
                  <button onClick={() => setCurrentView('login')} className="btn-primary">
                    <LogIn className="w-5 h-5" />
                    <span>Ingresar</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'home' && <HomeView />}
        {currentView === 'login' && <LoginView />}
        {currentView === 'register' && <RegisterView />}
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'classes' && <ClassesView />}
        {currentView === 'plans' && <PlansView />}
        {currentView === 'payment' && <PaymentView />}
      </div>

      <style jsx>{`
        .hero {
          text-align: center;
          padding: 60px 20px;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(124, 58, 237, 0.3);
        }

        .btn-secondary {
          background: white;
          color: #7c3aed;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          border: 2px solid #7c3aed;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
        }

        .btn-secondary:hover {
          background: #7c3aed;
          color: white;
        }

        .btn-disabled {
          background: #9ca3af;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          border: none;
          cursor: not-allowed;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          width: 100%;
        }

        .input-field {
          width: 100%;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        .input-field:focus {
          outline: none;
          border-color: #7c3aed;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 8px;
          background: transparent;
          border: none;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }

        .nav-btn:hover {
          background: #f3f4f6;
          color: #7c3aed;
        }

        .payment-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
        }

        .payment-btn:hover {
          border-color: #7c3aed;
          background: #f5f3ff;
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(124, 58, 237, 0.2);
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GymManagementSystem;