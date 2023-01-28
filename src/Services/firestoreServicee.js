import { app } from "./firebase";

const firestore = app.firestore();

export const updateEstadoPasajeros = async (coleccion, doc, nuevoEstado) => {
  const estadoActualizado = nuevoEstado;
  return await firestore.collection(coleccion).doc(doc).update({
    asistencia: estadoActualizado,
  });
};
export const getAllPasajerosByParada = async (
  coleccion,
  parada,
  onResult,
  onError
) => {
  return await firestore
    .collection(coleccion)
    .where("parada", "==", parada)
    .onSnapshot(onResult, onError);
};
