import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/header";
import { MovieCard } from "./components/movie_card";
import api from "./service/api";
import { Movie } from "./util/types";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    api.get("/movie").then((response) => {
      setMovies(
        response.data.map((element: any) => {
          return {
            id: element.id,
            title: element.title,
            originalTitle: element.originalTitle,
            overview: element.overview,
            voteAverage: element.voteAverage,
            imagesPath: {
              backdropPath: element.imagesPath.backdropPath,
              posterPath: element.imagesPath.posterPath,
            },
            releaseDate: element.releaseDate,
            genres: element.genres,
          };
        })
      );
    });
  }, []);

  return (
    <>
      <Header />
      <div className="w-fit mx-auto my-5 flex flex-wrap gap-3 justify-center">
        {movies.length > 0
          ? movies.map((movie, index) => {
              return <MovieCard key={index} movie={movie} />;
            })
          : [...Array(20)].map((e, i) => {
              return (
                <div
                  key={i}
                  className="rounded-md animate-pulse bg-gray-300 flex w-[225px] h-[337.5px]"
                ></div>
              );
            })}
      </div>
    </>
  );
}

export default App;
