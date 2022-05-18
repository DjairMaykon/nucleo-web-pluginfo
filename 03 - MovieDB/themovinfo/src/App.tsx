import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Header } from "./components/header";
import { MovieCard } from "./components/movie_card";
import api from "./service/api";
import { Movie } from "./util/types";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    api
      .get("/movie", {
        params: {
          language: "pt-BR",
        },
      })
      .then((response) => {
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

  function scrollCarousel(left: number) {
    if (carouselRef.current) {
      const atualLeft = carouselRef.current.scrollLeft;
      carouselRef.current.scrollTo({ left: atualLeft + left });
    }
  }

  return (
    <>
      <Header />
      <div className=" my-5 flex relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-12 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          onClick={() => scrollCarousel(-225)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <div className="flex gap-3 overflow-scroll w-full" ref={carouselRef}>
          <div className="flex gap-3 relative">
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
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-12 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          onClick={() => scrollCarousel(225)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </>
  );
}

export default App;
