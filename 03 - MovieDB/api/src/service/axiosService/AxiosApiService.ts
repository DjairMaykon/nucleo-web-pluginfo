import axios from 'axios';
import { ApiService } from '@service/ApiService';
import { getMoviesParams, Movie } from '@controllers/Movie.controller';
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

    await axios
      .get('discover/movie/', { params })
      .then((response) => {
        response.data.results.forEach((element: any) => {
          movies.push({
            genres: element.genre_ids as number[],
            id: element.id as number,
            imagesPath: {
              backdropPath: (process.env.TMDB_IMAGE_URL + '/w1280' + element.backdrop_path) as string,
              posterPath: (process.env.TMDB_IMAGE_URL + '/w500' + element.poster_path) as string,
            },
            title: element.title as string,
            originalTitle: element.original_title as string,
            overview: element.overview as string,
            voteAverage: element.vote_average as number,
            releaseDate: element.release_date as string,
          });
        });
      })
      .catch((error) => {
        if ([401, 422].includes(error.response.status)) throw new DefaultError(error.response.status as number);
      });

    return movies;
  }
}
