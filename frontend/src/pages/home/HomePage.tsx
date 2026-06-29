
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import UserMenu from "../../components/UserMenu";

function HomePage() {
  const { isAuthenticated } = useAuth();
  return (

    <div className="container py-5">

      <div
        className="
          frutiger-card
          p-4
          mx-auto
        "
        style={{ maxWidth: "700px" }}
      >
        <h1
          className="
            text-center
            mb-4
            frutiger-title
          "
        >
          KafraToolset
        </h1>

        <div className="d-grid gap-3">

          <Link
            to="/register"
            className="btn frutiger-btn"
          >
            Novo Usuário
          </Link>

          {
            !isAuthenticated && (
              <Link
                to="/login"
                className="btn frutiger-btn"
              >
                Login Usuário
              </Link>
            )
          }

          {
            isAuthenticated && (
              <UserMenu />
            )
          }

          <Link
            to="/items/new"
            className="btn frutiger-btn"
          >
            Novo Item
          </Link>

          <Link
            to="/items"
            className="btn frutiger-btn"
          >
            Lista Item
          </Link>

          <Link
            to="/npcs/new"
            className="btn frutiger-btn"
          >
            Novo NPC
          </Link>

          <Link
            to="/npcs"
            className="btn frutiger-btn"
          >
            Lista NPC
          </Link>

          <Link
            to="/soldby/new"
            className="btn frutiger-btn"
          >
            Item vendido por NPC
          </Link>

        </div>
      </div>

    </div>
  );
}

export default HomePage;