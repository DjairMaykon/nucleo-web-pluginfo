import { LogoSVG } from "./assets/LogoSVG";
import "./App.css";
import { IconPeople } from "./assets/IconPeople";
import { Card } from "./components/Card";
import { IconCart } from "./assets/IconCart";
import { IconMoney } from "./assets/IconMoney";
import { QueueItem } from "./components/QueueItem";
import { Modal } from "./components/Modal";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import moment, { Moment } from "moment";

const breadPrice = 0.5;
export type Sale = {
  id: number;
  client: string;
  quantity: number;
  createdAt: Moment;
};
function App() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(["sales"]);
  const [sales, setSales] = useState<Sale[]>((cookies.sales as Sale[]) ?? []);
  const [saleToEdit, setSaleToEdit] = useState<Sale | undefined>(undefined);

  useEffect(() => {
    setCookie("sales", sales, { path: "/" });
  }, [sales]);

  function handleEdit(saleToEdit: Sale) {
    setSaleToEdit(saleToEdit);
    setModalIsOpen(true);
  }

  function handleSend(client: string, quantity: number) {
    if (saleToEdit) {
      setSales(
        sales.map((s) => {
          if (s.id == saleToEdit.id)
            return {
              id: s.id,
              client,
              quantity,
              createdAt: s.createdAt,
            };
          else return s;
        })
      );
      setSaleToEdit(undefined);
      toast.success("Pedido editado com sucesso!");
    } else {
      setSales([
        ...sales,
        {
          id: sales.length,
          client,
          quantity,
          createdAt: moment(),
        },
      ]);
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
                key={i}
                sale={sale}
                breadPrice={breadPrice}
                onEdit={handleEdit}
                onDelete={(saleToDelete) =>
                  setSales(sales.filter((s) => s.id != saleToDelete.id))
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
