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

  function onRequestItens() {
    setLoadingItens(true);
    api
      .get("/movie", {
        params: {
          language: "pt-BR",
          page: moviesPage,
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
        setLoadingItens(false);
        setMoviesPage(moviesPage + 1);
      });
  }

  return (
    <>
      <Header />
      <Carousel
        loadingItens={loadingItens}
        onRequestItens={() => onRequestItens()}
      >
        {movies.map((movie, index) => {
          return <MovieCard key={index} movie={movie} />;
        })}
      </Carousel>
    </>
  );
}

export default App;
