import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import AdminDashboard from './components/dashboard/AdminDashboard';
import ReceptionistDashboard from './components/dashboard/ReceptionistDashboard';
import ClientDashboard from './components/dashboard/ClientDashboard';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/recepcionista" element={
          <ProtectedRoute role="receptionist">
            <ReceptionistDashboard />
          </ProtectedRoute>
        } />
        <Route path="/cliente" element={
          <ProtectedRoute role="client">
            <ClientDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
