//------------------------------------------------------------------------- Omdb
/**
 *
 */
import { Select } from '../utils';

import placeholderSearchResults from './placeholderSearchResults';

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

function placeholderGetMovies(): Promise<MovieSearchResult[]> {
  console.log('fake fetching ...');
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (Math.round(Math.random())) {
        resolve(placeholderSearchResults);
      } else {
        reject('fake loading error !');
      }
    }, 1000);
  });
}

export class Omdb {
  static buildUrl = (key: string, by: string, value: string) =>
    `https://www.omdbapi.com/?apikey=${key}&type=movie&${by}=${value}`;

  static by = {
    ID: 'i',
    type: 'type',
    title: 't',
    search: 's',
  };

  _APIKey: string;

  /** Naïve mockable wrapper.  */
  async _fetch(input: RequestInfo, init?: RequestInit) {
    return fetch(input, init);
  }

  constructor(APIkey: string) {
    this._APIKey = APIkey;
  }

  async getMoviesByTitleAsync(
    searchFor: string,
    controller?: AbortController
  ): Promise<MovieSearchResult[]> {
    // console.log(Omdb.buildUrl(this._APIKey, Omdb.by.search, searchFor));
    // return placeholderGetMovies();
    // const controller = new AbortController();
    const response = await this._fetch(
      Omdb.buildUrl(this._APIKey, Omdb.by.search, searchFor),
      controller ? { signal: controller.signal } : {}
    );

    if (response.status >= 400 && response.status < 600) {
      throw new Error(
        `${response.status} : error while contacting omdbapi.com !`
      );
    }

    return response.json();
  }
}

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
