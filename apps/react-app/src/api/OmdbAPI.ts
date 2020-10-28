//------------------------------------------------------------------------- Omdb
/**
 * @note Ignoring pagination for now.
 * @note Gotcha : For some reason omdbapi.com returns a Response status as a
 *       string, NOT A BOOLEAN.
 */
import { Select } from '../utils';

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

type OmbdAPIResponse = {
  Response: 'True' | 'False';
  Error?: string;
  Search?: MovieSearchResult[];
  [extension: string]: unknown;
} & Partial<MovieDetails>;

type OmdbAPISearchSuccess = Select<OmbdAPIResponse, 'Response' | 'Search'>;
type OmdbAPIDetailsSuccess = OmbdAPIResponse & MovieDetails;

/**
 *
 */
function isSearchSuccess(res: OmbdAPIResponse): res is OmdbAPISearchSuccess {
  //   return (res as OmdbAPISearchSuccess).Search !== undefined;
  return res.Response === 'True' && 'Search' in res;
}

/**
 * @todo Go further with asserting completeness of MovieDetails schema or loosen
 *       promise of getMovieDetailsAsync return type to a Partial ?
 */
function isDetailsSuccess(res: OmbdAPIResponse): res is OmdbAPIDetailsSuccess {
  return res.Response === 'True' && 'Title' in res;
}

/**
 *
 */
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

  constructor(APIkey: string) {
    this._APIKey = APIkey;
  }

  /** Naïve mockable wrapper.  */
  async _fetch(input: RequestInfo, init?: RequestInit) {
    return fetch(input, init);
  }

  /**
   *
   */
  async _request(
    url: string,
    controller?: AbortController
  ): Promise<OmbdAPIResponse> {
    const response = await this._fetch(
      url,
      controller ? { signal: controller.signal } : {}
    );

    const result = await response.json();

    // if (response.ok && result.Response === 'True') {
    if (response.ok) {
      return result;
    } else {
      throw new Error(
        `Error ${response.status} ${response.statusText} : ${
          result.Error || 'while contacting omdbapi.com !'
        }`
      );
    }
  }

  /**
   *
   */
  async getMoviesByTitleAsync(
    searchFor: string,
    controller?: AbortController
  ): Promise<MovieSearchResult[]> {
    const result = await this._request(
      Omdb.buildUrl(this._APIKey, Omdb.by.search, searchFor),
      controller
    );

    if (isSearchSuccess(result)) {
      return result.Search;
    } else {
      throw new Error(
        result.Error || 'Unspecified error with returned search results.'
      );
    }
  }

  /**
   *
   */
  async getMovieDetailsAsync(
    imdbID: string,
    controller?: AbortController
  ): Promise<MovieDetails> {
    const result = await this._request(
      Omdb.buildUrl(this._APIKey, Omdb.by.ID, imdbID),
      controller
    );

    if (isDetailsSuccess(result)) {
      return result;
    } else {
      throw new Error(
        result.Error || 'Unspecified error with returned details results.'
      );
    }
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

// import placeholderSearchResults from './placeholderSearchResults';

// function placeholderGetMovies(): Promise<MovieSearchResult[]> {
//   console.log('fake fetching ...');
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       if (Math.round(Math.random())) {
//         resolve(placeholderSearchResults);
//       } else {
//         reject('fake loading error !');
//       }
//     }, 1000);
//   });
// }
