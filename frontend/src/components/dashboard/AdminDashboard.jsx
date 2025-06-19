import React from 'react';
import { Box, Typography, Paper, Grid, Container, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  PeopleAlt as UsersIcon,
  Hotel as RoomsIcon,
  CalendarToday as BookingsIcon,
} from '@mui/icons-material';

const AdminCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
}));

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const cards = [
    {
      title: "Utilizadores",
      description: "Gerir contas de todos os utilizadores",
      icon: <UsersIcon color="primary" sx={{ fontSize: 50 }} />,
      route: "/admin/users"
    },
    {
      title: "Quartos",
      description: "Visualizar, adicionar e editar quartos",
      icon: <RoomsIcon color="primary" sx={{ fontSize: 50 }} />,
      route: "/admin/rooms"
    },
    {
      title: "Reservas",
      description: "Consultar e gerir reservas feitas",
      icon: <BookingsIcon color="primary" sx={{ fontSize: 50 }} />,
      route: "/admin/bookings"
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Sair
          </Button>
        </Box>

        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 6,
            textAlign: 'center'
          }}
        >
          Painel do Administrador
        </Typography>

        <Grid 
          container 
          spacing={4} 
          justifyContent="center"
          alignItems="stretch"
        >
          {cards.map((card, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={index}
              sx={{ display: 'flex' }}
              onClick={() => navigate(card.route)}
            >
              <AdminCard elevation={3}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 2
                  }}
                >
                  {card.icon}
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {card.description}
                  </Typography>
                </Box>
              </AdminCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}