// TO-DO
// > 768px mudar o card
// exibir generos do filme no card do filme
// barra de pesquisa
// tela do filme com:
//     filmes similares e recomendações
//     trailers
//     diretores
//     atores
// menu dropdown para escolher generos
import { Movie } from "../../util/types";
import moment from "moment";

import imageNotFound from "../../assets/image-not-found.jpg";
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
    <article className="group w-fit flex flex-col md:flex-row gap-3 items-center md:items-start md:justify-center md:p-5 rounded-md max-w-md md:max-w-[35rem] bg-gradient-to-b md:bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400">
      <figure className="w-9/12 md:w-8/12 relative -top-2 md:top-0">
        <img
          className="rounded-md"
          src={movie.imagesPath.posterPath ?? imageNotFound}
          alt=""
        />
      </figure>
      <section className="flex flex-col gap-4 justify-start w-9/12 md:w-11/12">
        <header>
          <h2 className="text-2xl text-stone-900 font-bold">{movie.title}</h2>
          <h4 className="text-xs">Titulo original: {movie.originalTitle}</h4>
          <div className="flex gap-1 mt-2">
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
            <div className="bg-[#354e6f] w-fit p-1.5 text-xs rounded-xl">
              Idioma: {movie.originalLanguage}
            </div>
            {movie.isAdult && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 512 512"
              >
                <g fillRule="nonzero">
                  <path d="M230.71 338.25H137.6c-2.66 0-4.59-.63-5.79-1.88-1.19-1.26-1.79-3.28-1.79-6.08v-26.77c0-2.8.6-4.83 1.79-6.08 1.2-1.26 3.13-1.88 5.79-1.88h23.6v-73.88h-19.38c-2.67 0-4.6-.62-5.8-1.87-1.19-1.26-1.79-3.29-1.79-6.09v-26.76c0-2.81.6-4.83 1.79-6.09 1.2-1.25 3.13-1.87 5.8-1.87h61.08c2.67 0 4.6.62 5.8 1.87 1.19 1.26 1.78 3.28 1.78 6.09v108.6h20.23c2.66 0 4.59.62 5.78 1.88 1.2 1.25 1.8 3.28 1.8 6.08v26.77c0 2.8-.6 4.82-1.8 6.08-1.19 1.25-3.12 1.88-5.78 1.88zM412.36 51.79h23.85c4.86 0 8.83 3.98 8.83 8.84V93h32.38c4.86 0 8.83 3.98 8.83 8.84v23.85c0 4.86-3.97 8.84-8.83 8.84h-32.38v32.37c0 4.87-3.97 8.84-8.83 8.84h-23.85c-4.86 0-8.84-3.97-8.84-8.84v-32.37h-32.38c-4.86 0-8.84-3.98-8.84-8.84v-23.85c0-4.86 3.98-8.84 8.84-8.84h32.38V60.63c0-4.86 3.98-8.84 8.84-8.84zm-31.22 229.83v21.46c0 5.74-1.02 10.99-3.05 15.7-2.03 4.72-5.52 8.78-10.43 12.16-4.91 3.4-11.55 6.02-19.9 7.86-8.35 1.84-18.85 2.76-31.49 2.76-12.64 0-23.18-.92-31.59-2.76-8.43-1.84-15.1-4.46-20.01-7.86-4.92-3.38-8.4-7.44-10.43-12.16-2.03-4.71-3.05-9.95-3.05-15.7v-21.46c0-10.32 2.14-18.29 6.42-23.89 4.28-5.59 9.59-9.06 15.9-10.39-4.63-2.07-7.86-5.16-9.68-9.29-1.83-4.13-2.75-10.44-2.75-16.04v-12.83c0-5.46.92-10.33 2.75-14.59 1.81-4.28 4.85-7.94 9.04-10.96 4.22-3.01 9.92-5.35 17.07-6.96 7.16-1.62 16.01-2.44 26.54-2.44 10.53 0 19.35.82 26.44 2.44 7.08 1.61 12.71 3.95 16.85 6.96 4.13 3.02 7.09 6.68 8.84 10.96 1.75 4.26 2.63 9.15 2.63 14.59v12.83c0 5.58-.9 11.91-2.73 16.04-1.83 4.13-5.06 7.22-9.69 9.29 6.32 1.33 11.62 4.8 15.9 10.39 4.29 5.6 6.42 13.58 6.42 23.89zm-79.52-49.54c0 2.29.73 4.31 2.21 5.86 1.47 1.55 6.54 2.32 12.44 2.32 6.04 0 11.12-.79 12.44-2.32 1.31-1.53 2-3.5 2-5.86v-12.62c0-2.22-.68-4.09-2-5.64-1.34-1.55-6.4-2.33-12.44-2.33-5.9 0-10.97.78-12.44 2.33-1.48 1.55-2.21 3.46-2.21 5.64v12.62zm-5.27 62.59c0 2.31 1.21 4.33 3.58 5.86 2.38 1.54 8.76 2.33 16.34 2.33s13.92-.79 16.23-2.33c2.3-1.53 3.47-3.5 3.47-5.86V281.5c0-2.21-1.16-4.09-3.47-5.64-2.32-1.54-8.65-2.32-16.23-2.32s-13.96.78-16.34 2.32c-2.39 1.55-3.58 3.46-3.58 5.64v13.17z" />
                  <path d="M173.37 65.08 380 422.99c8.18-6.08 15.88-12.74 23.07-19.92 37.62-37.63 60.91-89.63 60.91-147.07 0-16.73-1.98-32.99-5.71-48.57 14.97-8.37 26.3-23.98 39.12-36.88C506.85 197.28 512 226.04 512 256c0 70.68-28.66 134.69-74.99 181.01C390.69 483.34 326.68 512 256 512c-70.68 0-134.69-28.66-181.02-74.99C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.69 74.98-181.02C121.31 28.66 185.32 0 256 0c43.4 0 84.28 10.82 120.1 29.88-16.68 10.8-27.45 21.04-36 35.85-25.71-11.38-54.17-17.71-84.1-17.71-29.36 0-57.31 6.09-82.63 17.06zm165.25 381.84L131.99 89.01a208.41 208.41 0 0 0-23.06 19.92C71.31 146.56 48.02 198.56 48.02 256s23.29 109.44 60.91 147.07c37.63 37.62 89.63 60.91 147.07 60.91 29.36 0 57.29-6.09 82.62-17.06z" />
                </g>
              </svg>
            )}
          </div>
        </header>
        <p
          style={{ lineClamp: 4 }}
          className="font-lato text-sm font-bold text-stone-800 text-justify overflow-hidden"
        >
          {movie.overview.length ? movie.overview : "Sinopse não encontrada"}
        </p>
      </section>
      <div className="md:w-0 relative left-[40%] bottom-[90%] md:left-[-12.5%] md:bottom-0 ">
        <div
          className={`flex gap-2 md:h-fit ${getColorVoteBadge()} w-24 p-2 before:content('') before:border-8 before:border-l-transparent before:border-b-transparent before:border-t-transparent before:absolute before:right-1 before:-bottom-2 md:before:-right-[5.8rem] before:rotate-45 before:block text-zinc-200`}
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {movie.voteAverage}
        </div>
      </div>
    </article>
  );
}
