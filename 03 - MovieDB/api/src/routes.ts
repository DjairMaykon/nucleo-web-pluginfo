import { MovieController } from '@controllers/Movie.controller';
import { AxiosApiService } from '@service/axiosService/AxiosApiService';
import express from 'express';

export const routes = express.Router();

routes.use(express.json());

routes.get('/movie', (req, res, next) => {
  const controller = new MovieController(new AxiosApiService('https://api.themoviedb.org/3/', process.env.TMDB_API_KEY ?? ''));
  controller.list(req, res, next);
});
