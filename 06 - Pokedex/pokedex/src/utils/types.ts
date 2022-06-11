import { POKEMONTYPECOLOR } from "./constants";

export type Pokemon = {
  name: string;
  sprites: { front_default: string };
  types: {
    type: {
      name: keyof typeof POKEMONTYPECOLOR;
    };
  }[];
};
