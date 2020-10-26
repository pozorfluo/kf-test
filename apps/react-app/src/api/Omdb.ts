//------------------------------------------------------------------------- Omdb
/**
 *
 */
import {Select} from '../utils';

/**
 * Define a "filled" Movie schema as used in the app, i.e. the interesting bits 
 * from a possibly richer schema.
 */
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string; // URL;
  Plot: string;
  Actors: string;
  [extension: string]: unknown;
}

export type MovieSearchResult = Select<
  Movie,
  'Title' | 'Year' | 'imdbID' | 'Poster'
>;

export type MovieDetails = Select<Movie, 'Plot' | 'Actors'> & MovieSearchResult;

// const MovieSearchDemo: MovieSearchResult = {
//   Title: 'yeah',
//   Year: '1980',
//   imdbID: '3832823',
//   Poster: 'urllllll',
//   Actors: 'Brangelina Jaylo',
// };

// const MovieDetailsDemo: MovieDetails = Object.assign({
//   Plot : 'Two sisters battle the Miami mafia in penguin suits.',
//   Actors : 'Sonia Crockit, Michelle Vedette',
// }, MovieSearchDemo);

// console.log(MovieSearchDemo,MovieDetailsDemo);

/**
 * Fetchy methods shall return some union like MovieSearchResult | null to
 * report failures.
 */


 /**
  * Jeeeeesst !
  */