import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Icon, Paper } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    error: {
      opacity: '85%',
      color: '#f44336',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      '&:hover': {
        opacity: '100%',
      },
      '&:focus': {
        opacity: '100%',
      },
    },
    icon: {
      padding: '0.5rem',
    },
  })
);

interface ErrorProps {
  msg: string;
}

export const Error = ({ msg }: ErrorProps) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.error} square>
      <Icon className={classes.icon}>error</Icon> {msg} Try again.
    </Paper>
  );
};
