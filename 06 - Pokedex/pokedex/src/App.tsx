import { useState } from "react";
import { MainStyled } from "./AppStyles";
import { FilterBar } from "./components/filter_bar";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Pokedex } from "./components/pokedex";
import { SearchBar } from "./components/search_bar";

function App() {
  const [search, setSearch] = useState<string>();
  const [types, setTypes] = useState<string[]>([]);

  function handleChangeTypes(type: string) {
    if (types.includes(type)) {
      setTypes(types.filter((t) => t != type));
    } else {
      setTypes([...types, type]);
    }
  }

  return (
    <>
      <MainStyled>
        <Header />
        <SearchBar onSearch={setSearch} />
        <FilterBar
          onChangeTypes={handleChangeTypes}
          isTypeSelected={(type) => types.includes(type)}
        />
        <Pokedex search={search} types={types} />
      </MainStyled>
      <Footer />
    </>
  );
}

export default App;
