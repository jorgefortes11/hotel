import { useEffect, useState } from 'react';
import axios from '../../services/api';
import {
  Container, Typography, Grid, Card, CardContent,
  CardActions, Button, TextField
} from '@mui/material';

export default function NovaReserva() {
  const [quartos, setQuartos] = useState([]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const token = localStorage.getItem('token');

  const fetchQuartos = async () => {
    try {
      const res = await axios.get('/rooms');
      setQuartos(res.data);
    } catch (err) {
      console.error('Erro ao carregar quartos:', err);
    }
  };

  const reservar = async (roomId) => {
    try {
      await axios.post('/bookings', {
        RoomId: roomId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        status: 'confirmed'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Reserva feita com sucesso!');
    } catch (err) {
      alert('Erro ao reservar: ' + err.message);
    }
  };

  useEffect(() => {
    fetchQuartos();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Fazer Nova Reserva</Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <TextField
            label="Check-in"
            type="date"
            fullWidth
            value={checkIn}
            onChange={e => setCheckIn(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Check-out"
            type="date"
            fullWidth
            value={checkOut}
            onChange={e => setCheckOut(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {quartos.map(q => (
          <Grid item xs={12} md={6} key={q.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Quarto {q.roomNumber}</Typography>
                <Typography>Tipo: {q.type}</Typography>
                <Typography>Preço: €{q.price}</Typography>
                <Typography>Capacidade: {q.capacity}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" onClick={() => reservar(q.id)}>Reservar</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}