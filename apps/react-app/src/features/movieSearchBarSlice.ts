import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieSearchResult } from '../api'; // , MovieDetails
import { Select } from '../utils';

/**
 * @note Having searchFor nullable will require a guard on SEARCH/searchMovies.
 */
interface MovieSearchContext {
  /** @todo Consider refering to movieMachine keys. */
  current: 'idle' | 'loading' | 'listing' | 'failure' | 'details';
  searchFor: string | null;
  searchResults: MovieSearchResult[];
  totalResults: number | null;
  page: number | null;
  imdbID: string | null;
  error: string | null;
}

// type MovieSearchPayload = Pick<MovieSearchContext, 'current' | 'searchResults'>;
type MovieSearchPayload = Select<MovieSearchContext, 'current'>;

type CurrentSearch = Pick<MovieSearchContext, 'searchFor'>;

const initialState: MovieSearchContext = {
  current: 'idle',
  searchFor: null,
  searchResults: [],
  totalResults: null,
  page: null,
  imdbID: null,
  error: null,
};

const movieSearchBarSlice = createSlice({
  name: 'movieSearchBar',
  initialState,
  reducers: {
    searchMovies(state, action: PayloadAction<CurrentSearch>) {
      const { searchFor } = action.payload;
      state.searchFor = searchFor;
      state.current = 'loading';
    },
    setMovieSearchContext(state, action: PayloadAction<MovieSearchPayload>) {
      const {
        current,
        searchResults = null,
        totalResults = null,
        page = null,
        error = null,
      } = action.payload;
      state.current = current;
      state.searchResults = searchResults;
      state.totalResults = totalResults;
      state.page = page;
      state.error = error;
    },
  },
});

export const {
  searchMovies,
  setMovieSearchContext,
} = movieSearchBarSlice.actions;

export default movieSearchBarSlice.reducer;
