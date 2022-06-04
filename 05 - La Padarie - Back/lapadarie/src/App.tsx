import { LogoSVG } from "./assets/LogoSVG";
import "./App.css";
import { IconPeople } from "./assets/IconPeople";
import { Card } from "./components/Card";
import { IconCart } from "./assets/IconCart";
import { IconMoney } from "./assets/IconMoney";
import { Modal } from "./components/Modal";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Order } from "./utils/types";
import { Queue } from "./components/Queue";
import { useOrder } from "./hooks/useOrder";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [orders, addOrder, editOrder, deleteOrder, breadPrice, ordersQuantity] =
    useOrder();
  const [orderToEdit, setOrderToEdit] = useState<Order | undefined>(undefined);

  function handleEdit(orderToEdit: Order) {
    setOrderToEdit(orderToEdit);
    setModalIsOpen(true);
  }
  function handleSend(client: string, quantity: number) {
    if (orderToEdit) {
      editOrder(orderToEdit, client, quantity);
      setOrderToEdit(undefined);
      toast.success("Pedido editado com sucesso!");
    } else {
      addOrder(client, quantity);
      toast.success("Pedido adicionado com sucesso!");
    }
    setModalIsOpen(false);
  }

  return (
    <>
      <Toaster />
      <Modal
        order={orderToEdit}
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
            value={orders.length.toString()}
          />
          <Card
            id="card-bread-sold"
            title={"Pães vendidos "}
            icon={<IconCart />}
            value={ordersQuantity().toString()}
          />
          <Card
            id="card-cash-entry"
            title={"Entrada"}
            icon={<IconMoney />}
            value={`R$ ${(ordersQuantity() * breadPrice)
              .toFixed(2)
              .toString()}`}
            bgColor={"#5F3305"}
            textColor={"#FFFFFF"}
          />
        </div>
        <Queue
          onAddItem={() => {
            setModalIsOpen(true);
          }}
          onEditItem={handleEdit}
          onDeleteItem={deleteOrder}
          breadPrice={breadPrice}
          orders={orders}
        />
      </main>
      <footer id="footer-principal">
        Com <span role="img">💛</span> Info Jr UFBA 2022
      </footer>
    </>
  );
}

export default App;
