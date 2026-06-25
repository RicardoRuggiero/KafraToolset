
import { useState } from "react";
import { authService } from "../../services/authService";
import HomeButton from "../../components/HomeButton";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [secret, setSecret] = useState("");

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

    if (!secret.trim()) {
      alert("Informe o secret.");
      return;
    }

    await authService.register({
      email,
      senha,
      secret,
    });

    alert("Usuário cadastrado com sucesso!");

    setEmail("");
    setSenha("");
    setSecret("");
  };

  return (
    <div className="container mt-4">
      <HomeButton />

      <h2>Itens</h2>
      <div className="container mt-4">
        <h2>Cadastro de Usuário</h2>

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

          <div className="mb-3">
            <label className="form-label">
              Secret
            </label>

            <input
              className="form-control"
              value={secret}
              onChange={(e) =>
                setSecret(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;