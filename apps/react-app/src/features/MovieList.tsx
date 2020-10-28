import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Icon,
  IconButton,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
} from '@material-ui/core';

import { MoviePoster } from '../components';
import { maybePlural } from '../utils';
import { MovieDetails, Omdb } from '../api';
import { MoviePopUp } from './MoviePopUp';
import { MovieSearchResult } from '../api';

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

export interface MovieSearchResultsProps {
  movies: MovieSearchResult[];
  total: number;
  page: number;
  /** Part of a workaround to avoid commiting API keys to the repo. */
  APIKey: string;
}

/**
 * @todo Consider whether caching requests for MovieDetails (beyond http cache)
 *       is worth researching at all.
 */
export const MovieList = ({
  movies,
  APIKey,
  total,
  page,
}: MovieSearchResultsProps) => {
  const [popUp, setPopup] = useState(false);
  const [phDetails, setPhDetails] = useState<MovieDetails | null>(null);
  const [movieID, setMovieID] = useState<string | null>(null);
  const [err, setErr] = useState<Error | null>(null);
  const classes = useStyles();

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setErr(null);
        const omdb = new Omdb(APIKey);
        const result = await omdb.getMovieDetailsAsync(movieID);
        console.log(result);
        setPhDetails(result);
      } catch (err) {
        setErr(err);
      }
    }
    if (popUp) {
      fetchMovieDetails();
      console.log('Loading movie details ...');
    }
  }, [popUp, movieID, APIKey]);

  return (
    <div className={classes.root}>
      <GridList cellHeight="auto" cols={1} className={classes.gridlist}>
        <ListSubheader component="div">
          found {maybePlural(total, 'movie')} ! ( showing {movies.length} )
        </ListSubheader>
        {movies.map((movie, idx) => (
          /** @note omdbapi.com DOES return duplicate imdbID / results */
          <GridListTile key={movie.imdbID + idx}>
            <MoviePoster url={movie.Poster} title={movie.Title} />
            <GridListTileBar
              title={movie.Title}
              subtitle={<span>{movie.Year}</span>}
              actionIcon={
                <IconButton
                  aria-label={`synopsis of ${movie.Title}`}
                  className={classes.icon}
                  onClick={() => {
                    setMovieID(movie.imdbID);
                    setPopup(true);
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
        open={popUp}
        movieDetails={phDetails ? phDetails : undefined}
        error={err ? err.message : undefined}
        onClose={() => {
          setPopup(false);
          setPhDetails(null);
        }}
      />
    </div>
  );
};
