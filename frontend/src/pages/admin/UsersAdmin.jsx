import { useEffect, useState } from 'react';
import axios from '../../services/api';
import {
  Container, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, IconButton, Paper
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);

  // Buscar utilizadores da API
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/auth/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar utilizadores:", error);
    }
  };

  // Apagar utilizador
  const deleteUser = async (id) => {
    if (!window.confirm("Tem certeza que deseja apagar este utilizador?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/auth/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUsers(users.filter(u => u.id !== id));
    } catch (error) {
      console.error("Erro ao apagar utilizador:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestão de Utilizadores
      </Typography>

      <Paper sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Função</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => deleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                  {/* Futuro: botão de editar aqui */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
