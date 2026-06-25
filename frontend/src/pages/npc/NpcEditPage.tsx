
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { npcService } from "../../services/npcService";
import HomeButton from "../../components/HomeButton";

function NpcEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mapname, setMapname] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [job, setJob] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (!id) return;

    npcService.getById(Number(id)).then((npc) => {
      setName(npc.name ?? "");
      setMapname(npc.mapname ?? "");
      setX(npc.x?.toString() ?? "");
      setY(npc.y?.toString() ?? "");
      setJob(npc.job?.toString() ?? "");
      setType(npc.type ?? "");
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mapname.trim()) {
      alert("Informe o mapname.");
      return;
    }

    if (!x.trim()) {
      alert("Informe a coordenada X.");
      return;
    }

    if (!y.trim()) {
      alert("Informe a coordenada Y.");
      return;
    }

    if (!job.trim()) {
      alert("Informe o job.");
      return;
    }

    if (!type.trim()) {
      alert("Informe o type.");
      return;
    }

    await npcService.update(Number(id), {
      id: Number(id),
      name,
      mapname,
      x: Number(x),
      y: Number(y),
      job: Number(job),
      type,
    });

    alert("NPC atualizado com sucesso!");

    navigate("/npcs");
  };

  return (
    <div className="container mt-4">
      <HomeButton />
      <div className="container mt-4">
        <h2>Editar NPC</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mapname</label>
            <input
              className="form-control"
              value={mapname}
              onChange={(e) => setMapname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">X</label>
            <input
              type="number"
              className="form-control"
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Y</label>
            <input
              type="number"
              className="form-control"
              value={y}
              onChange={(e) => setY(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Job</label>
            <input
              type="number"
              className="form-control"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Type</label>
            <input
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-warning">
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NpcEditPage;