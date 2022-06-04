import { Moment } from "moment";

export type Order = {
  id: number;
  client: string;
  quantity: number;
  createdAt: Moment;
};
