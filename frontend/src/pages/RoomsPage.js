import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getRooms } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const RoomsPage = () => {
  const classes = useStyles();
  const [rooms, setRooms] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleBookNow = (roomId) => {
    if (!isAuthenticated) {
      history.push('/login');
      return;
    }
    history.push(`/book/${roomId}`);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Our Rooms
      </Typography>
      <Grid container spacing={4}>
        {rooms.map((room) => (
          <Grid item key={room._id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={room.images && room.images.length > 0 ? room.images[0] : 'https://source.unsplash.com/random'}
                title={room.type}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {room.type} Room #{room.roomNumber}
                </Typography>
                <Typography>
                  ${room.price} per night
                </Typography>
                <Typography>
                  Capacity: {room.capacity} {room.capacity > 1 ? 'people' : 'person'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {room.description}
                </Typography>
              </CardContent>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => handleBookNow(room._id)}
                disabled={!room.isAvailable}
              >
                {room.isAvailable ? 'Book Now' : 'Not Available'}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RoomsPage;