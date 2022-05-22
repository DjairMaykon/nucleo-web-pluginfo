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
  const [movieSearch, setMovieSearch] = useState<string | null>(null);

  const loadMoreRef = useRef(null);
  const inputRef = useRef(null);

  function onSelectTab(tab: string) {
    setMovieSearch("");
    setMoviesPage(1);
    setMovies([]);
    setMoviesSort(tabs[tab as "Popular" | "Recente" | "Mais votados"]);
  }

  function handleSearch(search: string) {
    setMoviesPage(1);
    setMovies([]);
    setMovieSearch(search);
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
    api
      .get<Movie[]>("/movie", {
        params: {
          query: movieSearch,
          language: "pt-BR",
          page: moviesPage,
          sort_by: moviesSort,
          "release_date.lte": moment().format("YYYY-MM-DD"),
        },
      })
      .then((response) => {
        setMovies([...movies, ...response.data]);
        if (moviesPage == 500 || response.data.length == 0) {
          setHasItensToLoad(false);
        }
      });
  }, [moviesPage, moviesSort, movieSearch]);
  return (
    <>
      <Header />
      <main className="flex flex-col gap-10 w-11/12 mx-auto my-6">
        <div className="flex flex-col md:flex-row gap-5 justify-between">
          <div className="flex items-center md:order-1 border-b-2 w-full p-2 md:w-2/5 text-zinc-200 ">
            <input
              ref={inputRef}
              value={movieSearch ?? ""}
              onChange={(event) => {
                handleSearch(event.target.value);
              }}
              type="text"
              className="pl-1 font-lato font-bold text-lg flex-1 bg-transparent focus:outline-none"
            />
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <Tabs tabs={Object.keys(tabs)} onSelectTab={onSelectTab} />
        </div>
        <div className="flex flex-wrap gap-10 justify-center w-full">
          {movies.map((movie, index) => {
            return <MovieCard key={index} movie={movie} />;
          })}
          {hasItensToLoad && (
            <article
              ref={loadMoreRef}
              className="group w-full h-[35rem] md:h-[353px] animate-pulse flex flex-col gap-3 items-center rounded-md max-w-md bg-slate-400"
            />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
