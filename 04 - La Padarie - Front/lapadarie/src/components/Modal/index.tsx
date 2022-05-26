import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Sale } from "../../App";
import "./style.css";

ReactModal.setAppElement("#root");

type ModalProps = {
  modalIsOpen: boolean;
  sale?: Sale;
  onCancel: () => void;
  onSend: (client: string, quantity: number) => void;
};
export function Modal({ sale, modalIsOpen, onCancel, onSend }: ModalProps) {
  const [client, setClient] = useState<string | null>(
    sale ? sale.client : null
  );
  const [quantity, setQuantity] = useState<number | null>(
    sale ? sale.quantity : null
  );

  function handleSend() {
    if (client && quantity && client?.length > 0 && quantity > 0)
      onSend(client, quantity);
    setClient(null);
    setQuantity(null);
  }
  useEffect(() => {
    if (sale) {
      setClient(sale.client);
      setQuantity(sale.quantity);
    }
  }, [sale]);
  return (
    <ReactModal isOpen={modalIsOpen} id="modal">
      <h1 className="modal-title">Adicionar pessoa a fila</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={client ?? ""}
          onChange={(e) => {
            if (e.target.value.length > 0) setClient(e.target.value);
          }}
          placeholder="Nome completo do cliente"
        />
        <input
          type="number"
          value={quantity ?? 0}
          onChange={(e) => {
            if (e.target.value.length > 0)
              setQuantity(parseInt(e.target.value));
          }}
          placeholder="Total de pães:"
        />
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
