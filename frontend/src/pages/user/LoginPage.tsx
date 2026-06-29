
import { useState } from "react";
import { authService } from "../../services/authService";
import HomeButton from "../../components/HomeButton";

import { useAuth } from "../../contexts/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Informe o email.");
      return;
    }

    if (!senha.trim()) {
      alert("Informe a senha.");
      return;
    }

    const response = await authService.login({
      email,
      senha,
    });

    login(
      response.token
    );

    alert(
      "Login realizado com sucesso!"
    );
  };

  return (
    <div className="container mt-4 frutiger-page">
      <HomeButton />

      <div className="container mt-4 frutiger-page">
        <h2 className="frutiger-subtitle">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label frutiger-label">
              Email
            </label>

            <input
              type="email"
              className="form-control frutiger-input"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label frutiger-label">
              Senha
            </label>

            <input
              type="password"
              className="form-control frutiger-input"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="btn frutiger-btn"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;