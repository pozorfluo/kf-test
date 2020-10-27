import { Omdb } from '.';

//------------------------------------------------------------------------------
describe('Omdb', () => {
  //----------------------------------------------------------------------------
  it('can create a new instance given an API key string', () => {
    expect(new Omdb('TestApiKey')).toEqual(expect.any(Omdb));
  });
  //----------------------------------------------------------------------------
  describe('static helpers', () => {
    //--------------------------------------------------------------------------
    it('can build query url given an API key, a param name, a param value', () => {
      expect(Omdb.buildUrl('TestApiKey', Omdb.by.title, 'TestMovie')).toBe(
        'https://www.omdbapi.com/?apikey=TestApiKey&type=movie&t=TestMovie'
      );
    });
  });
  //----------------------------------------------------------------------------
  describe('async requests', () => {
    let omdb: Omdb;

    beforeEach(() => {
      omdb = new Omdb('TestApiKey');
    });
    //--------------------------------------------------------------------------
    it('can fetch a list of movies given a search string when server return a successful response', async () => {
      const mockData = [
        {
          Title: 'The Matrix',
          Year: '1999',
          imdbID: 'testID',
          Type: 'movie',
          Poster: 'https://m.media-amazon.com/images/M/MV_V1_SX300.jpg',
        },
      ];
      const mockResponse = {
        status: 200,
        ok: true,
        json: () => Promise.resolve(mockData),
      };
      jest
        .spyOn(omdb, '_fetch')
        .mockImplementation(
          () => Promise.resolve(mockResponse) as Promise<Response>
        );

      expect(await omdb.getMoviesByTitleAsync('TestMovie'));
      expect(omdb._fetch).toHaveBeenCalledWith(
        'https://www.omdbapi.com/?apikey=TestApiKey&type=movie&s=TestMovie',
        {}
      );
    });
    //--------------------------------------------------------------------------
    it('throws if anything goes wrong when fetching a list of movies', async () => {
      const mockData = { Response: 'False', Error: 'Invalid API key!' };
      const mockResponse = {
        status: 401,
        statusText: 'Unauthorized',
        ok: false,
        json: () => Promise.resolve(mockData),
      };
      jest
        .spyOn(omdb, '_fetch')
        .mockImplementation(
          () => Promise.resolve(mockResponse) as Promise<Response>
        );

      expect(async () => {
        await omdb.getMoviesByTitleAsync('TestMovie');
      }).rejects.toThrowError(
        new Error('Error 401 Unauthorized : Invalid API key!')
      );
      expect(omdb._fetch).toHaveBeenCalledWith(
        'https://www.omdbapi.com/?apikey=TestApiKey&type=movie&s=TestMovie',
        {}
      );
    });
    //--------------------------------------------------------------------------
    it("can fetch a movie's details given its imdbID when server return a successful response", async () => {
      const mockData = {
        Title: 'The Matrix',
        Year: '1999',
        imdbID: 'testID',
        Type: 'movie',
        Poster: 'https://m.media-amazon.com/images/M/MV_V1_SX300.jpg',
        Actors: 'Keanu Reeves, Alex Winter',
        Plot: 'Non-heinous dudes in most bogus computer.',
      };

      const mockResponse = {
        status: 200,
        ok: true,
        json: () => Promise.resolve(mockData),
      };
      jest
        .spyOn(omdb, '_fetch')
        .mockImplementation(
          () => Promise.resolve(mockResponse) as Promise<Response>
        );

      expect(await omdb.getMovieDetailsAsync('testID'));
      expect(omdb._fetch).toHaveBeenCalledWith(
        'https://www.omdbapi.com/?apikey=TestApiKey&type=movie&i=testID',
        {}
      );
    });
    //--------------------------------------------------------------------------
    it("throws if anything goes wrong when fetching a movie's details", async () => {
      const mockData = { Response: 'False', Error: 'Invalid API key!' };
      const mockResponse = {
        status: 401,
        statusText: 'Unauthorized',
        ok: false,
        json: () => Promise.resolve(mockData),
      };
      jest
        .spyOn(omdb, '_fetch')
        .mockImplementation(
          () => Promise.resolve(mockResponse) as Promise<Response>
        );

      expect(async () => {
        await omdb.getMovieDetailsAsync('testID');
      }).rejects.toThrowError(
        new Error('Error 401 Unauthorized : Invalid API key!')
      );
      expect(omdb._fetch).toHaveBeenCalledWith(
        'https://www.omdbapi.com/?apikey=TestApiKey&type=movie&i=testID',
        {}
      );
    });
  });
});
