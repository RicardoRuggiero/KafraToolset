
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container mt-4">
      <h1>KafraToolset</h1>

      <div className="d-grid gap-2 mt-4">

        <Link
          to="/register"
          className="btn btn-primary"
        >
          Cadastro de Usuário
        </Link>

        <Link
          to="/login"
          className="btn btn-primary"
        >
          Login
        </Link>

        <Link
          to="/items"
          className="btn btn-primary"
        >
          Listagem de Itens
        </Link>

        <Link
          to="/items/new"
          className="btn btn-primary"
        >
          Cadastro de Item
        </Link>

        <Link
          to="/npcs"
          className="btn btn-primary"
        >
          Listagem de NPCs
        </Link>

        <Link
          to="/npcs/new"
          className="btn btn-primary"
        >
          Cadastro de NPC
        </Link>

      </div>
    </div>
  );
}

export default HomePage;