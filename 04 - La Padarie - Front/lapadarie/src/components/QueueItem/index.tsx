import { Sale } from "../../App";
import { IconPen } from "../../assets/IconPen";
import { IconTrash } from "../../assets/IconTrash";
import "./style.css";

type QueueItemProps = {
  sale: Sale;
  breadPrice: number;
  onDelete: (saleId: Sale) => void;
  onEdit: (saleId: Sale) => void;
};
export function QueueItem({
  sale,
  breadPrice,
  onEdit,
  onDelete,
}: QueueItemProps) {
  return (
    <div className="item">
      <main>
        <h1 className="item-title">{sale.client}</h1>
        <div className="item-content">
          <h2>
            <strong>Total de pães:</strong> {sale.quantity} pães
          </h2>
          <h2>
            <strong>Total a pagar:</strong> R${" "}
            {(sale.quantity * breadPrice).toFixed(2)}
          </h2>
        </div>
      </main>
      <div className="icons">
        <a className="edit-icon" onClick={() => onEdit(sale)}>
          <IconPen />
        </a>
        <a className="delete-icon" onClick={() => onDelete(sale)}>
          <IconTrash />
        </a>
      </div>
    </div>
  );
}
