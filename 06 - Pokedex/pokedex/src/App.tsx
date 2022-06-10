import { useState } from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default App;
