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

    const mockSearchResult = {
      Response: 'True',
      totalResults: '1',
      Search: [
        {
          Title: 'The Matrix',
          Year: '1999',
          imdbID: 'testID',
          Type: 'movie',
          Poster: 'https://m.media-amazon.com/images/M/MV_V1_SX300.jpg',
        },
      ],
    };

    const mockDetailsResult = {
      Response: 'True',
      Title: 'The Matrix',
      Year: '1999',
      imdbID: 'testID',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV_V1_SX300.jpg',
      Actors: 'Keanu Reeves, Alex Winter',
      Plot: 'Non-heinous dudes in most bogus computer.',
    };

    const mockFailure = { Response: 'False', Error: 'Invalid API key!' };

    beforeEach(() => {
      omdb = new Omdb('TestApiKey');
    });
    //--------------------------------------------------------------------------
    it('can fetch a list of movies given a search string when server return a successful response', async () => {
      const mockResponse = {
        status: 200,
        ok: true,
        json: () => Promise.resolve(mockSearchResult),
      };
      jest
        .spyOn(omdb, '_fetch')
        .mockImplementation(
          () => Promise.resolve(mockResponse) as Promise<Response>
        );

      expect(await omdb.getMoviesByTitleAsync('TestMovie')).toEqual(
        [mockSearchResult.Search, 1, 1]
      );
      expect(omdb._fetch).toHaveBeenCalledWith(
        'https://www.omdbapi.com/?apikey=TestApiKey&type=movie&s=TestMovie',
        {}
      );
    });
    //--------------------------------------------------------------------------
    it('throws if anything goes wrong when fetching a list of movies', async () => {
      const mockResponse = {
        status: 401,
        statusText: 'Unauthorized',
        ok: false,
        json: () => Promise.resolve(mockFailure),
      };
      jest
        .spyOn(omdb, '_fetch')
        .mockImplementation(
          () => Promise.resolve(mockResponse) as Promise<Response>
        );

      expect.assertions(2);
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
    it('can abort an in-flight request for a list of movies', async () => {
      const mockResponse = {
        status: 200,
        ok: true,
        json: () => Promise.resolve(mockSearchResult),
      };

      jest
        .spyOn(omdb, '_fetch')
        .mockImplementation(
          () => Promise.resolve(mockResponse) as Promise<Response>
        );

      expect.assertions(2);

      const controller = new AbortController();
      expect(await omdb.getMoviesByTitleAsync('TestMovie', controller)).toEqual(
        [mockSearchResult.Search, 1, 1]
      );

      expect(
        omdb._fetch
      ).toHaveBeenCalledWith(
        'https://www.omdbapi.com/?apikey=TestApiKey&type=movie&s=TestMovie',
        { signal: controller.signal }
      );
    });
    //--------------------------------------------------------------------------
    it("can fetch a movie's details given its imdbID when server return a successful response", async () => {
      const mockResponse = {
        status: 200,
        ok: true,
        json: () => Promise.resolve(mockDetailsResult),
      };
      jest
        .spyOn(omdb, '_fetch')
        .mockImplementation(
          () => Promise.resolve(mockResponse) as Promise<Response>
        );

      expect(await omdb.getMovieDetailsAsync('testID')).toEqual(
        mockDetailsResult
      );
      expect(omdb._fetch).toHaveBeenCalledWith(
        'https://www.omdbapi.com/?apikey=TestApiKey&type=movie&i=testID',
        {}
      );
    });
    //--------------------------------------------------------------------------
    it("throws if anything goes wrong when fetching a movie's details", async () => {
      const mockResponse = {
        status: 401,
        statusText: 'Unauthorized',
        ok: false,
        json: () => Promise.resolve(mockFailure),
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
    //--------------------------------------------------------------------------
    it("can abort an in-flight request for a movie's details", async () => {
      const mockResponse = {
        status: 200,
        ok: true,
        json: () => Promise.resolve(mockDetailsResult),
      };

      jest
        .spyOn(omdb, '_fetch')
        .mockImplementation(
          () => Promise.resolve(mockResponse) as Promise<Response>
        );

      expect.assertions(2);

      const controller = new AbortController();
      expect(await omdb.getMovieDetailsAsync('testID', controller)).toEqual(
        mockDetailsResult
      );

      expect(
        omdb._fetch
      ).toHaveBeenCalledWith(
        'https://www.omdbapi.com/?apikey=TestApiKey&type=movie&i=testID',
        { signal: controller.signal }
      );
    });
  });
});
