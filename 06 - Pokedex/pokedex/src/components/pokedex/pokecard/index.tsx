import { useEffect, useState } from "react";
import { getPokemon } from "../../../service/api";
import { POKEMONTYPECOLOR } from "../../../utils/constants";
import { Pokemon } from "../../../utils/types";
import {
  PokecardArticle,
  PokecardContent,
  PokecardTitle,
  PokecardTypesLi,
  PokecardTypesUl,
} from "./styles";

type PokecardProps = {
  pokemonName: string;
};
export function Pokecard({ pokemonName }: PokecardProps) {
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    getPokemon(pokemonName).then((response) => {
      setPokemon(response);
    });
  });

  if (!pokemon) return <div>Loading...</div>;

  return (
    <PokecardArticle
      style={{
        backgroundColor:
          POKEMONTYPECOLOR[pokemon.types.at(0)?.type.name ?? "normal"]
            .colorLight,
      }}
    >
      <PokecardContent>
        <PokecardTitle>{pokemonName}</PokecardTitle>
        <PokecardTypesUl>
          {pokemon.types
            .map((type) => type.type)
            .map((type) => (
              <PokecardTypesLi
                style={{ backgroundColor: POKEMONTYPECOLOR[type.name].color }}
              >
                {type.name}
              </PokecardTypesLi>
            ))}
          <PokecardTypesLi style={{ backgroundColor: "#A33EA1" }}>
            POISON
          </PokecardTypesLi>
        </PokecardTypesUl>
      </PokecardContent>
      <img
        width={120}
        height={120}
        src={pokemon.sprites.front_default.toString()}
        alt=""
      />
    </PokecardArticle>
  );
}
