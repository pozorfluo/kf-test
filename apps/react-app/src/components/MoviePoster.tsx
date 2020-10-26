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

interface MoviePosterProps {
  title: string;
  url: string;
  height?: number;
  width?: number;
}

export const MoviePoster = ({
  title,
  url,
  height = 450,
  width = 300,
}: MoviePosterProps) => {
  const classes = useStyles();
  return (
    <img
      is="img-spinner"
      src={
        /** @todo Consider a less crude way to check if any url, valid
         *        or not, is present in a result returned from ombd api.
         */
        url.substring(0, 4) === 'http' ? url : phMissingPoster
      }
      height={height}
      width={width}
      alt={title}
      /** @see {@link ../web-components/wc-class-fix.d.ts}  */
      class={classes.poster}
    />
  );
};
