//------------------------------------------------------------------------- Omdb
/**
 *
 */

/**
 * Define an Utility Type that requires ("select") a given keys sets R from
 * a given type schema T and making all other keys from T optional.
 *
 * This allows defining a data schema in one place, and specifying requirement
 * specs in context where it is used with some degree of forward compatibilty.
 *
 * The intent is made clear : "Here I need this type of thing with at least this
 * keys defined".
 *
 * Inspired by Rich Hickey talk "Maybe Not" on clojure specs.
 */

type Select<T, R extends keyof T> = Partial<T> & Pick<T, R>;

/**
 * Define Movie schema as used in the app, i.e. the interesting bits from a
 * possibly richer schema.
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

const MovieSearchDemo: MovieSearchResult = {
  Title: 'yeah',
  Year: '1980',
  imdbID: '3832823',
  Poster: 'urllllll',
  Actors: 'Brangelina Jaylo',
};

const MovieDetailsDemo: MovieDetails = Object.assign({
  Plot : 'Two sisters battle the Miami mafia in penguins suits.',
  Actors : 'Sonia Crockit, Michelle Vedette',
}, MovieSearchDemo);

console.log(MovieSearchDemo,MovieDetailsDemo);
/**
 * Fetchy methods shall return some union like MovieSearchResult | null to
 * report failures.
 */


 /**
  * Jeeeeesst !
  */