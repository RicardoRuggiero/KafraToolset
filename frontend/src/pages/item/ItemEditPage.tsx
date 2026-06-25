
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { itemService } from "../../services/itemService";
import HomeButton from "../../components/HomeButton";

function ItemEditPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (!id) return;

    itemService.getById(Number(id))
      .then((item) => {
        setName(item.name ?? "");
        setDescription(item.description ?? "");
        setWeight(
          item.weight?.toString() ?? ""
        );
      });
  }, [id]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Informe o nome.");
      return;
    }

    if (!weight.trim()) {
      alert("Informe o peso.");
      return;
    }

    await itemService.update(
      Number(id),
      {
        name,
        description,
        weight: Number(weight),
      }
    );

    alert("Item atualizado!");

    navigate("/items");
  };

  return (
    <div className="container mt-4 frutiger-page">
      <HomeButton />
      <div className="container mt-4 frutiger-page">
        <h2 className="frutiger-subtitle">Editar Item</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label frutiger-label">
              Nome
            </label>

            <input
              className="form-control frutiger-input"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label frutiger-label">
              Descrição
            </label>

            <textarea
              className="form-control frutiger-input"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label frutiger-label">
              Peso
            </label>

            <input
              type="number"
              className="form-control frutiger-input"
              value={weight}
              onChange={(e) =>
                setWeight(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="btn frutiger-btn"
          >
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ItemEditPage;