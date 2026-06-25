
import { useEffect, useState } from "react";
import { itemService } from "../../services/itemService";
import type { Item } from "../../types/Item";
import { Link } from "react-router-dom";
import HomeButton from "../../components/HomeButton";

function ItemListPage() {
  const [items, setItems] = useState<Item[]>([]);

  const loadItems = () => {
    itemService.getAll().then(setItems);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Deseja realmente excluir este item?"
    );

    if (!confirmed) {
      return;
    }

    await itemService.delete(id);

    loadItems();
  };

  return (
    <div className="container mt-4 frutiger-page">
      <HomeButton />
      <div className="container mt-4 frutiger-page">
        <h2 className="frutiger-subtitle">Itens</h2>

        <table className="table frutiger-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Peso</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.weight}</td>

                <td>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/items/edit/${item.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Editar
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(item.id)
                      }
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemListPage;