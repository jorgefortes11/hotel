import React from 'react';
import { Box, Typography, Paper, Grid, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CheckCircle as CheckInIcon,
  Room as RoomsIcon,
  EventNote as BookingsIcon,
} from '@mui/icons-material';

const ReceptionistCard = styled(Paper)(({ theme }) => ({
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
  background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
}));

export default function ReceptionistDashboard() {
  const cards = [
    {
      title: "Check-ins & Check-outs",
      description: "Gerir entradas e saídas de hóspedes",
      icon: <CheckInIcon color="primary" sx={{ fontSize: 50 }} />,
    },
    {
      title: "Quartos",
      description: "Ver estado dos quartos e disponibilidade",
      icon: <RoomsIcon color="primary" sx={{ fontSize: 50 }} />,
    },
    {
      title: "Reservas",
      description: "Criar e modificar reservas",
      icon: <BookingsIcon color="primary" sx={{ fontSize: 50 }} />,
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
          Painel da Receção
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
              <ReceptionistCard elevation={3}>
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
              </ReceptionistCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}