import { Omdb } from '.';

//------------------------------------------------------------------------------
describe('Omdb', () => {
  //----------------------------------------------------------------------------
  it('can create a new instance given an API key string', () => {
    expect(new Omdb('TestApiKey')).toEqual(expect.any(Omdb));
  });
  //----------------------------------------------------------------------------
  describe('async requests', () => {
    let omdb: Omdb;

    beforeEach(() => {
      omdb = new Omdb('TestApiKey');
    });
    //--------------------------------------------------------------------------
    it('can fetch a list of movie when server return a successful response', async () => {
      const mockData = [
        {
          Title: 'The Matrix',
          Year: '1999',
          imdbID: 'tt0133093',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        },
      ];
      // const mockFetchPromise = Promise.resolve({
      const mockResponse = {
        status: 200,
        json: () => Promise.resolve(mockData),
      };
      jest
        .spyOn(omdb, '_fetch')
        .mockImplementation(
          () => Promise.resolve(mockResponse) as Promise<Response>
        );

      // expect(omdb._fetch).toHaveBeenCalledTimes(1);
      expect(await omdb.getMoviesByTitleAsync('TestMovie'));
      expect(omdb._fetch).toHaveBeenCalledWith(
        'https://www.omdbapi.com/?apikey=TestApiKey&type=movie&s=TestMovie', {}
      );

      // omdb._fetch = jest.fn(() => Promise.resolve(mockResponse));
    });
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
});
