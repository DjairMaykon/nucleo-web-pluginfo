import { useState } from "react";
import { SearchIcon } from "../../assets/SearchIcon";
import { SearchButton, SearchDiv, SearchInput } from "./styles";

type SearchBarProps = {
  onSearch: (search: string) => void;
};
export function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState<string>("");

  function handleOnChange(searchString: string) {
    setSearch(searchString);
    onSearch(searchString);
  }

  return (
    <SearchDiv>
      <SearchInput
        onChange={(e) => handleOnChange(e.target.value)}
        value={search}
        placeholder="Pesquisar pokémon"
        type="text"
      />
      <SearchButton onCanPlay={(e) => onSearch(search)}>
        <SearchIcon />
      </SearchButton>
    </SearchDiv>
  );
}
