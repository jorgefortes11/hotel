import React from 'react';
import { Box, Typography, Paper, Grid, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  History as ReservationsIcon,
  AddCircleOutline as NewBookingIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';

const ClientCard = styled(Paper)(({ theme }) => ({
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
  background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
}));

export default function ClientDashboard() {
  const cards = [
    {
      title: "Minhas Reservas",
      description: "Ver histórico e detalhes das tuas reservas",
      icon: <ReservationsIcon color="primary" sx={{ fontSize: 50 }} />,
    },
    {
      title: "Fazer Nova Reserva",
      description: "Escolhe o quarto ideal e reserva em poucos cliques",
      icon: <NewBookingIcon color="primary" sx={{ fontSize: 50 }} />,
    },
    {
      title: "Perfil",
      description: "Ver ou editar as tuas informações pessoais",
      icon: <ProfileIcon color="primary" sx={{ fontSize: 50 }} />,
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
          Painel do Cliente
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
              sx={{
                display: 'flex',
              }}
            >
              <ClientCard elevation={3}>
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
              </ClientCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}