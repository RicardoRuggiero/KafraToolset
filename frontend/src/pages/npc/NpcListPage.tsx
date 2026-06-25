
import { useEffect, useState } from "react";
import { npcService } from "../../services/npcService";
import type { Npc } from "../../types/Npc";
import { Link } from "react-router-dom";
import HomeButton from "../../components/HomeButton";

function NpcListPage() {
  const [npcs, setNpcs] = useState<Npc[]>([]);

  const loadNpcs = () => {
    npcService.getAll().then(setNpcs);
  };

  useEffect(() => {
    loadNpcs();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Deseja realmente excluir este NPC?"
    );

    if (!confirmed) {
      return;
    }

    await npcService.delete(id);

    loadNpcs();
  };

  return (
    <div className="container mt-4 frutiger-page">
      <HomeButton />
      <div className="container mt-4 frutiger-page">
        <h2 className="frutiger-subtitle">NPCs</h2>

        <table className="table frutiger-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Mapa</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {npcs.map((npc) => (
              <tr key={npc.id}>
                <td>{npc.id}</td>
                <td>{npc.name}</td>
                <td>{npc.mapname}</td>

                <td>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/npcs/edit/${npc.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Editar
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(npc.id)
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

export default NpcListPage;