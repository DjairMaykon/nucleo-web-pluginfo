import { Sale } from "../../utils/types";
import { QueueItem } from "./QueueItem";
import "./style.css";

type QueueProps = {
  sales: Sale[];
  breadPrice: number;
  onAddItem: () => void;
  onEditItem: (sale: Sale) => void;
  onDeleteItem: (sale: Sale) => void;
};
export function Queue({
  onAddItem,
  onEditItem,
  onDeleteItem,
  sales,
  breadPrice,
}: QueueProps) {
  return (
    <div className="queue">
      <a className="add-item" onClick={onAddItem}>
        + Adicionar pessoa a fila
      </a>
      <div className="items">
        {sales.map((sale, i) => (
          <QueueItem
            key={i}
            sale={sale}
            breadPrice={breadPrice}
            onEdit={onEditItem}
            onDelete={onDeleteItem}
          />
        ))}
      </div>
    </div>
  );
}
