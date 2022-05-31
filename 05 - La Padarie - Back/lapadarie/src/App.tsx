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

function App() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [sales, addSale, editSale, deleteSale, breadPrice, salesQuantity] =
    useSale();
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
        <div id="cards">
          <Card
            id="card-queue-quantity"
            title={"Pessoas na fila"}
            icon={<IconPeople />}
            value={sales.length.toString()}
          />
          <Card
            id="card-bread-sold"
            title={"Pães vendidos "}
            icon={<IconCart />}
            value={salesQuantity().toString()}
          />
          <Card
            id="card-cash-entry"
            title={"Entrada"}
            icon={<IconMoney />}
            value={`R$ ${(salesQuantity() * breadPrice).toFixed(2).toString()}`}
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
