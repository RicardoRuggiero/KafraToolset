
import { useEffect, useState } from "react";
import { soldbyService } from "../../services/soldbyService";
import { itemService } from "../../services/itemService";
import { npcService } from "../../services/npcService";

import type { Item } from "../../types/Item";
import type { Npc } from "../../types/Npc";

import HomeButton from "../../components/HomeButton";

function SoldbyCreatePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [npcs, setNpcs] = useState<Npc[]>([]);

  const [itemId, setItemId] = useState("");
  const [npcId, setNpcId] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    itemService.getAll().then(setItems);
    npcService.getAll().then(setNpcs);
  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!itemId) {
      alert("Selecione um item.");
      return;
    }

    if (!npcId) {
      alert("Selecione um NPC.");
      return;
    }

    if (!price) {
      alert("Informe um preço.");
      return;
    }

    try {
      await soldbyService.create({
        itemId: Number(itemId),
        npcId: Number(npcId),
        price: Number(price),
      });

      alert(
        "Relação Item ↔ NPC criada com sucesso!"
      );

      setItemId("");
      setNpcId("");
      setPrice("");
    } catch (err: any) {
      alert(
        err?.response?.data?.error ??
        "Erro ao criar relação."
      );
    }
  };

  return (
    <div className="container mt-4 frutiger-page">

      <HomeButton />

      <div className="container mt-4 frutiger-page">

        <h2 className="frutiger-subtitle">
          Item vendido por NPC
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label frutiger-label">
              Item
            </label>

            <select
              className="form-select frutiger-input"
              value={itemId}
              onChange={(e) =>
                setItemId(e.target.value)
              }
            >
              <option value="">
                Selecione um Item
              </option>

              {items.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.id} - {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label frutiger-label">
              NPC
            </label>

            <select
              className="form-select frutiger-input"
              value={npcId}
              onChange={(e) =>
                setNpcId(e.target.value)
              }
            >
              <option value="">
                Selecione um NPC
              </option>

              {npcs.map((npc) => (
                <option
                  key={npc.id}
                  value={npc.id}
                >
                  {npc.id} - {npc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label frutiger-label">
              Preço
            </label>

            <input
              type="number"
              className="form-control frutiger-input"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="btn frutiger-btn"
          >
            Vincular Item ao NPC
          </button>

        </form>

      </div>

    </div>
  );
}

export default SoldbyCreatePage;