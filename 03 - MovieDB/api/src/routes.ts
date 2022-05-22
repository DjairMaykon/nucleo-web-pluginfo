import { GenreController } from '@controllers/Genre.controller';
import { MovieController } from '@controllers/Movie.controller';
import { AxiosApiService } from '@service/axiosService/AxiosApiService';
import express from 'express';

export const routes = express.Router();

routes.use(express.json());

routes.get('/movie', (req, res, next) => {
  const controller = new MovieController(
    new AxiosApiService(process.env.TMDB_API_URL ?? 'https://api.themoviedb.org/3/', process.env.TMDB_API_KEY ?? ''),
  );
  controller.list(req, res, next);
});

routes.get('/genre', (req, res, next) => {
  const controller = new GenreController(
    new AxiosApiService(process.env.TMDB_API_URL ?? 'https://api.themoviedb.org/3/', process.env.TMDB_API_KEY ?? ''),
  );
  controller.list(req, res, next);
});
