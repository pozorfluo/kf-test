import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieSearchResult } from '../api/OmdbAPI'; // , MovieDetails
import { Select } from '../utils';

/**
 * @note Having searchFor nullable will require a guard on SEARCH/searchMovies.
 */
interface MovieSearchContext {
  /** @todo Consider refering to movieMachine keys. */
  current: 'idle' | 'loading' | 'listing' | 'failure' | 'details';
  searchFor: string | null;
  searchResults: MovieSearchResult[];
  imdbID: string | null;
}

// type MovieSearchPayload = Pick<MovieSearchContext, 'current' | 'searchResults'>;
type MovieSearchPayload = Select<MovieSearchContext, 'current'>;

type CurrentSearch = Pick<MovieSearchContext, 'searchFor'>;

const initialState: MovieSearchContext = {
  current: 'idle',
  searchFor: null,
  searchResults: [],
  imdbID: null,
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
      const { current, searchResults = null } = action.payload;
      state.current = current;
      if (searchResults) {
        state.searchResults = searchResults;
      }
    },
  },
});

export const {
  searchMovies,
  setMovieSearchContext,
} = movieSearchBarSlice.actions;

export default movieSearchBarSlice.reducer;
