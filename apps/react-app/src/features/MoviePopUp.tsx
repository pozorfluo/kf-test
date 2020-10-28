import React from 'react';
import {
  IconButton,
  Icon,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
} from '@material-ui/core';

import { MovieDetails } from '../api';
import { MoviePoster } from '../components';

export interface MovieDetailsProps {
  open: boolean;
  movieDetails?: MovieDetails;
  onClose: () => void;
  error: string;
}

export const MoviePopUp = ({
  open,
  movieDetails,
  onClose,
  error,
}: MovieDetailsProps) => {
  /**
   * @todo Talk to machine/store directly once they're plugged in.
   * */
  const content = movieDetails ? (
    <>
      <DialogTitle>
        {movieDetails.Title} ({movieDetails.Year})
      </DialogTitle>
      <DialogContent>
        <MoviePoster url={movieDetails.Poster} title={movieDetails.Title} />
        <p>{movieDetails.Plot}</p>
        <p>{movieDetails.Actors}</p>
      </DialogContent>
    </>
  ) : error ? (
    error
  ) : (
    <CircularProgress />
  );
  return (
    <Dialog
      onClose={onClose}
      aria-label={
        movieDetails ? `synopsis of ${movieDetails.Title}` : 'loading content'
      }
      open={open}
    >
      {content}
      <DialogActions>
        <IconButton aria-label="close" onClick={onClose}>
          <Icon>close</Icon>
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};
