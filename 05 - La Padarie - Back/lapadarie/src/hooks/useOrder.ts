import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../service/api";
import { Order } from "../utils/types";

export function useOrder(): [
  orders: Order[],
  addOrder: (client: string, amount: number) => Promise<void>,
  editOrder: (order: Order, client: string, amount: number) => Promise<void>,
  deleteOrder: (order: Order) => void,
  breadPrice: number,
  orderQuantity: () => number
] {
  const [orders, setOrders] = useState<Order[]>([]);
  const [breadPrice, setBreadPrice] = useState<number>(0.5);
  const ordersQuantity = () =>
    orders.reduce((sum, order) => sum + order.amount, 0);

  useEffect(() => {
    getOrders();
  }, []);

  function getOrders() {
    api
      .get<Order[]>("/order")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        throw err;
      });
  }

  function addOrder(client: string, amount: number) {
    return new Promise<void>((resolve, reject) => {
      api
        .post<Order>("/order", {
          client,
          amount,
        })
        .then((response) => {
          getOrders();
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  function editOrder(order: Order, client?: string, amount?: number) {
    return new Promise<void>((resolve, reject) => {
      api
        .patch<Order>(`/order/${order.id}`, {
          client,
          amount,
        })
        .then((response) => {
          getOrders();
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  function deleteOrder(order: Order) {
    setOrders(orders.filter((s) => s.id != order.id));
  }
  return [orders, addOrder, editOrder, deleteOrder, breadPrice, ordersQuantity];
}
