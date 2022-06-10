import { useState } from "react";
import { MainStyled } from "./AppStyles";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Pokedex } from "./components/pokedex";
import { SearchBar } from "./components/search_bar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MainStyled>
        <Header />
        <SearchBar />
        <Pokedex />
      </MainStyled>
      <Footer />
    </>
  );
}

export default App;
