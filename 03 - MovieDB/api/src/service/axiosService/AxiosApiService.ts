import axios from 'axios';
import { ApiService } from '@service/ApiService';
import { getMoviesParams, Movie } from '@controllers/Movie.controller';
import { getGenresParams, Genre } from '@controllers/Genre.controller';
import { DefaultError } from '@commons/DefaultError';

export class AxiosApiService implements ApiService {
  url: string;
  apiKey: string;
  constructor(url: string, apiKey: string) {
    this.url = url;
    this.apiKey = apiKey;
  }

  private async getAxiosClient() {
    return await axios.create({
      baseURL: this.url,
      params: {
        api_key: this.apiKey,
      },
    });
  }

  async getMovies(params?: getMoviesParams): Promise<Movie[]> {
    const movies: Movie[] = [];

    const axios = await this.getAxiosClient();

    const rota = params?.query ? 'search/movie/' : 'discover/movie/';

    if (params?.query && params['release_date.lte']) {
      params['release_date.lte'] = undefined;
    }

    await axios
      .get(rota, { params })
      .then((response) => {
        response.data.results.forEach((element: any) => {
          movies.push({
            genres: element.genre_ids as number[],
            id: element.id as number,
            imagesPath: {
              backdropPath: element.backdrop_path && ((process.env.TMDB_IMAGE_URL + '/w1280' + element.backdrop_path) as string),
              posterPath: element.poster_path && ((process.env.TMDB_IMAGE_URL + '/w500' + element.poster_path) as string),
            },
            title: element.title as string,
            originalTitle: element.original_title as string,
            originalLanguage: element.original_language as string,
            isAdult: element.adult as boolean,
            overview: element.overview as string,
            voteAverage: element.vote_average as number,
            releaseDate: element.release_date as string,
          });
        });
      })
      .catch((error) => {
        if ([401, 422].includes(error.response.status)) throw new DefaultError(error.response.status);
      });

    return movies;
  }

  async getGenres(params?: getGenresParams): Promise<Genre[]> {
    const genres: Genre[] = [];

    const axios = await this.getAxiosClient();

    await axios
      .get('genre/movie/list', { params })
      .then((response) => {
        response.data.genres.forEach((element: any) => {
          genres.push({
            id: element.id as number,
            name: element.name as string,
          });
        });
      })
      .catch((error) => {
        if (error.status == 401) throw new DefaultError(error.response.status);
      });

    return genres;
  }
}
