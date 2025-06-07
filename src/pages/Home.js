import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Gerenciamento de Placas',
      description: 'Crie e gerencie placas de preços para seu supermercado de forma eficiente.',
      icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Controle de Preços',
      description: 'Mantenha seus preços atualizados e organize promoções facilmente.',
      icon: <PriceChangeIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Promoções',
      description: 'Gerencie suas promoções e ofertas especiais com facilidade.',
      icon: <LocalOfferIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Sistema de Placas
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Gerencie suas placas de preços de forma eficiente
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate('/placas')}
          sx={{ mt: 2 }}
        >
          Começar Agora
        </Button>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography>{feature.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => navigate('/placas')}>
                  Saiba mais
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home; 