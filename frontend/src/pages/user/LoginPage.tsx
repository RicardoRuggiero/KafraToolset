
import { useState } from "react";
import { authService } from "../../services/authService";
import HomeButton from "../../components/HomeButton";
import LoginValidatedInput from "../../components/LoginValidatedInput";

import "../../style/validated-input.css";

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

          <LoginValidatedInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            isInvalid={
              (
                email.trim() !== "" ||
                senha.trim() !== ""
              ) &&
              (
                email.trim() === "" ||
                !email.includes("@")
              )
            }

            isValid={
              email.trim() !== "" &&
              email.includes("@")
            }
            errorMessage="Email inválido."
          />

          <LoginValidatedInput
            label="Senha"
            type="password"
            value={senha}
            onChange={setSenha}
            isInvalid={
              email.trim() !== "" &&
              senha.trim() === ""
            }
            isValid={
              senha.trim() !== ""
            }
            errorMessage="Informe a senha."
          />

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