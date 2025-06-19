import { useEffect, useState, useCallback } from 'react';
import axios from '../../services/api';
import {
  Container, Typography, TextField, Button, Box
} from '@mui/material';

export default function PerfilCliente() {
  const [perfil, setPerfil] = useState({ name: '', email: '' });
  const token = localStorage.getItem('token');

  const carregarPerfil = useCallback(async () => {
    try {
      const res = await axios.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPerfil({ name: res.data.name, email: res.data.email });
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
    }
  }, [token]);

  const atualizarPerfil = async () => {
    try {
      await axios.put('/auth/me', perfil, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      alert('Erro ao atualizar perfil.');
    }
  };

  useEffect(() => {
    carregarPerfil();
  }, [carregarPerfil]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Meu Perfil</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nome"
          value={perfil.name}
          onChange={e => setPerfil({ ...perfil, name: e.target.value })}
        />
        <TextField
          label="Email"
          value={perfil.email}
          disabled
        />
        <Button variant="contained" onClick={atualizarPerfil}>
          Atualizar
        </Button>
      </Box>
    </Container>
  );
}
