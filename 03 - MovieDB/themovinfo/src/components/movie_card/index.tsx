import { Movie } from "../../util/types";
import moment from "moment";

import "./style.css";

type MovieCardProps = {
  movie: Movie;
};
export function MovieCard({ movie }: MovieCardProps) {
  function getColorVoteBadge() {
    let color = "bg-lime-800";
    if (movie.voteAverage < 4.5) {
      color = "bg-red-600";
    } else if (movie.voteAverage < 7.5) {
      color = "bg-yellow-500";
    }
    return color;
  }

  return (
    <article className="group w-fit flex flex-col gap-3 items-center rounded-md max-w-lg bg-gradient-to-b from-slate-800 via-slate-600 to-slate-400 pb-4">
      <figure className="w-9/12 relative -top-2">
        <img className="rounded-md" src={movie.imagesPath.posterPath} alt="" />
      </figure>
      <section className="flex flex-col gap-2.5 justify-start w-9/12">
        <header>
          <h2 className="text-2xl text-stone-900 font-bold">{movie.title}</h2>
          <h4 className="text-xs">Titulo original: {movie.originalTitle}</h4>
        </header>
        <div className="flex flex-col gap-1 h-36">
          <div className="flex gap-1 bg-cyan-700 w-fit p-1.5 text-xs rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            {moment(movie?.releaseDate, "YYYY-MM-DD").format(
              "DD [de] MMM [de] YYYY"
            )}
          </div>
          <p
            style={{ lineClamp: 4 }}
            className="font-lato text-sm font-bold text-stone-800 text-justify"
          >
            {movie.overview}
          </p>
        </div>
      </section>
      <div
        className={`flex gap-2 relative left-[40.8%] bottom-[90%] ${getColorVoteBadge()} w-[25%] p-2 before:content('') before:border-8 before:border-l-transparent before:border-b-transparent before:border-t-transparent before:absolute before:right-1 before:-bottom-2 before:rotate-45 before:block text-zinc-200`}
      >
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        100%
      </div>
    </article>
  );
}
