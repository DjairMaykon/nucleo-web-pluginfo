import { getMoviesParams, MovieController } from '@controllers/Movie.controller';
import { AxiosApiService } from '@service/axiosService/AxiosApiService';
import express, { NextFunction, Request, Response } from 'express';

export const routes = express.Router();

routes.use(express.json());

routes.get('/movie', async (req: Request<unknown, unknown, unknown, getMoviesParams>, res: Response, next: NextFunction) => {
  const controller = new MovieController(new AxiosApiService('https://api.themoviedb.org/3/', process.env.TMDB_API_KEY ?? ''));
  try {
    const result = await controller.list({
      language: req.query.language,
      page: req.query.page,
      sort_by: req.query.sort_by,
    });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});
