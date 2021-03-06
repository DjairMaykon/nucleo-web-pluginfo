import { ApiService } from '@service/ApiService';
import { NextFunction, Request, Response } from 'express';

export type getMoviesParams = {
  language?: 'en-US' | 'pt-BR';
  sort_by?:
    | 'popularity.asc'
    | 'popularity.desc'
    | 'release_date.asc'
    | 'release_date.desc'
    | 'revenue.asc'
    | 'revenue.desc'
    | 'primary_release_date.asc'
    | 'primary_release_date.desc'
    | 'original_title.asc'
    | 'original_title.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'vote_count.asc'
    | 'vote_count.desc';
  page?: number;
  'release_date.lte'?: string;
  query?: string;
};

export type Movie = {
  id: number;
  title: string;
  originalTitle: string;
  originalLanguage: string;
  isAdult: boolean;
  overview: string;
  voteAverage: number;
  imagesPath: {
    backdropPath?: string;
    posterPath?: string;
  };
  releaseDate: string;
  genres: number[];
};

export class MovieController {
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
  }

  async list(req: Request<unknown, unknown, unknown, getMoviesParams>, res: Response, next: NextFunction) {
    try {
      const result = await this.apiService.getMovies({
        language: req.query.language,
        page: req.query.page,
        sort_by: req.query.sort_by,
        'release_date.lte': req.query['release_date.lte'],
        query: req.query.query,
      });
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
