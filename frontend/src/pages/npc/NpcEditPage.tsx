// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Página da aplicação responsável por apresentar uma funcionalidade
// específica ao usuário, integrando componentes visuais, gerenciamento de
// estado, navegação e comunicação com os serviços da API.
//
// File: src/pages/npc/NpcEditPage.tsx
//
// Purpose: Permitir a alteração das informações de
// NPCs previamente cadastrados.
// ============================================================================

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { npcService } from "../../services/npcService";
import HomeButton from "../../components/HomeButton";
import ValidatedInput from "../../components/ValidatedInput";

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
    <div className="container mt-4 frutiger-page">
      <HomeButton />
      <div className="container mt-4 frutiger-page">
        <h2 className="frutiger-subtitle">Editar NPC</h2>

        <form onSubmit={handleSubmit}>
          <ValidatedInput label="Nome" value={name} onChange={setName} errorMessage="Informe o nome." />

          <ValidatedInput label="Mapname" value={mapname} onChange={setMapname} errorMessage="Informe o mapname." />

          <ValidatedInput label="X" value={x} onChange={setX} errorMessage="Informe a coordenada X." type="number" />

          <ValidatedInput label="Y" value={y} onChange={setY} errorMessage="Informe a coordenada Y." type="number" />

          <ValidatedInput label="Job" value={job} onChange={setJob} errorMessage="Informe o job." type="number" />

          <ValidatedInput label="Type" value={type} onChange={setType} errorMessage="Informe o type." />

          <button type="submit" className="btn frutiger-btn">
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NpcEditPage;
