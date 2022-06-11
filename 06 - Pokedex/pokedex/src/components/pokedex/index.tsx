import { useEffect, useState } from "react";
import { getPokemons } from "../../service/api";
import { Pokecard } from "./pokecard";
import { PokedexContainer, PokedexTitle, PokedexSection } from "./styles";

export function Pokedex() {
  const [pokemons, setPokemons] = useState<string[]>([]);

  useEffect(() => {
    getPokemons(0).then((response) => {
      setPokemons(response);
    });
  });

  return (
    <PokedexContainer>
      <PokedexTitle>Pokédex</PokedexTitle>
      <PokedexSection>
        {pokemons.map((pokemonName) => (
          <Pokecard pokemonName={pokemonName} />
        ))}
      </PokedexSection>
    </PokedexContainer>
  );
}
