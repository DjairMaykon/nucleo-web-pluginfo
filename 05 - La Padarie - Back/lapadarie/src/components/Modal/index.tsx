import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Order } from "../../utils/types";
import "./style.css";

ReactModal.setAppElement("#root");

type ModalProps = {
  modalIsOpen: boolean;
  order?: Order;
  onCancel: () => void;
  onSend: (client: string, quantity: number) => void;
};
export function Modal({ order, modalIsOpen, onCancel, onSend }: ModalProps) {
  const [client, setClient] = useState<string | null>(
    order ? order.client : null
  );
  const [clientInvalid, setCLientInvalid] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number | null>(
    order ? order.quantity : null
  );
  const [quantityInvalid, setQuantityInvalid] = useState<boolean>(false);

  function handleSend() {
    setCLientInvalid(false);
    setQuantityInvalid(false);
    if (!client || client.length == 0) {
      setCLientInvalid(true);
    }
    if (!quantity || quantity <= 0) {
      setQuantityInvalid(true);
    }
    if (client && quantity && quantity > 0) {
      onSend(client, quantity);
      setClient(null);
      setQuantity(null);
    }
  }
  useEffect(() => {
    if (order) {
      setClient(order.client);
      setQuantity(order.quantity);
    }
  }, [order]);
  return (
    <ReactModal
      style={{
        overlay: {
          background: "rgba(229, 207, 148, 0.5)",
        },
      }}
      isOpen={modalIsOpen}
      className="modal"
    >
      <h1 className="modal-title">Adicionar pessoa a fila</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            className={clientInvalid ? "invalid" : ""}
            type="text"
            value={client ?? ""}
            onChange={(e) => {
              setClient(e.target.value);
            }}
            placeholder="Nome completo do cliente"
          />
          {clientInvalid && <p>Nome inválido</p>}
        </div>
        <div>
          <input
            className={quantityInvalid ? "invalid" : ""}
            type="number"
            value={quantity ?? 0}
            onChange={(e) => {
              setQuantity(parseInt(e.target.value));
            }}
            placeholder="Total de pães:"
          />
          {quantityInvalid && <p>Total inválido</p>}
        </div>
        <div className="modal-buttons">
          <button className="modal-button-send" onClick={handleSend}>
            Enviar
          </button>
          <button className="modal-button-cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </ReactModal>
  );
}
