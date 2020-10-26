import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './rootReducer';

import {
  searchMovies,
  setMovieSearchContext,
} from '../features/movieSearchBarSlice';

import { Container } from '@material-ui/core';
import { MovieSearchBar, MovieSearchResults } from '../features';
import '../web-components/img-spinner';

import './app.scss';

export const App = () => {
  const dispatch = useDispatch();
  const { current, searchFor, searchResults, imdbID } = useSelector(
    (state: RootState) => state.movieSearchBar
  );

  const setMovieSearch = (searchFor: string) => {
    dispatch(searchMovies({ searchFor }));
    console.log(`Search for "${searchFor}" fired !`)
  };

  const showMovies = () => {
    dispatch(setMovieSearchContext({ current: 'listing' }));
  };

    // const content = current === 'listing' 
    //     ? (<MovieSearchResults />)
    //     :


  return (
    <Container className="app" maxWidth="md">
      <MovieSearchBar setMovieSearch={setMovieSearch} showMovies={showMovies}/>
      {/* {content} */}
      { current === "listing" && <MovieSearchResults />}
    </Container>
  );
};

export default App;
