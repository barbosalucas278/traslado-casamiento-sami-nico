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
    "list-group-item mb-2 fw-bolder ",
    !pasajero.asistencia
      ? " list-group-item-danger"
      : " list-group-item-success",
  ];

  return (
    <div>
      <li
        key={index}
        className={clases}
        onClick={() => updateAsistencia(pasajero)}
      >
        {pasajero.nombreCompleto}
        {!usuarioInvitado && ` | ${pasajero.celular}`}
      </li>
      <div className="container position-relative top-100 start-50 translate-middle">
        {pasajero.pago ? (
          <span className="badge bg-success rounded-pill">Ya Pagó</span>
        ) : (
          <>
            <span className="badge bg-danger rounded-">No Pagó</span>
            {!usuarioInvitado &&
              usuarioTesorero &&
              !pasajero.pago &&
              pasajero.asistencia && (
                <button
                  type="button"
                  className="btn btn-success btn-sm btn-pago position-relative top-100 start-50 "
                  onClick={() => updatePago(pasajero)}
                >
                  Confirmar pago
                </button>
              )}
          </>
        )}
      </div>
    </div>
  );
}

export default ItemPasajero;
