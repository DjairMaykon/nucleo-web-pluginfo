import {
  PokecardArticle,
  PokecardContent,
  PokecardTitle,
  PokecardTypesLi,
  PokecardTypesUl,
} from "./styles";

export function Pokecard() {
  return (
    <PokecardArticle style={{ backgroundColor: "rgba(122, 199, 76, 0.1)" }}>
      <PokecardContent>
        <PokecardTitle>Bulbasaur</PokecardTitle>
        <PokecardTypesUl>
          <PokecardTypesLi style={{ backgroundColor: "#7AC74C" }}>
            GRASS
          </PokecardTypesLi>
          <PokecardTypesLi style={{ backgroundColor: "#A33EA1" }}>
            POISON
          </PokecardTypesLi>
        </PokecardTypesUl>
      </PokecardContent>
      <img
        width={120}
        height={120}
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
        alt=""
      />
    </PokecardArticle>
  );
}
