import React, { useRef, useState } from "react";

type CarouselProps = {
  children: JSX.Element[];
  onRequestItens: () => void;
  loadingItens: boolean;
};
export function Carousel({
  onRequestItens,
  loadingItens,
  children,
}: CarouselProps) {
  const [atualItem, setAtualItem] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const carouselMaxItens = Math.trunc(
    (carouselRef.current?.offsetWidth ?? 0) / 225
  );

  function scrollCarousel(back: boolean = false) {
    if (atualItem == 0 && back) return;
    if (atualItem == children.length - carouselMaxItens && !back) {
      onRequestItens();
    }
    setAtualItem(atualItem + (back ? -1 : 1));
  }

  if (children.length == 0) onRequestItens();
  return (
    <div className=" my-5 flex relative">
      <button onClick={() => scrollCarousel(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-12 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <div className="flex gap-3 justify-center w-full" ref={carouselRef}>
        <div className="flex gap-3 relative">
          {children.slice(atualItem, atualItem + carouselMaxItens)}
          {loadingItens &&
            [...Array(carouselMaxItens - (children.length - atualItem))].map(
              (e, i) => {
                return (
                  <div
                    key={i}
                    className="rounded-md animate-pulse bg-gray-300 flex w-[225px] h-[337.5px]"
                  ></div>
                );
              }
            )}
        </div>
      </div>
      <button onClick={() => scrollCarousel()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-12 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
