import moment from "moment";
import { useEffect, useState } from "react";
import api from "../service/api";
import { Order } from "../utils/types";

export function useOrder(): [
  orders: Order[],
  addOrder: (client: string, quantity: number) => void,
  editOrder: (order: Order, client: string, quantity: number) => void,
  deleteOrder: (order: Order) => void,
  breadPrice: number,
  orderQuantity: () => number
] {
  const [orders, setOrders] = useState<Order[]>([]);
  const [breadPrice, setBreadPrice] = useState<number>(0.5);
  const ordersQuantity = () =>
    orders.reduce((sum, order) => sum + order.quantity, 0);

  useEffect(() => {
    getOrders();
  });

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

  function addOrder(client: string, quantity: number) {
    setOrders([
      ...orders,
      {
        id: orders.length,
        client,
        quantity,
        createdAt: moment(),
      },
    ]);
  }
  function editOrder(order: Order, client?: string, quantity?: number) {
    setOrders(
      orders.map((s) => {
        if (s.id == order.id)
          return {
            id: s.id,
            client: client ?? s.client,
            quantity: quantity ?? s.quantity,
            createdAt: s.createdAt,
          };
        else return s;
      })
    );
  }
  function deleteOrder(order: Order) {
    setOrders(orders.filter((s) => s.id != order.id));
  }
  return [orders, addOrder, editOrder, deleteOrder, breadPrice, ordersQuantity];
}
