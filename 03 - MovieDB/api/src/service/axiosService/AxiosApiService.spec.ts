import { DefaultError } from '@commons/DefaultError';
import axios from 'axios';
import { AxiosApiService } from './AxiosApiService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosApiService', () => {
  it('should perform a get request on /discover/movie/ when call getMovies', async () => {
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
            original_title: 'title',
            overview: 'overview',
            popularity: 5,
            release_date: '01-01-1999',
          },
          {
            genre_ids: [4, 5],
            id: 2,
            backdrop_path: 'img2.jpg',
            poster_path: 'img2.jpg',
            original_title: 'title2',
            overview: 'overview2',
            popularity: 10,
            release_date: '02-01-1999',
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
        originalTitle: 'title',
        overview: 'overview',
        popularity: 5,
        releaseDate: '01-01-1999',
      },
      {
        genres: [4, 5],
        id: 2,
        imagesPath: {
          backdropPath: process.env.TMDB_IMAGE_URL + '/w1280' + 'img2.jpg',
          posterPath: process.env.TMDB_IMAGE_URL + '/w500' + 'img2.jpg',
        },
        originalTitle: 'title2',
        overview: 'overview2',
        popularity: 10,
        releaseDate: '02-01-1999',
      },
    ];

    const movies = await axiosApiService.getMovies();

    expect(movies).toEqual(expectedMovies);
    expect(mockedAxios.get).toBeCalledWith('discover/movie/', { undefined });
  });
  it('shold throw default error if error status be 401 or 422', async () => {
    const axiosApiService = new AxiosApiService('', '');

    mockedAxios.create = jest.fn(() => mockedAxios);
    mockedAxios.get.mockRejectedValue({ response: { status: 401 } });

    try {
      await axiosApiService.getMovies();
    } catch (e) {
      expect(e).toBeInstanceOf(DefaultError);
    }
    mockedAxios.get.mockRejectedValue({ response: { status: 422 } });

    try {
      await axiosApiService.getMovies();
    } catch (e) {
      expect(e).toBeInstanceOf(DefaultError);
    }
  });
});
