import React from 'react';
import { Container } from '@material-ui/core';

import '../web-components/img-spinner';

import { MovieSearchBar, MovieSearchResults } from '../features';

import './app.scss';


export const App = () => {
  //   const classes = useStyles();

  return (
    <Container className="app" maxWidth="md">
      <MovieSearchBar />

      <MovieSearchResults />
    </Container>
  );
};

export default App;
