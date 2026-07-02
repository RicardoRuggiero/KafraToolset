// ============================================================================
// KafraToolset - Frontend
// ============================================================================
// Copyright (c) 2026 Ricardo RO - EOS
//
// Página da aplicação responsável por apresentar uma funcionalidade
// específica ao usuário, integrando componentes visuais, gerenciamento de
// estado, navegação e comunicação com os serviços da API.
//
// File: src/pages/item/ItemCreatePage.tsx
//
// Purpose: Permitir o cadastro de novos itens, incluindo
// upload de imagem e envio dos dados à API.
// ============================================================================

import { useState } from "react";
import { itemService } from "../../services/itemService";
import HomeButton from "../../components/HomeButton";
import ValidatedInput from "../../components/ValidatedInput";

function ItemCreatePage() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id.trim()) {
      alert("Informe o ID.");
      return;
    }

    if (!name.trim()) {
      alert("Informe o nome.");
      return;
    }

    if (!weight.trim()) {
      alert("Informe o peso.");
      return;
    }

    const formData = new FormData();

    formData.append("id", id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("weight", weight);

    if (image) {
      formData.append("image", image);
    }

    await itemService.create(formData);

    alert("Item cadastrado com sucesso!");

    setId("");
    setName("");
    setDescription("");
    setWeight("");
    setImage(null);
  };

  return (
    <div className="container mt-4 frutiger-page">
      <HomeButton />
      <div className="container mt-4 frutiger-page">
        <h2 className="frutiger-subtitle">Cadastro de Item</h2>

        <form onSubmit={handleSubmit}>
          <ValidatedInput label="ID" value={id} onChange={setId} errorMessage="Informe o ID." type="number" />

          <ValidatedInput label="Nome" value={name} onChange={setName} errorMessage="Informe o nome." />

          <ValidatedInput label="Descrição" value={description} onChange={setDescription} errorMessage="Informe a descrição." textarea />

          <ValidatedInput label="Peso" value={weight} onChange={setWeight} errorMessage="Informe o peso." type="number" />

          <div className="mb-3">
            <label className="form-label frutiger-label">Imagem</label>

            <input
              type="file"
              className="form-control frutiger-input"
              onChange={(e) => {
                if (e.target.files?.length) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>

          <button type="submit" className="btn frutiger-btn">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ItemCreatePage;
