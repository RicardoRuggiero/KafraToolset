
import { useEffect, useState } from "react";
import { npcService } from "../services/npcService";
import type { Npc } from "../types/Npc";

function NpcListPage() {
  const [npcs, setNpcs] = useState<Npc[]>([]);

  useEffect(() => {
    npcService.getAll().then(setNpcs);
  }, []);

  return (
    <div className="container mt-4">
      <h2>NPCs</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Mapa</th>
          </tr>
        </thead>

        <tbody>
          {npcs.map((npc) => (
            <tr key={npc.id}>
              <td>{npc.id}</td>
              <td>{npc.name}</td>
              <td>{npc.mapname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NpcListPage;