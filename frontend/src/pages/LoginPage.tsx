
import { useState } from "react";
import { authService } from "../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const response = await authService.login({
      email,
      senha,
    });

    localStorage.setItem(
      "token",
      response.token
    );

    alert("Login realizado com sucesso!");
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Email
          </label>

          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Senha
          </label>

          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;