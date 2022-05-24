import ReactModal from "react-modal";
import "./style.css";

ReactModal.setAppElement("#root");

type ModalProps = {
  modalIsOpen: boolean;
  onCancel: () => void;
};
export function Modal({ modalIsOpen, onCancel }: ModalProps) {
  return (
    <ReactModal isOpen={modalIsOpen} id="modal">
      <h1 className="modal-title">Adicionar pessoa a fila</h1>
      <form>
        <input type="text" placeholder="Nome completo do cliente" />
        <input type="text" placeholder="Total de pães:" />
        <div className="modal-buttons">
          <button className="modal-button-send">Enviar</button>
          <button className="modal-button-cancel" onClick={() => onCancel()}>
            Cancelar
          </button>
        </div>
      </form>
    </ReactModal>
  );
}
