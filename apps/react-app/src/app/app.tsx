import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './rootReducer';

import {
  searchMovies,
  setMovieSearchContext,
} from '../features/movieSearchBarSlice';

import { getAPIKey } from '../utils';

import { Container } from '@material-ui/core';
import { MovieSearchBar, MovieList } from '../features';
import { MovieSearchResult } from '../api';
import '../web-components/img-spinner';

import './app.scss';

export const App = () => {
  const dispatch = useDispatch();
  const { current, searchResults, error } = useSelector(
    (state: RootState) => state.movieSearchBar
  );

  /** Part of a workaround to avoid commiting API keys to the repo. */
  const APIKey = getAPIKey();

  const setMovieSearch = (searchFor: string) => {
    dispatch(searchMovies({ searchFor }));
    console.log(`Search for "${searchFor}" fired !`);
  };

  const showMovies = (movies: MovieSearchResult[]) => {
    dispatch(
      setMovieSearchContext({ current: 'listing', searchResults: movies })
    );
  };

  const showError = (err: string) => {
    dispatch(setMovieSearchContext({ current: 'failure', error: err }));
  };

  let content;
  switch (current) {
    case 'listing':
      content = <MovieList movies={searchResults} APIKey={APIKey} />;
      break;
    case 'failure':
      content = error;
      break;
    default:
      content = null;
      break;
  }

  return (
    <Container className="app" maxWidth="md">
      <MovieSearchBar
        setMovieSearch={setMovieSearch}
        showMovies={showMovies}
        showError={showError}
        APIKey={APIKey}
      />
      {content}
      {/* {current === 'listing' && (
        <MovieList movies={searchResults} APIKey={APIKey} />
      )} */}
    </Container>
  );
};

export default App;
