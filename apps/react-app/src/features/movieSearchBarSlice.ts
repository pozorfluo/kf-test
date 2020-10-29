import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk } from '../app/store';
import { MovieSearchResult, MovieDetails } from '../api';
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
  page: number;
  imdbID: string | null;
  movieDetails: MovieDetails | null;
  error: string | null;
}

// type MovieSearchPayload = Pick<MovieSearchContext, 'current' | 'searchResults'>;
type MovieSearchPayload = Select<MovieSearchContext, 'current'>;

type CurrentSearch = Pick<MovieSearchContext, 'searchFor'>;

// type DisplayDetailsPayload =  Pick<MovieSearchContext, 'movieDetails'>;

const initialState: MovieSearchContext = {
  current: 'idle',
  searchFor: null,
  searchResults: [],
  totalResults: null,
  page: 1,
  imdbID: null,
  movieDetails: null,
  error: null,
};

const movieSearchBarSlice = createSlice({
  name: 'movieSearchBar',
  initialState,
  reducers: {
    searchMovies(state, action: PayloadAction<CurrentSearch>) {
      const { searchFor } = action.payload;
      state.searchFor = searchFor;
      state.page = 1;
      state.totalResults = null;
      state.current = 'loading';
    },

    // displayDetails(state, action: PayloadAction<DisplayDetailsPayload>) {

    // },

    setPage(state, action: PayloadAction<number>) {
      state.current = 'loading';
      state.page = action.payload;
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
      if (page) {
        state.page = page;
      }
      state.error = error;
    },
  },
});

export const {
  searchMovies,
  setMovieSearchContext,
  setPage,
} = movieSearchBarSlice.actions;

export default movieSearchBarSlice.reducer;
