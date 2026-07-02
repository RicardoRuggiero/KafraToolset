// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Página da aplicação responsável por apresentar uma funcionalidade
// específica ao usuário, integrando componentes visuais, gerenciamento de
// estado, navegação e comunicação com os serviços da API.
//
// File: src/pages/item/ItemListPage.tsx
//
// Purpose: Listar os itens cadastrados, exibindo informações,
// imagens e ações disponíveis para cada registro.
// ============================================================================

import { useEffect, useState } from "react";
import { itemService } from "../../services/itemService";
import { soldbyService } from "../../services/soldbyService";
import type { Item } from "../../types/Item";
import type { Soldby } from "../../types/Soldby";
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

  const handleDelete = async (item: Item) => {
    try {
      const dependencies: Soldby[] = await soldbyService.getByItem(item.id);

      let message = `Deseja realmente excluir o item "${item.name}"?`;

      if (dependencies.length > 0) {
        message += `\n\nEste item está vinculado a ${dependencies.length} NPC(s):\n`;

        dependencies.forEach((relation) => {
          message += `\n- ${relation.npc?.name ?? "NPC sem nome"} ` + `(ID: ${relation.npc?.id}) ` + `por ${relation.price}z`;
        });

        message += "\n\nAo confirmar, estes vínculos também serão removidos.";
      }

      const confirmed = window.confirm(message);

      if (!confirmed) {
        return;
      }

      await soldbyService.removeByItem(item.id);
      await itemService.delete(item.id);

      alert("Item excluído com sucesso!");

      loadItems();
    } catch (error) {
      alert("Erro ao excluir item. Verifique se você está logado.");
    }
  };

  return (
    <div className="container mt-4 frutiger-page">
      <HomeButton />

      <div className="container mt-4 frutiger-page">
        <h2 className="frutiger-subtitle">Itens</h2>

        <table className="table frutiger-table">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>ID</th>
              <th>Nome</th>
              <th>Peso</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.imageUrl ? `http://localhost:3000${item.imageUrl}` : "http://localhost:3000/uploads/semImagem.jpeg"}
                    alt={item.name}
                    className="item-thumbnail"
                  />
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.weight}</td>

                <td>
                  <div className="d-flex gap-2">
                    <Link to={`/items/edit/${item.id}`} className="btn btn-warning btn-sm">
                      Editar
                    </Link>

                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item)}>
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
