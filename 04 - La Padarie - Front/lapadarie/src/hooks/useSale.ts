import moment from "moment";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Sale } from "../utils/types";

export function useSale(): [
  sales: Sale[],
  addSale: (client: string, quantity: number) => void,
  editSale: (sale: Sale, client: string, quantity: number) => void,
  deleteSale: (sale: Sale) => void,
  breadPrice: number,
  saleQuantity: () => number
] {
  const [cookies, setCookie] = useCookies(["sales"]);
  const [sales, setSales] = useState<Sale[]>((cookies.sales as Sale[]) ?? []);
  const [breadPrice, setBreadPrice] = useState<number>(0.5);
  const salesQuantity = () =>
    sales.reduce((sum, sale) => sum + sale.quantity, 0);

  useEffect(() => {
    setCookie("sales", sales, { path: "/" });
  }, [sales]);

  function addSale(client: string, quantity: number) {
    setSales([
      ...sales,
      {
        id: sales.length,
        client,
        quantity,
        createdAt: moment(),
      },
    ]);
  }
  function editSale(sale: Sale, client?: string, quantity?: number) {
    setSales(
      sales.map((s) => {
        if (s.id == sale.id)
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
  function deleteSale(sale: Sale) {
    setSales(sales.filter((s) => s.id != sale.id));
  }
  return [sales, addSale, editSale, deleteSale, breadPrice, salesQuantity];
}
