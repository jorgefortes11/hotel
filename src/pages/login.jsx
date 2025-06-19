import { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });

      // Guardar token e role
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      // Redirecionar consoante o papel
      if (response.data.role === 'admin') navigate('/admin');
      else if (response.data.role === 'receptionist') navigate('/recepcionista');
      else if (response.data.role === 'client') navigate('/cliente');
      else alert('Tipo de utilizador desconhecido.');

    } catch (err) {
      alert('Credenciais inválidas ou erro no servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '0.75rem', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
