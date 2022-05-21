import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Carousel } from "./components/carousel";
import { Header } from "./components/header";
import { MovieCard } from "./components/movie_card";
import { Tabs } from "./components/tabs";
import api from "./service/api";
import { Movie } from "./util/types";

const tabs = {
  Popular: "popularity.desc",
  Recente: "release_date.desc",
  "Bem votados": "vote_count.desc",
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesPage, setMoviesPage] = useState<number>(1);
  const [moviesSort, setMoviesSort] = useState<string>(tabs.Popular);
  const [loadingItens, setLoadingItens] = useState<boolean>(false);

  function onSelectTab(tab: string) {
    setMoviesSort(tabs[tab as "Popular" | "Recente" | "Bem votados"]);
  }

  useEffect(() => {
    api
      .get("/movie", {
        params: {
          language: "pt-BR",
          page: moviesPage,
          sort_by: moviesSort,
        },
      })
      .then((response) => {
        setMovies(
          response.data.map((element: any) => {
            return {
              id: element.id,
              title: element.title,
              originalTitle: element.originalTitle,
              originalLanguage: element.originalLanguage,
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
  }, [moviesPage, moviesSort]);
  return (
    <>
      <Header />
      <main className="flex flex-col gap-10 w-11/12 mx-auto my-6">
        <Tabs tabs={Object.keys(tabs)} onSelectTab={onSelectTab} />
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
