import React, { useContext, ChangeEvent } from 'react';
import { Grid, InputAdornment, TextField } from '@mui/material';
import { CurrencyContext } from '../context/CurrencyContext';

const InputAmount: React.FC = () => {
const { input, setInput } = useContext(CurrencyContext)!;

const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    input
};

  return (
    <Grid item xs={12} md>
      <TextField
        onChange={handleInputChange}
        label="Amount"
        fullWidth
        InputProps={{
          type: "number",
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
    </Grid>
  );
};

export default InputAmount;
