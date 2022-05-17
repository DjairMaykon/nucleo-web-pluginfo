import { MovieController } from './Movie.controller';

const apiServiceGetMoviesSpy = jest.fn();

describe('Movie Controller', () => {
  it('Should return a list of movies', async () => {
    const movieController = new MovieController({
      apiKey: '',
      url: '',
      getMovies: apiServiceGetMoviesSpy,
    });

    await movieController.list();

    expect(apiServiceGetMoviesSpy).toBeCalledWith(undefined);
  });
});
