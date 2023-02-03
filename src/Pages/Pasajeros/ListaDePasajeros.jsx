import React, { useEffect, useState } from "react";
import ItemPasajero from "../../Components/ItemPasajero/ItemPasajero";
import {
  getAllParadas,
  getAllPasajerosByParada,
  guardarPasajeroEnCollection,
  updateEstadoPasajeros,
  updatePagoPasajeros,
} from "../../Services/firestoreServicee";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./listaDePasajeros.css";
import { useNavigation, useNavigate, useLocation } from "react-router-dom";
import UserFormModal from "../../Components/UserFormModal/UserFormModal";

function ListaDePasajeros() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [listaDePasajeros, setListaDePasajeros] = useState([]);
  const [listaDeParadas, setListaDeParadas] = useState([]);
  const [actualizarLista, setActualizarLista] = useState(true);
  const [paradaSeleccionada, setParadaSeleccionada] = useState({
    parada: "Barracas",
    lugar: "Plaza Colombia 15:20"
  });
  const [showSeleccionarParada, setShowSeleccionarParada] = useState(false);
  const [showUserFormModal, setShowUserFormModal] = useState(false);
  useEffect(() => {
    if (!location.state || !location.state.autorizado) {
      navigate("/");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllParadas((data) => {
        const response = data.docs.map((doc) => doc.data());
        setListaDeParadas(response);
      },
        (error) => console.log(error));
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await getAllPasajerosByParada(
        "pasajeros",
        paradaSeleccionada.parada,
        (data) => {
          const response = data.docs.map((doc) => doc.data());
          setListaDePasajeros(response);
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
          setActualizarLista(false);
        },
        (error) => console.log(error)
      );
    };
    if (actualizarLista) {
      fetchData();
    }
  }, [actualizarLista, paradaSeleccionada]);

  const handleUpdateAsistencia = async (pasajero) => {
    try {
      if (!location.state.invitado) {
        await updateEstadoPasajeros(
          "pasajeros",
          pasajero.nombreCompleto,
          !pasajero.asistencia
        );
        setActualizarLista(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdatePago = async (pasajero) => {
    try {
      if (!location.state.invitado) {
        await updatePagoPasajeros(
          "pasajeros",
          pasajero.nombreCompleto,
          !pasajero.pago
        );
        setActualizarLista(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddPasajero = async (pasajero) => {
    try {
      if (!location.state.invitado) {
        await guardarPasajeroEnCollection(
          "pasajeros",
          pasajero.nombreCompleto,
          pasajero
        );
        setActualizarLista(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-lista">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {showUserFormModal ? (
            <UserFormModal
              onSubmit={handleAddPasajero}
              onClose={setShowUserFormModal}
              paradas={listaDeParadas}
            />
          ) : (
            <div class="position-fixed container-btn-agregar">
              <button
                class="btn btn-success btn-agregarPasajero fs-1 fw-bolder bg-success"
                type="button"
                onClick={() => setShowUserFormModal(true)}
              >
                +
              </button>
            </div>
          )}
          <h2
            className="text-center bg-warning m-0 p-3"
            onClick={() => setShowSeleccionarParada(true)}
          >
            Seleccionar Parada
          </h2>
          {showSeleccionarParada ? (
            <>
              <div className="text-center bg-warning">
                {listaDeParadas.map(parada => (
                  <h1
                    onClick={() => {
                      setParadaSeleccionada({
                        parada: parada.nombre,
                        lugar: `${parada.lugarDeReunion} ${parada.horarioDeReunion}`,
                      });
                      setShowSeleccionarParada(false);
                      setActualizarLista(true);
                    }}
                  >
                    {parada.nombre}
                  </h1>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-center">{paradaSeleccionada.parada}</h1>
              <h3 className="text-center">{paradaSeleccionada.lugar}</h3>
              <ul className="list-group">
                {listaDePasajeros.map((p, i) => (
                  <ItemPasajero
                    key={i}
                    pasajero={p}
                    index={i}
                    updateAsistencia={handleUpdateAsistencia}
                    updatePago={handleUpdatePago}
                    usuarioInvitado={location.state.invitado}
                    usuarioTesorero={location.state.tesorera}
                  ></ItemPasajero>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ListaDePasajeros;
