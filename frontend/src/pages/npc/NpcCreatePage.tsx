
import { useState } from "react";
import { npcService } from "../../services/npcService";
import HomeButton from "../../components/HomeButton";

function NpcCreatePage() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [mapname, setMapname] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [job, setJob] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!id.trim()) {
      alert("Informe o ID.");
      return;
    }

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

    await npcService.create({
      id: Number(id),
      name,
      mapname,
      x: Number(x),
      y: Number(y),
      job: Number(job),
      type,
    });

    alert("NPC cadastrado com sucesso!");

    setId("");
    setName("");
    setMapname("");
    setX("");
    setY("");
    setJob("");
    setType("");
  };

  return (
    <div className="container mt-4">
      <HomeButton />
      <div className="container mt-4">
        <h2>Cadastro de NPC</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">ID</label>
            <input
              type="number"
              className="form-control"
              value={id}
              onChange={(e) =>
                setId(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mapname</label>
            <input
              className="form-control"
              value={mapname}
              onChange={(e) =>
                setMapname(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">X</label>
            <input
              type="number"
              className="form-control"
              value={x}
              onChange={(e) =>
                setX(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Y</label>
            <input
              type="number"
              className="form-control"
              value={y}
              onChange={(e) =>
                setY(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Job</label>
            <input
              type="number"
              className="form-control"
              value={job}
              onChange={(e) =>
                setJob(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Type</label>
            <input
              className="form-control"
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NpcCreatePage;