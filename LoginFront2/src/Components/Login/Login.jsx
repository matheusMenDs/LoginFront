import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("login");

  // Estados para registro
  const [registerData, setRegisterData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: ""
  });

  // Estado para armazenar usuários cadastrados
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentScreen === "register") {
      if (!registerData.nome || !registerData.email || !registerData.telefone || !registerData.senha || !registerData.confirmarSenha) {
        setMessage("Por favor, preencha todos os campos!");
        return;
      }

      if (registerData.senha !== registerData.confirmarSenha) {
        setMessage("As senhas não coincidem!");
        return;
      }

      if (registerData.senha.length < 6) {
        setMessage("A senha deve ter pelo menos 6 caracteres!");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registerData.email)) {
        setMessage("Digite um email válido!");
        return;
      }

      // Verificar se já existe
      if (registeredUsers.some(u => u.email === registerData.email)) {
        setMessage("Este e-mail já está cadastrado!");
        return;
      }

      setRegisteredUsers(prev => [...prev, {
        nome: registerData.nome,
        email: registerData.email,
        telefone: registerData.telefone,
        senha: registerData.senha
      }]);

      setMessage(`Conta criada com sucesso para ${registerData.nome}! Use seu email para fazer login.`);
      setCurrentScreen("login");

      setRegisterData({
        nome: "",
        email: "",
        telefone: "",
        senha: "",
        confirmarSenha: ""
      });
      return;
    }

    if (currentScreen === "forgot") {
      if (username) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
          setMessage("Digite um email válido!");
          return;
        }
        setMessage(`Link de recuperação enviado para ${username}!`);
        setCurrentScreen("login");
      } else {
        setMessage("Por favor, digite seu e-mail!");
      }
      return;
    }

    if (username && password) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(username)) {
        setMessage("Digite um email válido!");
        return;
      }

      const user = registeredUsers.find(u => u.email === username && u.senha === password);
      if (!user) {
        setMessage("Usuário não encontrado ou senha incorreta. Cadastre-se primeiro.");
        return;
      }

      setMessage(`Bem-vindo(a), ${user.nome}!`);
      setIsLoggedIn(true);
    } else {
      setMessage("Por favor, preencha todos os campos!");
    }
  };

  const goToRegister = (e) => {
    e.preventDefault();
    setCurrentScreen("register");
    setMessage("");
    setUsername("");
    setPassword("");
  };

  const goToForgot = (e) => {
    e.preventDefault();
    setCurrentScreen("forgot");
    setMessage("");
    setUsername("");
    setPassword("");
  };

  const goToLogin = (e) => {
    e.preventDefault();
    setCurrentScreen("login");
    setMessage("");
    setUsername("");
    setPassword("");
    setRegisterData({
      nome: "",
      email: "",
      telefone: "",
      senha: "",
      confirmarSenha: ""
    });
  };

  if (isLoggedIn) {
    return (
      <div className="container">
        <div className="success-message">
          <h2>🎉 {message}</h2>
          <p>Login realizado com sucesso!</p>
          <button onClick={() => setIsLoggedIn(false)}>Sair</button>
        </div>
      </div>
    );
  }

  if (currentScreen === "register") {
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Criar Conta</h1>
          <h3><i>Registre-se no sistema</i></h3>

          {message && (
            <div className="error-message">{message}</div>
          )}

          <div className="input-field">
            <input
              type="text"
              placeholder="Nome completo"
              value={registerData.nome}
              onChange={(e) => setRegisterData({...registerData, nome: e.target.value})}
            />
            <FaUser className="icon" />
          </div>

          <div className="input-field">
            <input
              type="email"
              placeholder="E-mail"
              value={registerData.email}
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
            />
            <FaEnvelope className="icon" />
          </div>

          <div className="input-field">
            <input
              type="tel"
              placeholder="Telefone"
              value={registerData.telefone}
              onChange={(e) => setRegisterData({...registerData, telefone: e.target.value})}
            />
            <FaPhone className="icon" />
          </div>

          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              value={registerData.senha}
              onChange={(e) => setRegisterData({...registerData, senha: e.target.value})}
            />
            <FaLock className="icon" />
          </div>

          <div className="input-field">
            <input
              type="password"
              placeholder="Confirmar senha"
              value={registerData.confirmarSenha}
              onChange={(e) => setRegisterData({...registerData, confirmarSenha: e.target.value})}
            />
            <FaLock className="icon" />
          </div>

          <button type="submit">Criar Conta</button>

          <div className="signup-link">
            <p>Já tem uma conta? 
              <a href="#" onClick={goToLogin}>
                {" "}Entrar
              </a>
            </p>
          </div>
        </form>
      </div>
    );
  }

  if (currentScreen === "forgot") {
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Recuperar Senha</h1>
          <h3><i>Digite seu e-mail</i></h3>

          {message && (
            <div className="error-message">{message}</div>
          )}

          <div className="input-field">
            <input
              type="email"
              placeholder="E-mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </div>

          <button type="submit">Enviar Link</button>

          <div className="signup-link">
            <p>Lembrou da senha? 
              <a href="#" onClick={goToLogin}>
                {" "}Voltar ao Login
              </a>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Acesse o Sistema</h1>
        <h3><i>Projeto React</i></h3>

        {message && !isLoggedIn && (
          <div className="error-message">{message}</div>
        )}

        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaEnvelope className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#" onClick={goToForgot}>
            Esqueceu a senha?
          </a>
        </div>

        <button type="submit">Entrar</button>

        <div className="signup-link">
          <p>Não tem uma conta? 
            <a href="#" onClick={goToRegister}>
              {" "}Registrar
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
