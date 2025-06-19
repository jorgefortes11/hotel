import { useEffect, useState, useCallback } from 'react';
import axios from '../../services/api';
import {
  Container, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, IconButton, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');

  const fetchBookings = useCallback(async () => {
    try {
      const res = await axios.get('/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Erro ao buscar reservas:", err);
    }
  }, [token]);

  const deleteBooking = async (id) => {
    if (!window.confirm("Deseja cancelar esta reserva?")) return;
    try {
      await axios.delete(`/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBookings();
    } catch (err) {
      console.error("Erro ao cancelar reserva:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestão de Reservas
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Quarto</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Check-in</TableCell>
              <TableCell>Check-out</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map(booking => (
              <TableRow key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.Room?.roomNumber || '—'}</TableCell>
                <TableCell>{booking.User?.name || '—'}</TableCell>
                <TableCell>
                  {booking.checkInDate
                    ? new Date(booking.checkInDate).toLocaleDateString()
                    : '—'}
                </TableCell>
                <TableCell>
                  {booking.checkOutDate
                    ? new Date(booking.checkOutDate).toLocaleDateString()
                    : '—'}
                </TableCell>
                <TableCell>{booking.status || '—'}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => deleteBooking(booking.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
