import { getMoviesParams, Movie } from '@controllers/Movie.controller';

export interface ApiService {
  url: string;
  apiKey: string;
  getMovies: (params?: getMoviesParams) => Promise<Movie[]>;
}
