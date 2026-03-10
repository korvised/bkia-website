import { Terminal } from "@/types";

export interface ICounter {
  id: string;
  terminal: Terminal;
  name: string;
  isActive: boolean;
}

export interface ICounterForm {
  terminal: Terminal;
  name: string;
  isActive: boolean;
}
