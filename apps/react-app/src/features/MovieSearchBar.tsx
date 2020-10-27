import React, { useState, ChangeEvent, useEffect } from 'react';
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

import { MovieSearchResult } from '../api';
import placeholderSearchResults from '../api/placeholderSearchResults';


function placeholderGetMovies() : Promise<MovieSearchResult[]> {
    console.log('fake fetching ...');
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (Math.round(Math.random())) {
        resolve(placeholderSearchResults);
      } else {
        reject('fake loading error !');
      }
    }, 1000);
  });
}

interface MovieSearchBarProps {
  setMovieSearch: (searchFor: string) => void;
  showMovies: (movies: MovieSearchResult[]) => void;
  /** Part of a workaround to avoid commiting API keys to the repo. */
  APIKey: string;
}

export const MovieSearchBar = ({
  setMovieSearch,
  showMovies,
  APIKey,
}: MovieSearchBarProps) => {
  const [currentSearch, setCurrentSearch] = useState('');
  const { current, searchFor } = useSelector(
    (state: RootState) => state.movieSearchBar
  );
//   const [movies, setMovies] = useState<MovieSearchResult[]>([]);

  const onSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(e.target.value);
    console.log('MovieSearchBar input changed.');
  };

  const onClear = () => {
    setCurrentSearch('');
  };

  const onSubmit = () => {
    setMovieSearch(currentSearch);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const searchResults = await placeholderGetMovies();
        // setMovies(searchResults);
        showMovies(searchResults);
      } catch (err) {
        console.error(err);
        /** @todo Fire SEARCH_FAILURE here */
      }
      //   finally {

      //   }
    }
    // if ((current === 'idle' || current === 'failure') && searchFor) {
    if (current === 'loading' && searchFor) {
      fetchMovies();
      console.log('Loading ...');
    }
  }, [searchFor, showMovies, current]);

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
            <IconButton aria-label="cancel" onClick={onClear}>
              <Icon>clear</Icon>
            </IconButton>
            <IconButton aria-label="search" onClick={onSubmit}>
              <Icon>search</Icon>
            </IconButton>
          </InputAdornment>
        }
        /** @todo Debounce onChange event if you let it trigger a search. */
        onChange={onSearchChanged}
        fullWidth
        autoFocus
      ></Input>
      <LinearProgress />
    </FormControl>
  );
};
