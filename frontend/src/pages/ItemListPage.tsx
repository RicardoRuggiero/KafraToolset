
import { useEffect, useState } from "react";
import { itemService } from "../services/itemService";
import type { Item } from "../types/Item";

function ItemListPage() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    itemService.getAll().then(setItems);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Itens</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Peso</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemListPage;