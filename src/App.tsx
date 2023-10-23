import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import 'react-dropdown/style.css';
import './App.css';
import SelectCountry from './components/selectCountry';
import { Box, Container, Grid, TextField, Typography, InputAdornment, Button } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

interface ExchangeRates {
  rates: { [key: string]: number };
}

function App() {
  const [input, setInput] = useState<number>(0);
  const [from, setFrom] = useState<string>("ETB - Ethiopia");
  const [to, setTo] = useState<string>("USD - United States");
  const [output, setOutput] = useState<number>(0);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({ rates: {} });

  const boxStyles: React.CSSProperties = {
    background: "#fdfdfd",
    marginTop: "10%",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative",
  };

  useEffect(() => {
    Axios.get<ExchangeRates>(`/exchange_rates.json`)
      .then((res) => {
        setExchangeRates(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function convert() {
    const fromCurrency = from.split(" ")[0];
    const toCurrency = to.split(" ")[0];

    const fromRate = exchangeRates.rates[fromCurrency];
    const toRate = exchangeRates.rates[toCurrency];

    const usdRate = exchangeRates.rates["USD"];

    const result = (input / fromRate) * (toRate / usdRate);

    setOutput(parseFloat(result.toFixed(2)));
  }

  useEffect(() => {
    if (input) {
      convert();
    }
  }, [from, to]);

  function flip() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Shega Exchange Rates
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md>
          <TextField
            onChange={(e) => setInput(parseFloat(e.target.value))}
            label="Amount"
            fullWidth
            InputProps={{
              type: "number",
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid>
        <SelectCountry value={from} label="From" onChange={(_, newValue) => setFrom(newValue as string)} />
        <Grid item xs={12} md="auto">
          <Button
            onClick={flip}
            sx={{
              borderRadius: 1,
              height: "100%",
            }}
          >
            <CompareArrowsIcon sx={{
              fontSize: 30,
            }} />
          </Button>
        </Grid>
        <SelectCountry value={to} label="To" onChange={(_, newValue) => setTo(newValue as string)} />
      </Grid>
      <Button
        onClick={convert}
        sx={{
          borderRadius: 1,
          height: "22%",
        }}

      >
        Convert
      </Button>
      {input ? (
        <Box sx={{ textAlign: "bottom", marginTop: "1rem" }}>
          <Typography>
            {input} {from} =
          </Typography>
          <Typography variant="h5" sx={{ marginTop: "4px", fontWeight: "bold" }}>
            {output} {to}
          </Typography>
          <p>{input + " " + from + " = " + output + " " + to}</p>
        </Box>
      ) : null}
    </Container>
  );
}

export default App;
