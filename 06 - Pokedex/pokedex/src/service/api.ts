import axios from "axios";
import { Pokemon } from "../utils/types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function getPokemons(offset: number) {
  return new Promise<{ count: number; results: string[] }>(
    (resolve, reject) => {
      api
        .get("/pokemon", {
          params: {
            offset,
            limit: 21,
          },
        })
        .then((apiResponse) => {
          const results = apiResponse.data.results.map(
            (result: any) => result.name
          );
          const count = apiResponse.data.count;
          resolve({
            count,
            results,
          });
        })
        .catch((err) => {
          reject(err);
        });
    }
  );
}

export function getPokemon(name: string) {
  return new Promise<Pokemon>((resolve, reject) => {
    api
      .get<Pokemon>(`/pokemon/${name}`)
      .then((apiResponse) => {
        resolve(apiResponse.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
