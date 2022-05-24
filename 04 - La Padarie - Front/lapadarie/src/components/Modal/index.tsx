import { useState } from "react";
import ReactModal from "react-modal";
import { Sale } from "../../App";
import "./style.css";

ReactModal.setAppElement("#root");

type ModalProps = {
  modalIsOpen: boolean;
  onCancel: () => void;
  onSend: (sale: Sale) => void;
};
export function Modal({ modalIsOpen, onCancel, onSend }: ModalProps) {
  const [sale, setSale] = useState<Sale | null>(null);

  function handleSend() {
    if (sale) onSend(sale);
    setSale(null);
    onCancel();
  }
  return (
    <ReactModal isOpen={modalIsOpen} id="modal">
      <h1 className="modal-title">Adicionar pessoa a fila</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={sale?.client ?? ""}
          onChange={(e) => {
            if (e.target.value.length > 0)
              setSale({
                client: e.target.value,
                quantity: sale?.quantity ?? 0,
              });
          }}
          placeholder="Nome completo do cliente"
        />
        <input
          type="number"
          value={sale?.quantity ?? 0}
          onChange={(e) => {
            if (e.target.value.length > 0)
              setSale({
                quantity: parseInt(e.target.value),
                client: sale?.client ?? "",
              });
          }}
          placeholder="Total de pães:"
        />
        <div className="modal-buttons">
          <button className="modal-button-send" onClick={handleSend}>
            Enviar
          </button>
          <button className="modal-button-cancel" onClick={() => onCancel()}>
            Cancelar
          </button>
        </div>
      </form>
    </ReactModal>
  );
}
