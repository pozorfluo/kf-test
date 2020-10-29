import { combineReducers } from '@reduxjs/toolkit';
import movieSearchBarReducer from '../features/movieSearchBarSlice';
import movieDetailsReducer from '../features/movieDetailsSlice';

const rootReducer = combineReducers({
  movieSearchBar: movieSearchBarReducer,
  movieDetails: movieDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
