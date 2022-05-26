import { LogoSVG } from "./assets/LogoSVG";
import "./App.css";
import { IconPeople } from "./assets/IconPeople";
import { Card } from "./components/Card";
import { IconCart } from "./assets/IconCart";
import { IconMoney } from "./assets/IconMoney";
import { QueueItem } from "./components/QueueItem";
import { Modal } from "./components/Modal";
import { useState } from "react";

const breadPrice = 0.5;
export type Sale = {
  client: string;
  quantity: number;
};
function App() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [sales, setSales] = useState<Sale[]>([]);

  return (
    <>
      <Modal
        modalIsOpen={modalIsOpen}
        onCancel={() => setModalIsOpen(false)}
        onSend={(sale: Sale) => {
          setSales([...sales, sale]);
        }}
      />
      <header id="header-principal">
        <LogoSVG />
      </header>
      <main id="main-principal">
        <div className="cards">
          <Card
            title={"Pessoas na fila"}
            icon={<IconPeople />}
            value={sales.length.toString()}
          />
          <Card
            title={"Pães vendidos"}
            icon={<IconCart />}
            value={sales
              .reduce((sum, sale) => sum + sale.quantity, 0)
              .toString()}
          />
          <Card
            title={"Entrada"}
            icon={<IconMoney />}
            value={`R$ ${(
              sales.reduce((sum, sale) => sum + sale.quantity, 0) * 0.5
            ).toString()}`}
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
            {sales.map((sale, i) => (
              <QueueItem
                sale={sale}
                saleIndex={i}
                breadPrice={breadPrice}
                onDelete={(saleToDelete) =>
                  setSales(sales.filter((el, i) => i != saleToDelete))
                }
              />
            ))}
          </div>
        </div>
      </main>
      <footer id="footer-principal">
        Com <span role="img">💛</span> Info Jr UFBA 2022
      </footer>
    </>
  );
}

export default App;
