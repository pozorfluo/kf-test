import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import {
  IconButton,
  Icon,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
  Button,
  Slide,
  Grid,
} from '@material-ui/core';

import { TransitionProps } from '@material-ui/core/transitions';
import Paper, { PaperProps } from '@material-ui/core/Paper';

import { MovieDetails } from '../api';
import { MoviePoster, Error } from '../components';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    dialog: {
      borderRadius: 0,
    },
    button: {
      borderRadius: 0,
    },
    circularProgress: {
      margin: '5rem 0',
    },
  })
);

export interface MovieDetailsProps {
  open: boolean;
  movieDetails?: MovieDetails;
  onClose: () => void;
  error: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps, // & {children?: React.ReactElement<any, any> }
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogPaper = (props: PaperProps) => {
  return <Paper {...props} variant="outlined" square />;
};
/**
 * @todo Fix : Warning: findDOMNode is deprecated in StrictMode.
 *            findDOMNode was passed an instance of Transition which is inside
 *            StrictMode.
 * @todo Talk to machine/store directly once they're plugged in.
 */
export const MoviePopUp = ({
  open,
  movieDetails,
  onClose,
  error,
}: MovieDetailsProps) => {
  const classes = useStyles();

  const content = movieDetails ? (
    <>
      <DialogTitle>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            {movieDetails.Title} ({movieDetails.Year})
          </Grid>
          <Grid item>
            <IconButton aria-label="close" onClick={onClose}>
              <Icon>close</Icon>
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <div className={classes.root}>
          <Grid
            container
            direction="row"
            spacing={2}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} md={5} direction="row" justify="center">
              <MoviePoster
                url={movieDetails.Poster}
                title={movieDetails.Title}
                width="auto"
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <p>{movieDetails.Plot}</p>
              <p>{movieDetails.Actors}</p>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
    </>
  ) : error ? (
    <Error msg={error} />
  ) : (
    <Grid container direction="row" justify="center">
      <CircularProgress size={200} className={classes.circularProgress} />
    </Grid>
  );
  return (
    <Dialog
      onClose={onClose}
      aria-label={
        movieDetails ? `synopsis of ${movieDetails.Title}` : 'loading content'
      }
      open={open}
      PaperComponent={DialogPaper}
      TransitionComponent={Transition}
      onEscapeKeyDown={onClose}
      className={classes.dialog}
      maxWidth="md"
      fullWidth
      keepMounted
    >
      {content}
      <DialogActions>
        <Button variant="outlined" className={classes.button} onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
