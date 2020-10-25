import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Icon,
  IconButton,
  LinearProgress,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
} from '@material-ui/core';

import '../web-components/img-spinner';
import { MoviePoster } from '../components';
import { MoviePopUp } from '../features';
import { MovieDetails } from '../api/Omdb';
import { maybePlural } from '../utils';
import placeholderSearchResults from './placeholderSearchResults';
import placeholderDetails from './placeholderDetails';

import './app.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    gridlist: {
      width: '100%',
      height: '100%',
    },
    icon: {
      color: '#FFFFFFAF',
    },
  })
);

export const App = () => {
  const [popUp, setPopup] = useState(false);
  const [phDetails, setPhDetails] = useState<MovieDetails | null>(null);
  const classes = useStyles();

  return (
    <Container className="app" maxWidth="md">
      {/* @todo Extract to features/MovieSearchBar. */}
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
      </FormControl>
      <br />
      <LinearProgress />

      <MoviePopUp
        open={popUp}
        movieDetails={phDetails ? phDetails : undefined}
        onClose={() => {
          setPopup(false);
          setPhDetails(undefined);
        }}
      />

      {/* @todo Extract to features/MovieSearchResults. */}
      <div className={classes.root}>
        <GridList cellHeight="auto" cols={1} className={classes.gridlist}>
          <ListSubheader component="div">
            found {maybePlural(placeholderSearchResults.length, 'movie')}  !
          </ListSubheader>
          {placeholderSearchResults.map((movie) => (
            <GridListTile key={movie.imdbID}>
              <MoviePoster url={movie.Poster} title={movie.Title} />
              <GridListTileBar
                title={movie.Title}
                subtitle={<span>{movie.Year}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`synopsis of ${movie.Title}`}
                    className={classes.icon}
                    onClick={() => {
                      setPopup(true);
                      setTimeout(() => setPhDetails(placeholderDetails), 2000);
                    }}
                  >
                    <Icon>zoom_in</Icon>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Container>
  );
};

export default App;
