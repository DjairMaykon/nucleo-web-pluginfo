import { Order } from "../../utils/types";
import { QueueItem } from "./QueueItem";
import "./style.css";

type QueueProps = {
  orders: Order[];
  breadPrice: number;
  onAddItem: () => void;
  onEditItem: (order: Order) => void;
  onDeleteItem: (order: Order) => void;
};
export function Queue({
  onAddItem,
  onEditItem,
  onDeleteItem,
  orders,
  breadPrice,
}: QueueProps) {
  return (
    <div className="queue">
      <a className="add-item" onClick={onAddItem}>
        + Adicionar pessoa a fila
      </a>
      <div className="items">
        {orders.map((order, i) => (
          <QueueItem
            key={i}
            order={order}
            breadPrice={breadPrice}
            onEdit={onEditItem}
            onDelete={onDeleteItem}
          />
        ))}
      </div>
    </div>
  );
}
