
import { useState } from "react";
import { npcService } from "../../services/npcService";
import HomeButton from "../../components/HomeButton";
import ValidatedInput from "../../components/ValidatedInput";

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
    <div className="container mt-4 frutiger-page">
      <HomeButton />
      <div className="container mt-4 frutiger-page">
        <h2 className="frutiger-subtitle">Cadastro de NPC</h2>

        <form onSubmit={handleSubmit}>

          <ValidatedInput
            label="ID"
            value={id}
            onChange={setId}
            errorMessage="Informe o ID."
            type="number"
          />

          <ValidatedInput
            label="Nome"
            value={name}
            onChange={setName}
            errorMessage="Informe o nome."
          />

          <ValidatedInput
            label="Mapname"
            value={mapname}
            onChange={setMapname}
            errorMessage="Informe o mapname."
          />

          <ValidatedInput
            label="X"
            value={x}
            onChange={setX}
            errorMessage="Informe a coordenada X."
            type="number"
          />

          <ValidatedInput
            label="Y"
            value={y}
            onChange={setY}
            errorMessage="Informe a coordenada Y."
            type="number"
          />

          <ValidatedInput
            label="Job"
            value={job}
            onChange={setJob}
            errorMessage="Informe o job."
            type="number"
          />

          <ValidatedInput
            label="Type"
            value={type}
            onChange={setType}
            errorMessage="Informe o type."
          />

          <button
            type="submit"
            className="btn frutiger-btn"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NpcCreatePage;