import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import phMissingPoster from './ph_missing-poster.png';

const useStyles = makeStyles(() =>
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
  height?: string;
  width?: string;
}

export const MoviePoster = ({
  title,
  url,
  height = 'auto',
  width = '100%',
}: MoviePosterProps) => {
  const [deadLink, setDeadLink] = useState<boolean>(false);
  const classes = useStyles();

  return (
    <img
      is="img-spinner"
      src={
        /** @note omdbapi.com DOES return bogus/dead links for posters. */
        url.substring(0, 4) === 'http' && !deadLink ? url : phMissingPoster
      }
      height={height}
      width={width}
      alt={title}
      onError={() => {
        if (!deadLink) {
          setDeadLink(true);
        }
      }}
      /** @see {@link ../web-components/wc-class-fix.d.ts}  */
      class={classes.poster}
    />
  );
};
