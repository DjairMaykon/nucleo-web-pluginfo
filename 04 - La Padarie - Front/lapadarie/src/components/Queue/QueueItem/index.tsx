import moment from "moment";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IconPen } from "../../../assets/IconPen";
import { IconTimer } from "../../../assets/IconTimer";
import { IconTrash } from "../../../assets/IconTrash";
import { Sale } from "../../../utils/types";
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
  const [time, setTime] = useState<number | undefined>();
  useEffect(() => {
    if (moment().diff(moment(sale.createdAt), "hours") < 1) {
      const interval = setInterval(() => {
        setTime(moment().diff(moment(sale.createdAt)));
        if (time && Math.trunc(time / 1000) == 60)
          toast(`${sale.client} esperando a um 1 minuto!`);
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const TimerCount = () => (
    <>
      {time && Math.trunc(time / 1000) > 60 && <IconTimer />}
      {time && moment(time).format("mm:ss")}
    </>
  );

  return (
    <div className="item">
      <Toaster />
      <main>
        <header>
          <h1 className="item-title">{sale.client}</h1>
          {moment().diff(sale.createdAt, "hours") < 1
            ? TimerCount()
            : moment(sale.createdAt).format("DD/MM/YY HH:mm")}
        </header>
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
