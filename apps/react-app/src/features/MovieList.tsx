import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';

import { MovieSearchResult } from '../api';

import { exitMovieDetails } from './movieDetailsSlice';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  Icon,
  IconButton,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
} from '@material-ui/core';

import { MoviePagination } from './MoviePagination';
import { MoviePoster } from '../components';
import { maybePlural } from '../utils';
import { MoviePopUp } from './MoviePopUp';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    gridList: {
      //   width: '100%',
      height: '100%',
    },
    gridTile: {
      backgroundColor: '#000000',
    },
    icon: {
      color: '#FFFFFFAF',
    },
  })
);

export interface MovieSearchResultsProps {
  movies: MovieSearchResult[];
  total: number;
  setPage: (page: number) => void;
  setImdbID: (imdbID: string) => void;
  fetchDetailsAsync: (imdbID: string, APIKey: string) => void;
  //   exitDetails: () => void;
  /** Part of a workaround to avoid commiting API keys to the repo. */
  APIKey: string;
}

/**
 * @todo Consider whether caching requests for MovieDetails (beyond http cache)
 *       is worth researching at all.
 */
export const MovieList = ({
  movies,
  total,
  setPage,
  setImdbID,
  fetchDetailsAsync,
  //   exitDetails,
  APIKey,
}: MovieSearchResultsProps) => {
  const dispatch = useDispatch();
  const { current, imdbID, movieDetails, error } = useSelector(
    (state: RootState) => state.movieDetails
  );

  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const xs = useMediaQuery('(min-width:350px)');
  const cols = md ? 4 : sm ? 3 : xs ? 2 : 1;

  useEffect(() => {
    if (current === 'loading' && imdbID) {
      fetchDetailsAsync(imdbID, APIKey);
      console.log('Loading movie details for : ', imdbID);
    }
  }, [current, imdbID, APIKey, fetchDetailsAsync]);

  return (
    <div className={classes.root}>
      <GridList
        cellHeight="auto"
        cols={cols}
        spacing={0}
        className={classes.gridList}
      >
        <GridListTile key="subheader" cols={cols}>
          <Grid container direction="row" justify="space-between">
            <ListSubheader component="span">
              found {maybePlural(total, 'movie')} ! ( showing {movies.length} )
              /{current}/{imdbID}
            </ListSubheader>
            <MoviePagination setPage={setPage} />
          </Grid>
        </GridListTile>

        {movies.map((movie, idx) => (
          /** @note omdbapi.com DOES return duplicate imdbID / results */
          <GridListTile key={movie.imdbID + idx} className={classes.gridTile}>
            <MoviePoster url={movie.Poster} title={movie.Title} />
            <GridListTileBar
              title={movie.Title}
              subtitle={<span>{movie.Year}</span>}
              actionIcon={
                <IconButton
                  aria-label={`synopsis of ${movie.Title}`}
                  className={classes.icon}
                  onClick={() => {
                    setImdbID(movie.imdbID);
                    // dispatch(setFetchImdbID({ imdbID: movie.imdbID }));
                  }}
                >
                  <Icon>zoom_in</Icon>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>

      <MoviePopUp
        open={(current !== 'idle')}
        movieDetails={movieDetails ? movieDetails : undefined}
        error={error ? error : undefined}
        onClose={() => {
          dispatch(exitMovieDetails());
        }}
      />
    </div>
  );
};
