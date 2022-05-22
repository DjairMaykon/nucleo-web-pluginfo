import { DefaultError } from '@commons/DefaultError';
import axios from 'axios';
import { AxiosApiService } from './AxiosApiService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosApiService', () => {
  it('should perform a get request on discover/movie/ when call getMovies without query parameter', async () => {
    const axiosApiService = new AxiosApiService('', '');

    mockedAxios.create = jest.fn(() => mockedAxios);
    mockedAxios.get.mockResolvedValue({
      data: {
        results: [
          {
            genre_ids: [1, 2, 3],
            id: 1,
            backdrop_path: 'img.jpg',
            poster_path: 'img.jpg',
            original_language: 'en',
            original_title: 'title original',
            title: 'title',
            adult: true,
            overview: 'overview',
            release_date: '01-01-1999',
            vote_average: 7.6,
          },
          {
            genre_ids: [4, 5],
            id: 2,
            backdrop_path: 'img2.jpg',
            poster_path: 'img2.jpg',
            original_language: 'pt',
            original_title: 'title2 original',
            title: 'title2',
            adult: false,
            overview: 'overview2',
            release_date: '02-01-1999',
            vote_average: 7.5,
          },
        ],
      },
    });

    const expectedMovies = [
      {
        genres: [1, 2, 3],
        id: 1,
        imagesPath: {
          backdropPath: process.env.TMDB_IMAGE_URL + '/w1280' + 'img.jpg',
          posterPath: process.env.TMDB_IMAGE_URL + '/w500' + 'img.jpg',
        },
        originalTitle: 'title original',
        title: 'title',
        originalLanguage: 'en',
        isAdult: true,
        overview: 'overview',
        releaseDate: '01-01-1999',
        voteAverage: 7.6,
      },
      {
        genres: [4, 5],
        id: 2,
        imagesPath: {
          backdropPath: process.env.TMDB_IMAGE_URL + '/w1280' + 'img2.jpg',
          posterPath: process.env.TMDB_IMAGE_URL + '/w500' + 'img2.jpg',
        },
        originalTitle: 'title2 original',
        title: 'title2',
        originalLanguage: 'pt',
        isAdult: false,
        overview: 'overview2',
        releaseDate: '02-01-1999',
        voteAverage: 7.5,
      },
    ];

    const movies = await axiosApiService.getMovies();

    expect(movies).toEqual(expectedMovies);
    expect(mockedAxios.get).toBeCalledWith('discover/movie/', {});
  });
  it('should perform a get request on search/movie/ when call getMovies with query parameter', async () => {
    const axiosApiService = new AxiosApiService('', '');

    mockedAxios.create = jest.fn(() => mockedAxios);

    await axiosApiService.getMovies({ query: 'teste' });

    expect(mockedAxios.get).toBeCalledWith('search/movie/', { params: { query: 'teste' } });
  });
  it('should perform a get request on search/movie/ with param release_date.lte = undefined when call getMovies with query and release_date.lte parameter', async () => {
    const axiosApiService = new AxiosApiService('', '');

    mockedAxios.create = jest.fn(() => mockedAxios);

    await axiosApiService.getMovies({ query: 'teste', 'release_date.lte': '2022-02-02' });

    expect(mockedAxios.get).toBeCalledWith('search/movie/', { params: { query: 'teste', 'release_date.lte': undefined } });
  });
  it('shold throw default error if error status be 401 or 422', async () => {
    const axiosApiService = new AxiosApiService('', '');

    mockedAxios.create = jest.fn(() => mockedAxios);

    mockedAxios.get.mockRejectedValue({ response: { status: 401 } });
    try {
      await axiosApiService.getMovies();
    } catch (e) {
      expect(e).toBeInstanceOf(DefaultError);
      expect((e as DefaultError).getDefaultMessage()).toEqual('Api Key unauthorized');
    }

    mockedAxios.get.mockRejectedValue({ response: { status: 422 } });
    try {
      await axiosApiService.getMovies();
    } catch (e) {
      expect(e).toBeInstanceOf(DefaultError);
      expect((e as DefaultError).getDefaultMessage()).toEqual('Pagination exceeded limit');
    }
  });
});
