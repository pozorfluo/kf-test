import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
  //   Button,
  //   CircularProgress,
  IconButton,
  LinearProgress,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import placeholderSearchResults from './placeholderSearchResults';
import phMissingPoster from './ph_missing-poster.png';

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
    poster: {
        opacity: '85%',
        '&:hover': {
            opacity: '100%',
        },
        '&:focus': {
            opacity: '100%',
        },
    }
  })
);

export const App = () => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.scss file.
   */

  const classes = useStyles();

  return (
    <div className="app">
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

      <div className={classes.root}>
        <GridList cellHeight={450} className={classes.gridlist}>
          {placeholderSearchResults.map((movie) => (
            <GridListTile key={movie.imdbID}>
              <img
                src={
                  /** @todo Consider a less crude way to check if a url, valid
                   *        or not, is present in a returned result.
                   */
                  movie.Poster.substring(0, 4) === 'http'
                    ? movie.Poster
                    : phMissingPoster
                }
                alt={movie.Title}
                className={classes.poster}
              />
              <GridListTileBar
                title={movie.Title}
                subtitle={<span>{movie.Year}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`synonpsis for ${movie.Title}`}
                    className={classes.icon}
                  >
                    <Icon>zoom_in</Icon>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      {/* <CircularProgress />
      <Button
        variant="contained"
        color="primary"
        startIcon={<Icon>search</Icon>}
      >
        Comme un aigle
      </Button> */}
    </div>
  );
};

export default App;
