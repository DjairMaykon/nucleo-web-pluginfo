import { LogoSVG } from "./assets/LogoSVG";
import "./App.css";
import { IconPeople } from "./assets/IconPeople";
import { Card } from "./components/Card";
import { IconCart } from "./assets/IconCart";
import { IconMoney } from "./assets/IconMoney";
import { IconTrash } from "./assets/IconTrash";
import { QueueItem } from "./components/QueueItem";
import { Modal } from "./components/Modal";
import { useState } from "react";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  return (
    <>
      <Modal modalIsOpen={modalIsOpen} onCancel={() => setModalIsOpen(false)} />
      <header id="header-principal">
        <LogoSVG />
      </header>
      <main id="main-principal">
        <div className="cards">
          <Card title={"Pessoas na fila"} icon={<IconPeople />} value={"7"} />
          <Card title={"Pães vendidos"} icon={<IconCart />} value={"350"} />
          <Card
            title={"Entrada"}
            icon={<IconMoney />}
            value={"R$ 175,00"}
            bgColor={"#5F3305"}
            textColor={"#FFFFFF"}
          />
        </div>
        <div className="queue">
          <a
            className="add-item"
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            + Adicionar pessoa a fila
          </a>
          <div className="items">
            <QueueItem
              title="Alexandre Shyjada Sousa"
              totalBread={50}
              totalPayment={25}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
