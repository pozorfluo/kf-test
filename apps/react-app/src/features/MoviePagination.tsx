import React from 'react';

import { Icon, Button, ButtonGroup } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';

export interface MoviePaginationProps {
  setPage: (page: number) => void;
}

export const MoviePagination = ({ setPage }: MoviePaginationProps) => {
  const { page, totalResults } = useSelector(
    (state: RootState) => state.movieSearchBar
  );
  const lastPage = Math.ceil(totalResults / 10);

  const onPrevious = () => {
    const previous = page - 1;
    setPage(previous < 1 ? 1 : previous);
  };
  const onNext = () => {
    const next = page + 1;
    setPage(next > lastPage ? lastPage : next);
  };

  return (
    <ButtonGroup
      variant="text"
      color="primary"
      aria-label="result pagination buttons"
    >
      <Button onClick={onPrevious} disabled={!(page > 1)}>
        <Icon>arrow_back_ios</Icon>
      </Button>
      <Button disabled>{page}</Button>
      <Button onClick={onNext} disabled={!(page < lastPage)}>
        <Icon>arrow_forward_ios</Icon>
      </Button>
    </ButtonGroup>
  );
};
