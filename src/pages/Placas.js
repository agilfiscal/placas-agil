import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Placas = () => {
  const [placas, setPlacas] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingPlaca, setEditingPlaca] = useState(null);
  const [formData, setFormData] = useState({
    numero: '',
    estado: '',
    preco: '',
    descricao: '',
  });

  useEffect(() => {
    fetchPlacas();
  }, []);

  const fetchPlacas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/placas');
      setPlacas(response.data);
    } catch (error) {
      console.error('Erro ao buscar placas:', error);
    }
  };

  const handleOpen = (placa = null) => {
    if (placa) {
      setEditingPlaca(placa);
      setFormData(placa);
    } else {
      setEditingPlaca(null);
      setFormData({
        numero: '',
        estado: '',
        preco: '',
        descricao: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPlaca(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPlaca) {
        await axios.put(`http://localhost:3000/api/placas/${editingPlaca.id}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/placas', formData);
      }
      fetchPlacas();
      handleClose();
    } catch (error) {
      console.error('Erro ao salvar placa:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta placa?')) {
      try {
        await axios.delete(`http://localhost:3000/api/placas/${id}`);
        fetchPlacas();
      } catch (error) {
        console.error('Erro ao excluir placa:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Gerenciamento de Placas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Nova Placa
        </Button>
      </Box>

      <Grid container spacing={3}>
        {placas.map((placa) => (
          <Grid item xs={12} sm={6} md={4} key={placa.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {placa.numero}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Estado: {placa.estado}
                </Typography>
                <Typography variant="h5" color="primary">
                  R$ {placa.preco}
                </Typography>
                <Typography variant="body2">{placa.descricao}</Typography>
              </CardContent>
              <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={() => handleOpen(placa)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(placa.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingPlaca ? 'Editar Placa' : 'Nova Placa'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Número"
              value={formData.numero}
              onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Estado"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Preço"
              type="number"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Descrição"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              margin="normal"
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Placas; 