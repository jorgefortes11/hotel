import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register'; // 👈 Importa a nova página de registo
import AdminDashboard from './components/dashboard/AdminDashboard';
import ReceptionistDashboard from './components/dashboard/ReceptionistDashboard';
import ClientDashboard from './components/dashboard/ClientDashboard';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* 👈 Nova rota */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recepcionista"
          element={
            <ProtectedRoute role="receptionist">
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cliente"
          element={
            <ProtectedRoute role="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
