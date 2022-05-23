import { IconTrash } from "../../assets/IconTrash";
import "./style.css";

type QueueItemProps = {
  title: string;
  totalBread: number;
  totalPayment: number;
};
export function QueueItem({ title, totalBread, totalPayment }: QueueItemProps) {
  return (
    <div className="item">
      <main>
        <h1 className="item-title">{title}</h1>
        <div className="item-content">
          <h2>
            <strong>Total de pães:</strong> {totalBread} pães
          </h2>
          <h2>
            <strong>Total a pagar:</strong> R$ {totalPayment.toFixed(2)}
          </h2>
        </div>
      </main>
      <IconTrash />
    </div>
  );
}
