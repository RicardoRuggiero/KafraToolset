import type { Item } from "./Item";
import type { Npc } from "./Npc";

export interface Soldby {
  id: number;
  price: number;
  item: Item;
  npc: Npc;
}
