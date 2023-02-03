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
    <div className="row m-0">
      <div className="col-sm-6 left-container">
        <div className="container-titulo text-center">
          <h1>
            Traslado Casamiento <br />
            de Sami y nico
          </h1>
        </div>
      </div>
      <div className="col-sm-6 right-container">
        <main className="form-signin">
          <form>
            <div className="w-75 form-floating m-sm-3">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Usuario"
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="false"
              />
              <label for="floatingInput">Usuario</label>
            </div>
            <div className="w-75 form-floating m-3">
              <input
                type="password"
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
            <p className="mt-5 mb-3 text-muted text-center">&copy; Lucas Barbosa</p>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Login;
