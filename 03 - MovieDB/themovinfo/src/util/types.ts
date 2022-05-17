export type Movie = {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  voteAverage: number;
  imagesPath: {
    backdropPath: string;
    posterPath: string;
  };
  releaseDate: string;
  genres: number[];
};
