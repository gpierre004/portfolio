import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography, 
  CircularProgress, 
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../../services/api';

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  
  // Transaction form state
  const [transaction, setTransaction] = useState({
    ticker: '',
    quantity: '',
    type: '',
    purchase_price: '',
    purchase_date: '',
    comment: ''
  });

  const handleUpdateStockPrices = async () => {
    try {
      setLoading(true);
      setMessage(null);
      setError(null);
      
      const response = await api.post('/stocks/update-prices');
      setMessage('Stock prices updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update stock prices');
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionChange = (field) => (event) => {
    setTransaction({
      ...transaction,
      [field]: event.target.value
    });
  };

  const handleSubmitTransaction = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      await api.post('/transactions', transaction);
      setMessage('Transaction added successfully!');
      
      // Reset form
      setTransaction({
        ticker: '',
        quantity: '',
        type: '',
        purchase_price: '',
        purchase_date: '',
        comment: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Navigation Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton 
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
          aria-label="back to dashboard"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">
          Settings
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Stock Data Management Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Stock Data Management
            </Typography>
            
            <Button 
              variant="contained" 
              onClick={handleUpdateStockPrices}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                  Updating Stock Prices...
                </>
              ) : (
                'Update Stock Prices'
              )}
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              This will fetch the latest 5 years of stock price data and update the database.
              Records older than 5 years will be automatically removed.
            </Typography>
          </Paper>
        </Grid>

        {/* Add Transaction Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Add New Transaction
            </Typography>

            <form onSubmit={handleSubmitTransaction}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Ticker Symbol"
                    value={transaction.ticker}
                    onChange={handleTransactionChange('ticker')}
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Transaction Type</InputLabel>
                    <Select
                      required
                      value={transaction.type}
                      onChange={handleTransactionChange('type')}
                      label="Transaction Type"
                    >
                      <MenuItem value="BUY">Buy</MenuItem>
                      <MenuItem value="SELL">Sell</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Quantity"
                    value={transaction.quantity}
                    onChange={handleTransactionChange('quantity')}
                    margin="normal"
                    inputProps={{ step: "0.00001" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    label="Purchase Price"
                    value={transaction.purchase_price}
                    onChange={handleTransactionChange('purchase_price')}
                    margin="normal"
                    inputProps={{ step: "0.01" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="date"
                    label="Purchase Date"
                    value={transaction.purchase_date}
                    onChange={handleTransactionChange('purchase_date')}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Comment"
                    value={transaction.comment}
                    onChange={handleTransactionChange('comment')}
                    margin="normal"
                    multiline
                    rows={2}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ mt: 2 }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                        Adding Transaction...
                      </>
                    ) : (
                      'Add Transaction'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>

      {message && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default Settings;
