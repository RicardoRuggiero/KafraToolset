export interface Item {
  id: number;
  name: string;
  description: string | null;
  weight: number | null;
  imageUrl?: string | null;
}
