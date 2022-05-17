import { Request, Response } from 'express';
import { getMoviesParams, MovieController } from './Movie.controller';

const apiServiceGetMoviesSpy = jest.fn();

describe('Movie Controller', () => {
  it('Should return a list of movies', async () => {
    const movieController = new MovieController({
      apiKey: '',
      url: '',
      getMovies: apiServiceGetMoviesSpy,
    });

    const req = {
      query: {} as getMoviesParams,
    } as Request;
    const next = jest.fn;
    await movieController.list(req, {} as Response, next);

    expect(apiServiceGetMoviesSpy).toBeCalledWith({
      language: req.query.language,
      page: req.query.page,
      sort_by: req.query.sort_by,
    });
  });
});
