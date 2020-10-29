import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './rootReducer';

import {
  searchMovies,
  setPage,
  setMovieSearchContext,
} from '../features/movieSearchBarSlice';

import { getAPIKey } from '../utils';

import { Container } from '@material-ui/core';
import { Error } from '../components';
import { MovieSearchBar, MovieList } from '../features';
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

  const showMovies = (
    movies: MovieSearchResult[],
    total: number
  ) => {
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

  let content;
  switch (current) {
    // case 'details':
    //   <MoviePopUp .../>
    /** @note Intentional fallthrough */
    case 'listing':
      content = (
        <MovieList
          movies={searchResults}
          total={totalResults}
          setPage={setListPage}
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
