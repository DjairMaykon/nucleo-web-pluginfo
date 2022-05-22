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

export type Genre = {
  id: number;
  name: string;
};
