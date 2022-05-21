import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Carousel } from "./components/carousel";
import { Header } from "./components/header";
import { MovieCard } from "./components/movie_card";
import api from "./service/api";
import { Movie } from "./util/types";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesPage, setMoviesPage] = useState<number>(1);
  const [loadingItens, setLoadingItens] = useState<boolean>(false);

  useEffect(() => {
    api
      .get("/movie", {
        params: {
          language: "pt-BR",
          page: moviesPage,
          sort_by: "popularity.desc",
        },
      })
      .then((response) => {
        setMovies(
          movies.concat(
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
          )
        );
        setMoviesPage(moviesPage + 1);
      });
  }, []);
  return (
    <>
      <Header />
      <main className="w-11/12 mx-auto my-6">
        <div className="flex flex-wrap gap-10 justify-center w-full">
          {movies.map((movie, index) => {
            return <MovieCard key={index} movie={movie} />;
          })}
        </div>
      </main>
    </>
  );
}

export default App;
