import { Moment } from "moment";

export type Sale = {
  id: number;
  client: string;
  quantity: number;
  createdAt: Moment;
};
