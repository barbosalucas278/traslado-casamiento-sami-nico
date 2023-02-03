import React, { useState } from "react";
import { Form } from "react-bootstrap";

function UserFormModal(props) {
  const { onClose, onSubmit, paradas } = props;
  const [userData, SetUserData] = useState({
    email: "",
    parada: paradas[0].nombre,
    celular: "",
    nombreCompleto: "",
  });
  const handleSubmit = () => {
    if (dataFormIsValid()) {
      onSubmit(userData);
      onClose(false);
    }
  };
  //Valida el formulario
  const dataFormIsValid = () => {
    return true;
  };
  return (
    <div
      className="modal modal-signin position-static d-block bg-secondary py-5"
      tabindex="-1"
      role="dialog"
      id="modalSignin"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2">Agregar Pasajero</h1>
            <button
              type="button"
              className="btn-close bg-light"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => onClose(false)}
            ></button>
          </div>

          <div className="modal-body p-5 pt-0">
            <form className="" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="Pepito Sanchez"
                  onChange={(e) =>
                    SetUserData({ ...userData, nombreCompleto: e.target.value })
                  }
                />
                <label for="floatingInput">Nombre Completo</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control rounded-3"
                  placeholder="name@example.com"
                  onChange={(e) =>
                    SetUserData({ ...userData, email: e.target.value })
                  }
                />
                <label for="floatingInput">Email</label>
              </div>
              {/* <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="Barracas"
                  onChange={(e) =>
                    SetUserData({ ...userData, parada: e.target.value })
                  }
                />
                <label for="floatingPassword">Parada</label>                
              </div> */}
              <Form.Select onChange={(e) =>
                SetUserData({ ...userData, parada: e.target.value })
              } className="form-floating mb-3" aria-label="Default select example">
                {paradas.map(parada => (
                  <option value={parada.nombre}>{parada.nombre}</option>
                ))}
              </Form.Select>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control rounded-3"
                  placeholder="11xxxxxxxx"
                  onChange={(e) =>
                    SetUserData({ ...userData, celular: e.target.value })
                  }
                />
                <label for="floatingPassword">Celular</label>
              </div>
              <button
                className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                type="submit"
              >
                Agregar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFormModal;
