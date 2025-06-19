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

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      if (response.data.role === 'admin') navigate('/admin');
      else if (response.data.role === 'receptionist') navigate('/receptionist');
      else if (response.data.role === 'client' || response.data.role === 'guest') navigate('/client');
      else alert('Tipo de utilizador desconhecido.');
    } catch (err) {
      alert('Credenciais inválidas ou erro no servidor.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Gestão de Hotel - Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Entrar</button>

          <p style={{ marginTop: '1rem' }}>
            Ainda não tens conta?{' '}
            <a href="/register" style={{ color: '#3498db' }}>Criar conta</a>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(to right, #2c3e50, #3498db)',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1.5rem',
    color: '#2c3e50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '8px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
};
