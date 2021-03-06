import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './rootReducer';

import {
  searchMovies,
  setPage,
  setMovieSearchContext,
} from '../features/movieSearchBarSlice';

import {
  setFetchImdbID,
  fetchMovieDetailsAsync,
} from '../features/movieDetailsSlice';

import {MovieSearchBar} from '../features/MovieSearchBar';
import {MovieList} from '../features/MovieList';

import { getAPIKey } from '../utils';

import { Container } from '@material-ui/core';
import { Error } from '../components';
import { MovieSearchResult } from '../api';
import '../web-components/img-spinner';

import './app.scss';

export const App = () => {
  const dispatch = useDispatch();
  const { current, searchResults, totalResults, page, error } = useSelector(
    (state: RootState) => state.movieSearchBar
  );

  /** Part of a workaround to avoid commiting API keys to the repo. */
  const APIKey = getAPIKey();

  const setMovieSearch = (searchFor: string) => {
    dispatch(searchMovies({ searchFor }));
    console.log(`Search for "${searchFor}" fired !`);
  };

  const showMovies = (movies: MovieSearchResult[], total: number) => {
    dispatch(
      setMovieSearchContext({
        current: 'listing',
        searchResults: movies,
        totalResults: total,
      })
    );
  };

  const setListPage = (page: number) => {
    dispatch(setPage(page));
  };

  const showError = (err: string) => {
    dispatch(setMovieSearchContext({ current: 'failure', error: err }));
  };

  const setImdbID = (imdbID: string) => {
    dispatch(setFetchImdbID({ imdbID: imdbID }));
  };

  const fetchDetailsAsync = (imdbID: string, APIKey: string) => {
    dispatch(fetchMovieDetailsAsync(imdbID, APIKey));
  };

  let content;
  switch (current) {
    case 'listing':
      content = (
        <MovieList
          movies={searchResults}
          total={totalResults}
          setPage={setListPage}
          setImdbID={setImdbID}
          fetchDetailsAsync={fetchDetailsAsync}
          APIKey={APIKey}
        />
      );
      break;
    case 'failure':
      content = <Error msg={error} />;
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
        page={page}
        APIKey={APIKey}
      />
      {content}
    </Container>
  );
};

export default App;
