import { Pokecard } from "./pokecard";
import { PokedexContainer, PokedexTitle, PokedexUl } from "./styles";

export function Pokedex() {
  return (
    <PokedexContainer>
      <PokedexTitle>Pokédex</PokedexTitle>
      <PokedexUl>
        <Pokecard />
        <Pokecard />
        <Pokecard />
        <Pokecard />
        <Pokecard />
        <Pokecard />
        <Pokecard />
        <Pokecard />
      </PokedexUl>
    </PokedexContainer>
  );
}
