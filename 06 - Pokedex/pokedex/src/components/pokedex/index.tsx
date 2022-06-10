import { Pokecard } from "./pokecard";
import { PokedexContainer, PokedexTitle, PokedexSection } from "./styles";

export function Pokedex() {
  return (
    <PokedexContainer>
      <PokedexTitle>Pokédex</PokedexTitle>
      <PokedexSection>
        <Pokecard />
        <Pokecard />
        <Pokecard />
        <Pokecard />
        <Pokecard />
        <Pokecard />
        <Pokecard />
        <Pokecard />
      </PokedexSection>
    </PokedexContainer>
  );
}
