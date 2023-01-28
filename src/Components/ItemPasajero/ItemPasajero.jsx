import React, { useState } from "react";

function ItemPasajero(props) {
  const { index, pasajero, updateAsistencia } = props;
  const clases = [
    "list-group-item mb-2 fw-bolder ",
    !pasajero.asistencia ? " list-group-item-danger" : " list-group-item-success",
  ];

  return (
    <li
      key={index}
      className={clases}
      onClick={() => updateAsistencia(pasajero)}
    >
      {pasajero.nombreCompleto} | {pasajero.celular}
    </li>
  );
}

export default ItemPasajero;
