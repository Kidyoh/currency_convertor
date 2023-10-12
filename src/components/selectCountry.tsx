import React from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';

import countriesData from './data/countries.json';

interface SelectCountryProps {
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string | null) => void;
  label: string;
}

const SelectCountry: React.FC<SelectCountryProps> = (props) => {
  const { value, onChange, label } = props;

  const dataFilter = countriesData.filter((item) => "currency" in item);
  const dataCountries = dataFilter.map((item) => {
    return `${item.currency} - ${item.name}`;
  });

  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value={value}
        disableClearable
        onChange={onChange}
        options={dataCountries}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Grid>
  );
};

export default SelectCountry;
