import React, { useState } from 'react';
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
import { MovieDetails } from '../api/Omdb';
import { MoviePopUp } from '../features';
import placeholderSearchResults from './placeholderSearchResults';
import placeholderDetails from './placeholderDetails';

// export interface MovieSearchResultsProps {

// }

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

//{movies} : MovieSearchResultsProps

export const MovieSearchResults = () => {
  const [popUp, setPopup] = useState(false);
  const [phDetails, setPhDetails] = useState<MovieDetails | null>(null);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight="auto" cols={1} className={classes.gridlist}>
        <ListSubheader component="div">
          found {maybePlural(placeholderSearchResults.length, 'movie')} !
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

      <MoviePopUp
        open={popUp}
        movieDetails={phDetails ? phDetails : undefined}
        onClose={() => {
          setPopup(false);
          setPhDetails(undefined);
        }}
      />
    </div>
  );
};
