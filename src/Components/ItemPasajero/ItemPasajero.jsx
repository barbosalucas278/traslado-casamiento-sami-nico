import React, { useState } from "react";
import "./itemPasajero.css";
function ItemPasajero(props) {
  const {
    index,
    pasajero,
    updateAsistencia,
    usuarioInvitado,
    updatePago,
    usuarioTesorero,
  } = props;
  const clases = [
    "list-group-item mb-2 fw-bolder item-pasajero ",
    !pasajero.asistencia
      ? " list-group-item-danger"
      : " list-group-item-success",
  ];

  return (
    <div className="col-sm-3 col-12">
      <li
        key={index}
        className={clases}
        onClick={() => updateAsistencia(pasajero)}
      >
        {pasajero.nombreCompleto}
        {!usuarioInvitado && ` | ${pasajero.celular}`}
      </li>
      <div className="container position-relative top-100 top-sm-0 start-50 translate-middle">
        {pasajero.pago ? (
          <span className="badge bg-success rounded-pill">Ya Pagó</span>
        ) : (
          <>
            <span className="badge bg-danger rounded-pill">No Pagó</span>
            {!usuarioInvitado &&
              usuarioTesorero &&
              !pasajero.pago &&
              pasajero.asistencia && (
                <button
                  type="button"
                  className="btn btn-success btn-sm btn-pago position-absolute top-25 start-100 translate-middle"
                  onClick={() => updatePago(pasajero)}
                >
                  $$$
                </button>
              )}
          </>
        )}
      </div>
    </div>
  );
}

export default ItemPasajero;
