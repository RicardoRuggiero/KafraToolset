import { useState } from "react";
import { authService } from "../../services/authService";
import RegisterValidatedInput from "../../components/RegisterValidatedInput";
import HomeButton from "../../components/HomeButton";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [secret, setSecret] = useState("");

  const hasStarted = email.trim() !== "" || senha.trim() !== "" || secret.trim() !== "";

  const emailInvalid = hasStarted && (email.trim() === "" || !email.includes("@"));

  const senhaInvalid = hasStarted && senha.trim() === "";

  const secretInvalid = hasStarted && secret.trim() === "";

  const handleSubmit = async (e: React.FormEvent) => {
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

    await authService.register({ email, senha, secret });

    alert("Usuário cadastrado com sucesso!");

    setEmail("");
    setSenha("");
    setSecret("");
  };

  return (
    <div className="container mt-4 frutiger-page">
      <HomeButton />

      <h2 className="frutiger-subtitle">Seja bem vindo! Para entrar é necessário se registrar ~</h2>
      <div className="container mt-4 frutiger-page">
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit}>
          <RegisterValidatedInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            isInvalid={emailInvalid}
            isValid={email.trim() !== "" && email.includes("@")}
            errorMessage={email.trim() === "" ? "Informe o email." : "Email inválido."}
          />

          <RegisterValidatedInput
            label="Senha"
            type="password"
            value={senha}
            onChange={setSenha}
            isInvalid={senhaInvalid}
            isValid={senha.trim() !== ""}
            errorMessage="Informe a senha."
          />

          <RegisterValidatedInput
            label="Secret"
            type="text"
            value={secret}
            onChange={setSecret}
            isInvalid={secretInvalid}
            isValid={secret.trim() !== ""}
            errorMessage="Informe o secret."
          />

          <button type="submit" className="btn frutiger-btn">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
