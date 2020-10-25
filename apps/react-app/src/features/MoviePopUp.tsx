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

import { MovieDetails } from '../api/Omdb';
import { MoviePoster } from '../components';

export interface MovieDetailsProps {
  open: boolean;
  movieDetails?: MovieDetails;
  onClose: () => void;
}

export const MoviePopUp = ({
  open,
  movieDetails,
  onClose,
}: MovieDetailsProps) => {
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
  ) : (
    <CircularProgress />
  );
  return (
    <Dialog
      onClose={onClose}
    //   aria-label={`synopsis of ${movieDetails.Title}`}
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
