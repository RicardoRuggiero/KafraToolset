
import { useState } from "react";
import { itemService } from "../../services/itemService";
import HomeButton from "../../components/HomeButton";

function ItemCreatePage() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
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
    <div className="container mt-4">
      <HomeButton />
      <div className="container mt-4">
        <h2>Cadastro de Item</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              ID
            </label>

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
            <label className="form-label">
              Nome
            </label>

            <input
              className="form-control"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Descrição
            </label>

            <textarea
              className="form-control"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Peso
            </label>

            <input
              type="number"
              className="form-control"
              value={weight}
              onChange={(e) =>
                setWeight(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Imagem
            </label>

            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                if (e.target.files?.length) {
                  setImage(
                    e.target.files[0]
                  );
                }
              }}
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

export default ItemCreatePage;