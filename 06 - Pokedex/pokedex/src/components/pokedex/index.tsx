import { useEffect, useRef, useState } from "react";
import { getPokemons } from "../../service/api";
import { Pokecard } from "./pokecard";
import { PokecardSkeleton } from "./pokecard/styles";
import { PokedexContainer, PokedexTitle, PokedexSection } from "./styles";

export function Pokedex() {
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [pokemonsOffset, setPokemonsOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    getPokemons(pokemonsOffset)
      .then((response) => {
        setPokemons([...pokemons, ...response]);
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
        {pokemons.map((pokemonName, index) => (
          <Pokecard key={index} pokemonName={pokemonName} />
        ))}
        {!isLoading && <PokecardSkeleton ref={loadMoreRef} />}
      </PokedexSection>
    </PokedexContainer>
  );
}
