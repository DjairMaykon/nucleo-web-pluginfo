import { useState } from "react";
import { MainStyled } from "./AppStyles";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Pokedex } from "./components/pokedex";
import { SearchBar } from "./components/search_bar";

function App() {
  const [search, setSearch] = useState<string>();

  return (
    <>
      <MainStyled>
        <Header />
        <SearchBar onSearch={setSearch} />
        <Pokedex search={search} />
      </MainStyled>
      <Footer />
    </>
  );
}

export default App;
