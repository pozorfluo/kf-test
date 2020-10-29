import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../app/store';
import { Omdb, MovieDetails } from '../api';

interface MovieDetailsContext {
  current: 'idle' | 'loading' | 'failure' | 'details';
  imdbID: string | null;
  movieDetails: MovieDetails | null;
  error: string | null;
}

type CurrentSearch = Pick<MovieDetailsContext, 'imdbID'>;
type MovieDetailsPayload = Pick<MovieDetailsContext, 'movieDetails'>;

const initialState: MovieDetailsContext = {
  current: 'idle',
  imdbID: null,
  movieDetails: null,
  error: null,
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    setFetchImdbID(state, action: PayloadAction<CurrentSearch>) {
      const { imdbID } = action.payload;
      state.movieDetails = null;
      state.imdbID = imdbID;
      state.current = 'loading';
    },
    fetchMovieDetailsSuccess(
      state,
      action: PayloadAction<MovieDetailsPayload>
    ) {
      const { movieDetails } = action.payload;
      state.movieDetails = movieDetails;
      state.error = null;
      state.current = 'details';
    },
    fetchMovieDetailsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.current = 'failure';
    },
    exitMovieDetails(state) {
      state.movieDetails = null;
      state.current = 'idle';
      state.error = null;
    }
  },
});

export const {
  setFetchImdbID,
  fetchMovieDetailsSuccess,
  fetchMovieDetailsFailure,
  exitMovieDetails
} = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;

export const fetchMovieDetailsAsync = (
  imdbID: string,
  APIKey: string
): AppThunk => {
  return async (dispatch) => {
    try {
      // dispatch(setFetchImdbID({ imdbID: imdbID }));
      const omdb = new Omdb(APIKey);
      const result = await omdb.getMovieDetailsAsync(imdbID);
      console.log(result);
      dispatch(fetchMovieDetailsSuccess({ movieDetails: result }));
    } catch (err) {
      dispatch(fetchMovieDetailsFailure(err.message));
    }
  };
};
