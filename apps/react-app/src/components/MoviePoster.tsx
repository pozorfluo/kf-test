import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import phMissingPoster from './ph_missing-poster.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    poster: {
      opacity: '85%',
      '&:hover': {
        opacity: '100%',
      },
      '&:focus': {
        opacity: '100%',
      },
    },
  })
);

export interface MoviePosterProps {
    title : string;
    url : string; 
}

export const MoviePoster = (props) => {
    const { title, url } = props;
    const classes = useStyles();

  return (
    <img
      src={
        /** @todo Consider a less crude way to check if any url, valid
         *        or not, is present in a result returned from ombd api.
         */
        url.substring(0, 4) === 'http' ? url : phMissingPoster
      }
      alt={title}
      className={classes.poster}
    />
  );
};
