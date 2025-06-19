import { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', {
        name,
        email,
        password,
        role: 'client' // Apenas clientes podem registar-se
      });
      alert('Conta criada com sucesso!');
      navigate('/login');
    } catch (err) {
      alert('Erro ao criar conta');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Criar Conta</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={styles.input}
          />
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
          <button type="submit" style={styles.button}>Criar Conta</button>
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
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '8px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
};
