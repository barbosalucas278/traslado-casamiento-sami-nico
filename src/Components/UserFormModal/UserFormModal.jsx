import React, { useState } from "react";

function UserFormModal(props) {
  const { onClose, onSubmit } = props;
  const [userData, SetUserData] = useState({
    email: "",
    parada: "",
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
      class="modal modal-signin position-static d-block bg-secondary py-5"
      tabindex="-1"
      role="dialog"
      id="modalSignin"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content rounded-4 shadow">
          <div class="modal-header p-5 pb-4 border-bottom-0">
            <h1 class="fw-bold mb-0 fs-2">Agregar Pasajero</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => onClose(false)}
            ></button>
          </div>

          <div class="modal-body p-5 pt-0">
            <form class="" onSubmit={handleSubmit}>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control rounded-3"
                  placeholder="Pepito Sanchez"
                  onChange={(e) =>
                    SetUserData({ ...userData, nombreCompleto: e.target.value })
                  }
                />
                <label for="floatingInput">Nombre Completo</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control rounded-3"
                  placeholder="name@example.com"
                  onChange={(e) =>
                    SetUserData({ ...userData, email: e.target.value })
                  }
                />
                <label for="floatingInput">Email</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control rounded-3"
                  placeholder="Barracas"
                  onChange={(e) =>
                    SetUserData({ ...userData, parada: e.target.value })
                  }
                />
                <label for="floatingPassword">Parada</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="number"
                  class="form-control rounded-3"
                  placeholder="11xxxxxxxx"
                  onChange={(e) =>
                    SetUserData({ ...userData, celular: e.target.value })
                  }
                />
                <label for="floatingPassword">Celular</label>
              </div>
              <button
                class="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
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
