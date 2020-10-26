import { combineReducers } from '@reduxjs/toolkit';
import movieSearchBarReducer from '../features/movieSearchBarSlice';

const rootReducer = combineReducers({
  movieSearchBar: movieSearchBarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
