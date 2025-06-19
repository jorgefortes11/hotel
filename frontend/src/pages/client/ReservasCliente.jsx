import { useEffect, useState, useCallback } from 'react';
import axios from '../../services/api';
import {
  Container, Typography, Table, TableHead, TableBody, TableRow, TableCell,
  Button, Box
} from '@mui/material';
import dayjs from 'dayjs';

export default function ReservasCliente() {
  const [reservas, setReservas] = useState([]);
  const token = localStorage.getItem('token');

  const carregarReservas = useCallback(async () => {
    try {
      const res = await axios.get('/bookings/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservas(res.data);
    } catch (err) {
      console.error('Erro ao carregar reservas:', err);
    }
  }, [token]);

  const eliminarReserva = async (id) => {
    if (!window.confirm('Tens a certeza que queres eliminar esta reserva?')) return;
    try {
      await axios.delete(`/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservas(reservas => reservas.filter(r => r.id !== id));
    } catch (err) {
      alert('Erro ao eliminar reserva.');
    }
  };

  useEffect(() => {
    carregarReservas();
  }, [carregarReservas]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Minhas Reservas</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Quarto</TableCell>
            <TableCell>Check-in</TableCell>
            <TableCell>Check-out</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservas.map((reserva, index) => (
            <TableRow key={reserva.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{reserva.Room?.roomNumber || '—'}</TableCell>
              <TableCell>{dayjs(reserva.checkInDate).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{dayjs(reserva.checkOutDate).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{reserva.status}</TableCell>
              <TableCell>
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => eliminarReserva(reserva.id)}
                  >
                    Eliminar
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
