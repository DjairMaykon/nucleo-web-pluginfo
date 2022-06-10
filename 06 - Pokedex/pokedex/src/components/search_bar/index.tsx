import { SearchIcon } from "../../assets/SearchIcon";
import { SearchButton, SearchDiv, SearchInput } from "./styles";

export function SearchBar() {
  return (
    <SearchDiv>
      <SearchInput placeholder="Pesquisar pokémon" type="text" />
      <SearchButton>
        <SearchIcon />
      </SearchButton>
    </SearchDiv>
  );
}
