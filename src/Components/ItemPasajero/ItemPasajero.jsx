import React, { useState } from "react";

function ItemPasajero(props) {
  const { index, pasajero, updateAsistencia, usuarioInvitado } = props;
  const clases = [
    "list-group-item mb-2 fw-bolder ",
    !pasajero.asistencia
      ? " list-group-item-danger"
      : " list-group-item-success",
  ];

  return (
    <li
      key={index}
      className={clases}
      onClick={() => updateAsistencia(pasajero)}
    >
      {pasajero.nombreCompleto}
      {!usuarioInvitado && ` | ${pasajero.celular}`}
    </li>
  );
}

export default ItemPasajero;
