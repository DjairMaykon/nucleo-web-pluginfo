import { useEffect, useRef, useState } from "react";
import { getPokemons } from "../../service/api";
import { Pokecard } from "./pokecard";
import { PokecardSkeleton } from "./pokecard/styles";
import { PokedexContainer, PokedexTitle, PokedexSection } from "./styles";

type PokedexProps = {
  search: string | undefined;
};
export function Pokedex({ search }: PokedexProps) {
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [pokemonsOffset, setPokemonsOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loadMoreRef = useRef(null);

  function filterPokemons(pokemon: string) {
    return search ? pokemon.includes(search) : true;
  }

  useEffect(() => {
    if (hasMore)
      getPokemons(pokemonsOffset)
        .then((response) => {
          setPokemons([...pokemons, ...response.results]);
          if (response.count <= pokemonsOffset + 21) setHasMore(false);
        })
        .finally(() => setIsLoading(false));
  }, [pokemonsOffset]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];

      if (target.isIntersecting) {
        setIsLoading(true);
        setPokemonsOffset((old) => old + 21);
      }
    }, options);

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
  }, [isLoading]);

  return (
    <PokedexContainer>
      <PokedexTitle>Pokédex</PokedexTitle>
      <PokedexSection>
        {pokemons.filter(filterPokemons).map((pokemonName, index) => (
          <Pokecard key={index} pokemonName={pokemonName} />
        ))}
        {hasMore && !isLoading && <PokecardSkeleton ref={loadMoreRef} />}
      </PokedexSection>
    </PokedexContainer>
  );
}
