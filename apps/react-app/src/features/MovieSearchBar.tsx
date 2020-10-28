import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';

import {
  Icon,
  IconButton,
  LinearProgress,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@material-ui/core';

import { Omdb, MovieSearchResult } from '../api';

/**
 *
 */
interface MovieSearchBarProps {
  setMovieSearch: (searchFor: string) => void;
  showMovies: (
    movies: MovieSearchResult[],
    total: number,
    page: number
  ) => void;
  showError: (err: string) => void;
  /** Part of a workaround to avoid commiting API keys to the repo. */
  APIKey: string;
}

/**
 *
 */
export const MovieSearchBar = ({
  setMovieSearch,
  showMovies,
  showError,
  APIKey,
}: MovieSearchBarProps) => {
  const [currentSearch, setCurrentSearch] = useState('');
  const { current, searchFor } = useSelector(
    (state: RootState) => state.movieSearchBar
  );
  //   const [err, setErr] = useState<Error | null>(null);

  //   const [movies, setMovies] = useState<MovieSearchResult[]>([]);

  const onSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(e.target.value);
    console.log('MovieSearchBar input changed.');
  };

  const onClear = () => {
    setCurrentSearch('');
  };

  const onSubmit = () => {
    if (currentSearch) {
      setMovieSearch(currentSearch);
    }
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && currentSearch) {
      setMovieSearch(currentSearch);
    }
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const omdb = new Omdb(APIKey);
        const [results, total, page] = await omdb.getMoviesByTitleAsync(
          searchFor
        );
        console.log(results, total, page);
        showMovies(results, total, page);
      } catch (err) {
        showError(err.message);
      }
    }
    if (current === 'loading' && searchFor) {
      fetchMovies();
      console.log('Loading movie list ...');
    }
  }, [searchFor, showMovies, showError, current, APIKey]);

  return (
    <FormControl style={{ width: '100%' }}>
      <InputLabel htmlFor="search-field">
        Search for a movie by title ({APIKey}/{current}/{searchFor})
      </InputLabel>
      <Input
        id="search-field"
        value={currentSearch}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="cancel"
              onClick={onClear}
              disabled={!currentSearch}
            >
              <Icon>clear</Icon>
            </IconButton>
            <IconButton
              aria-label="search"
              onClick={onSubmit}
              disabled={!currentSearch}
            >
              <Icon>search</Icon>
            </IconButton>
          </InputAdornment>
        }
        /** @todo Debounce onChange event if you let it trigger a search. */
        onChange={onSearchChanged}
        onKeyPress={onKey}
        fullWidth
        autoFocus
      ></Input>
      {current === 'loading' && <LinearProgress />}
    </FormControl>
  );
};
