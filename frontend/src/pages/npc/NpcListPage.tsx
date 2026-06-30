
import { useEffect, useState } from "react";
import { npcService } from "../../services/npcService";
import { soldbyService } from "../../services/soldbyService";
import type { Npc } from "../../types/Npc";
import type { Soldby } from "../../types/Soldby";
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

  const handleDelete = async (npc: Npc) => {
    try {
      const dependencies: Soldby[] =
        await soldbyService.getByNpc(npc.id);

      let message =
        `Deseja realmente excluir o NPC "${npc.name ?? "sem nome"}"?`;

      if (dependencies.length > 0) {
        message +=
          `\n\nEste NPC está vinculado a ${dependencies.length} item(ns):\n`;

        dependencies.forEach((relation) => {
          message +=
            `\n- ${relation.item?.name ?? "Item sem nome"} ` +
            `(ID: ${relation.item?.id}) ` +
            `por ${relation.price}z`;
        });

        message +=
          "\n\nAo confirmar, estes vínculos também serão removidos.";
      }

      const confirmed = window.confirm(message);

      if (!confirmed) {
        return;
      }

      await soldbyService.removeByNpc(npc.id);
      await npcService.delete(npc.id);

      alert("NPC excluído com sucesso!");

      loadNpcs();
    } catch (error) {
      alert(
        "Erro ao excluir NPC. Verifique se você está logado."
      );
    }
  };

  return (
    <div className="container mt-4 frutiger-page">
      <HomeButton />

      <div className="container mt-4 frutiger-page">
        <h2 className="frutiger-subtitle">NPCs</h2>

        <table className="table frutiger-table npc-table">
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
                        handleDelete(npc)
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