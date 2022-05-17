import { ApiService } from '@service/ApiService';

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
};

export type Movie = {
  id: number;
  originalTitle: string;
  overview: string;
  popularity: number;
  imagesPath: {
    backdropPath: string;
    posterPath: string;
  };
  releaseDate: string;
  genres: number[];
};

export class MovieController {
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
  }
  async list(params?: getMoviesParams) {
    return await this.apiService.getMovies(params);
  }
}
