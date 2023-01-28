import React, { useState } from "react";
import LogoApp from "../assets/fondo-app.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [userIndex, setUserIndex] = useState();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (isTesorera(username, password) || isTesorero(username, password)) {
      navigate("/pasajeros", {
        state: { autorizado: true, invitado: false, tesorera: true },
      });
    }
    if (isInvitado(username, password)) {
      navigate("/pasajeros", {
        state: { autorizado: true, invitado: true, tesorera: false },
      });
    }
    if (isValidUserName(username) && isValidPassword(password)) {
      navigate("/pasajeros", {
        state: { autorizado: true, invitado: false, tesorera: false },
      });
    }
  };
  const isTesorera = (username, password) => {
    if (username === "Lgonzalez" && password === "1140352040") {
      return true;
    }
    return false;
  };
  const isTesorero = (username, password) => {
    if (username === "Lbarbosa" && password === "1161336329") {
      return true;
    }
    return false;
  };
  const isInvitado = () => {
    if (username === "Invitado" && password === "Enlapera") {
      return true;
    }
    return false;
  };

  const isValidUserName = (username) => {
    const validUsernames = ["Lbarbosa", "Smartinez"];
    if (validUsernames.includes(username)) {
      setUserIndex(validUsernames.indexOf(username));
      return true;
    }
    return false;
  };
  const isValidPassword = (password) => {
    const validPassword = ["1161336329", "1153119077"];
    return validPassword[userIndex] == password;
  };

  return (
    <body className="text-center">
      <div className="position-relative">
        <img src={LogoApp} alt="" />
        <div className="container-titulo position-absolute top-50 start-50 translate-middle">
          <h1 className="">
            Traslado Casamiento <br />
            de Sami y nico
          </h1>
        </div>
      </div>
      <main className="form-signin w-100 m-auto">
        <form>
          <div className="form-floating m-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Usuario"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label for="floatingInput">Usuario</label>
          </div>
          <div className="form-floating m-3">
            <input
              type="text"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="floatingPassword">Contraseña</label>
          </div>
          <button
            className="w-75 btn btn-lg btn-primary m-3"
            onClick={handleLogin}
          >
            Ingresar
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; Lucas Barbosa</p>
        </form>
      </main>
    </body>
  );
}

export default Login;
