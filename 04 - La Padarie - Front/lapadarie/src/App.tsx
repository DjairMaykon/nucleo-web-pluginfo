import { LogoSVG } from "./assets/LogoSVG";
import "./App.css";
import { IconPeople } from "./assets/IconPeople";
import { Card } from "./components/Card";
import { IconCart } from "./assets/IconCart";
import { IconMoney } from "./assets/IconMoney";
import { Modal } from "./components/Modal";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Sale } from "./utils/types";
import { Queue } from "./components/Queue";
import { useSale } from "./hooks/useSale";

const breadPrice = 0.5;

function App() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [sales, addSale, editSale, deleteSale] = useSale();
  const [saleToEdit, setSaleToEdit] = useState<Sale | undefined>(undefined);

  function handleEdit(saleToEdit: Sale) {
    setSaleToEdit(saleToEdit);
    setModalIsOpen(true);
  }
  function handleSend(client: string, quantity: number) {
    if (saleToEdit) {
      editSale(saleToEdit, client, quantity);
      setSaleToEdit(undefined);
      toast.success("Pedido editado com sucesso!");
    } else {
      addSale(client, quantity);
      toast.success("Pedido adicionado com sucesso!");
    }
    setModalIsOpen(false);
  }

  return (
    <>
      <Toaster />
      <Modal
        sale={saleToEdit}
        modalIsOpen={modalIsOpen}
        onCancel={() => setModalIsOpen(false)}
        onSend={handleSend}
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
        <Queue
          onAddItem={() => {
            setModalIsOpen(true);
          }}
          onEditItem={handleEdit}
          onDeleteItem={deleteSale}
          breadPrice={breadPrice}
          sales={sales}
        />
      </main>
      <footer id="footer-principal">
        Com <span role="img">💛</span> Info Jr UFBA 2022
      </footer>
    </>
  );
}

export default App;
