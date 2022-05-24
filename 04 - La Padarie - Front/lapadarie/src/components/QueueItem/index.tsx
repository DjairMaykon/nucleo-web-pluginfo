import { Sale } from "../../App";
import { IconTrash } from "../../assets/IconTrash";
import "./style.css";

type QueueItemProps = {
  sale: Sale;
  saleIndex: number;
  breadPrice: number;
  onDelete: (sale: number) => void;
};
export function QueueItem({
  sale,
  breadPrice,
  onDelete,
  saleIndex,
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
      <a className="delete-icon" onClick={() => onDelete(saleIndex)}>
        <IconTrash />
      </a>
    </div>
  );
}
