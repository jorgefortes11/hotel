import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import AdminDashboard from './components/dashboard/AdminDashboard';
import ReceptionistDashboard from './components/dashboard/ReceptionistDashboard';
import ClientDashboard from './components/dashboard/ClientDashboard';
import ProtectedRoute from './routes/ProtectedRoute';

// Páginas do Admin
import UsersAdmin from './pages/admin/UsersAdmin';
import RoomsAdmin from './pages/admin/RoomsAdmin';
import BookingsAdmin from './pages/admin/BookingsAdmin';

// Páginas do Cliente
import ReservasCliente from './pages/client/ReservasCliente';
import NovaReserva from './pages/client/NovaReserva';
import PerfilCliente from './pages/client/PerfilCliente';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login e registo */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboards por função */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receptionist"
          element={
            <ProtectedRoute allowedRoles={['receptionist']}>
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client"
          element={
            <ProtectedRoute allowedRoles={['client', 'guest']}>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin: funcionalidades */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UsersAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rooms"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <RoomsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <BookingsAdmin />
            </ProtectedRoute>
          }
        />

        {/* Cliente: funcionalidades */}
        <Route
          path="/client/reservas"
          element={
            <ProtectedRoute allowedRoles={['client', 'guest']}>
              <ReservasCliente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/nova"
          element={
            <ProtectedRoute allowedRoles={['client', 'guest']}>
              <NovaReserva />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/perfil"
          element={
            <ProtectedRoute allowedRoles={['client', 'guest']}>
              <PerfilCliente />
            </ProtectedRoute>
          }
        />

        {/* Rota padrão */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
