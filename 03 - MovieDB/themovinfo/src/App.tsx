import moment from "moment";
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
  "Mais votados": "vote_count.desc",
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesPage, setMoviesPage] = useState<number>(1);
  const [moviesSort, setMoviesSort] = useState<string>(tabs.Popular);
  const [hasItensToLoad, setHasItensToLoad] = useState<boolean>(true);

  const loadMoreRef = useRef(null);

  function onSelectTab(tab: string) {
    setMoviesPage(1);
    setMovies([]);
    setMoviesSort(tabs[tab as "Popular" | "Recente" | "Mais votados"]);
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];

      if (target.isIntersecting) {
        setMoviesPage((old) => old + 1);
      }
    }, options);

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
  }, []);

  useEffect(() => {
    if (moviesPage <= 501) {
      console.log(moment().format("YYYY-MM-DD"));
      api
        .get("/movie", {
          params: {
            language: "pt-BR",
            page: moviesPage,
            sort_by: moviesSort,
            "release_date.lte": moment().format("YYYY-MM-DD"),
          },
        })
        .then((response) => {
          setMovies([
            ...movies,
            ...response.data.map((element: any) => {
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
            }),
          ]);
        });
    } else {
      setHasItensToLoad(false);
    }
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
          {hasItensToLoad && (
            <article
              ref={loadMoreRef}
              className="group w-full h-[35rem] animate-pulse flex flex-col gap-3 items-center rounded-md max-w-md bg-slate-400"
            />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
