import { useEffect, useState, useCallback } from 'react';
import axios from '../../services/api';
import {
  Container, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, IconButton, Button, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Paper, Switch, FormControlLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export default function RoomsAdmin() {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [form, setForm] = useState({
    roomNumber: '',
    type: '',
    price: '',
    capacity: '',
    description: '',
    isAvailable: true
  });

  const token = localStorage.getItem('token');

  const fetchRooms = useCallback(async () => {
    try {
      const res = await axios.get('/rooms', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(res.data);
    } catch (err) {
      console.error("Erro ao buscar quartos:", err);
    }
  }, [token]);

  const handleSave = async () => {
    try {
      if (editingRoom) {
        await axios.put(`/rooms/${editingRoom.id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/rooms', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchRooms();
      handleClose();
    } catch (err) {
      console.error("Erro ao salvar quarto:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja mesmo apagar este quarto?")) return;
    try {
      await axios.delete(`/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRooms();
    } catch (err) {
      console.error("Erro ao apagar quarto:", err);
    }
  };

  const handleOpen = (room = null) => {
    setEditingRoom(room);
    setForm(room || {
      roomNumber: '',
      type: '',
      price: '',
      capacity: '',
      description: '',
      isAvailable: true
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingRoom(null);
    setForm({
      roomNumber: '',
      type: '',
      price: '',
      capacity: '',
      description: '',
      isAvailable: true
    });
  };

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestão de Quartos
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpen()}
        sx={{ mb: 2 }}
      >
        Adicionar Quarto
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Preço (ESC)</TableCell>
              <TableCell>Capacidade</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Disponível</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map(room => (
              <TableRow key={room.id}>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>{room.price}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.description}</TableCell>
                <TableCell>{room.isAvailable ? 'Sim' : 'Não'}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(room)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(room.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingRoom ? 'Editar Quarto' : 'Novo Quarto'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Número do Quarto" value={form.roomNumber} onChange={e => setForm({ ...form, roomNumber: e.target.value })} />
          <TextField label="Tipo" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
          <TextField label="Preço (€)" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <TextField label="Capacidade" type="number" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} />
          <TextField label="Descrição" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} multiline />
          <FormControlLabel
            control={
              <Switch
                checked={form.isAvailable}
                onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
              />
            }
            label="Disponível"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
