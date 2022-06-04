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
  const [orders, addOrder, editOrder, deleteOrder, breadPrice, ordersAmount] =
    useOrder();
  const [orderToEdit, setOrderToEdit] = useState<Order | undefined>(undefined);

  function handleEdit(orderToEdit: Order) {
    setOrderToEdit(orderToEdit);
    setModalIsOpen(true);
  }
  function handleSend(client: string, quantity: number) {
    if (orderToEdit) {
      editOrder(orderToEdit, client, quantity)
        .then(() => {
          toast.success("Pedido editado com sucesso!");
        })
        .catch((err) => {
          toast.error(
            "Não foi possivel editar o pedido, por favor tente mais tarde."
          );
        })
        .finally(() => {
          setOrderToEdit(undefined);
        });
    } else {
      addOrder(client, quantity)
        .then(() => {
          toast.success("Pedido adicionado com sucesso!");
        })
        .catch((err) => {
          toast.error(
            "Não foi possivel adicionar o pedido, por favor tente mais tarde."
          );
        });
    }
    setModalIsOpen(false);
  }
  function handleDelete(orderToDelete: Order) {
    deleteOrder(orderToDelete)
      .then(() => {
        toast.success("Pedido deletado com sucesso!");
      })
      .catch((err) => {
        toast.error(
          "Não foi possivel deletar o pedido, por favor tente mais tarde."
        );
      });
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
            value={ordersAmount().toString()}
          />
          <Card
            id="card-cash-entry"
            title={"Entrada"}
            icon={<IconMoney />}
            value={`R$ ${(ordersAmount() * breadPrice).toFixed(2).toString()}`}
            bgColor={"#5F3305"}
            textColor={"#FFFFFF"}
          />
        </div>
        <Queue
          onAddItem={() => {
            setModalIsOpen(true);
          }}
          onEditItem={handleEdit}
          onDeleteItem={handleDelete}
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
