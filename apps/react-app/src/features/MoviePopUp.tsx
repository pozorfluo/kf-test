// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     backdrop: {
//       zIndex: theme.zIndex.drawer + 1,
//       color: '#000000',
//     },
//   })
// );
import React from 'react';
import {
  IconButton,
  Icon,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

import { MovieDetails } from '../api/Omdb';
import { MoviePoster } from '../components';

export interface MovieDetailsProps {
  open: boolean;
  loading: boolean;
  movieDetails: MovieDetails;
  onClose: () => void;
}

export const MoviePopUp = (props: MovieDetailsProps) => {
  const { open, movieDetails, onClose } = props;
  return (
    <Dialog
      onClose={onClose}
      aria-label={`synopsis of ${movieDetails.Title}`}
      open={open}
    >
      <DialogTitle>
        {movieDetails.Title} ({movieDetails.Year})
      </DialogTitle>
      <DialogContent>
        <MoviePoster url={movieDetails.Poster} title={movieDetails.Title} />
        <p>{movieDetails.Plot}</p>
        <p>{movieDetails.Actors}</p>
      </DialogContent>
      <DialogActions>
        <IconButton aria-label="close" onClick={onClose}>
          <Icon>close</Icon>
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};
