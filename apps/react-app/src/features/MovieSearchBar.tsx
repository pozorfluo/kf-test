import React from 'react';
import {
  Icon,
  IconButton,
  LinearProgress,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@material-ui/core';

export const MovieSearchBar = () => {
  return (
    <FormControl style={{ width: '100%' }}>
      <InputLabel htmlFor="search-field">
        Search for a movie by title
      </InputLabel>
      <Input
        id="search-field"
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="cancel">
              <Icon>clear</Icon>
            </IconButton>
            <IconButton aria-label="search">
              <Icon>search</Icon>
            </IconButton>
          </InputAdornment>
        }
        fullWidth
      ></Input>
      <LinearProgress />
    </FormControl>
  );
};
