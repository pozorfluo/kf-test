import React, { useState, ChangeEvent } from 'react';
import {
  Icon,
  IconButton,
  LinearProgress,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@material-ui/core';

interface MovieSearchBarProps {
  setMovieSearch: (searchFor: string) => void;
  showMovies: () => void;
  /** @note Part of a workaround to avoid commiting API keys to the repo. */
  APIKey : string;
}

export const MovieSearchBar = ({
  setMovieSearch,
  showMovies,
  APIKey,
}: MovieSearchBarProps) => {
  const [currentSearch, setCurrentSearch] = useState('');

  const onSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(e.target.value);
    console.log("MovieSearchBar input changed.")
  };

  const onClear = () => {
    setCurrentSearch('');
  };

  const onSubmit = () => {
    setMovieSearch(currentSearch);
  };

  return (
    <FormControl style={{ width: '100%' }}>
      <InputLabel htmlFor="search-field">
        Search for a movie by title ({APIKey})
      </InputLabel>
      <Input
        id="search-field"
        value={currentSearch}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="cancel" onClick={onClear}>
              <Icon>clear</Icon>
            </IconButton>
            <IconButton aria-label="search" onClick={onSubmit}>
              <Icon>search</Icon>
            </IconButton>
          </InputAdornment>
        }
        /** @todo Debounce onChange event. */
        onChange={onSearchChanged}
        fullWidth
        autoFocus
      ></Input>
      <LinearProgress />
    </FormControl>
  );
};
