import { Movie } from "../../util/types";
import EllipsisText from "react-ellipsis-text";
import moment from "moment";

type MovieCardProps = {
  movie?: Movie;
};
export function MovieCard({ movie }: MovieCardProps) {
  console.log(movie);
  return (
    <div
      style={{ backgroundImage: `url('${movie?.imagesPath.posterPath}')` }}
      className="group rounded-md ease-in-out duration-300 overflow-hidden flex w-[225px] h-[337.5px] hover:w-[300px] hover:h-[450px] flex-col items-center justify-end bg-cover"
    >
      <div className="flex flex-col gap-1.5 w-full bg-movie-card  px-4 py-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-lato font-bold text-lg h-fit text-zinc-200">
            {movie?.title}
          </h1>
          <div className="flex gap-5">
            <span className="relative inline-block w-fit">
              <svg
                className="w-7 h-7 text-zinc-200 fill-current"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="absolute text-[8px] top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {(movie?.voteAverage ?? 0) * 10}%
              </span>
            </span>
            <span className="font-lato text-zinc-200 text-xs">
              {moment("2022-03-30", "YYYY-MM-DD").format(
                "DD [de] MMM [de] YYYY"
              )}
            </span>
          </div>
        </div>
        <p className="hidden ease-in-out duration-700 group-hover:block font-lato text-xs font-bold text-ellipsis text-zinc-200 text-justify">
          <EllipsisText text={movie?.overview} length={280}></EllipsisText>
        </p>
      </div>
    </div>
  );
}
