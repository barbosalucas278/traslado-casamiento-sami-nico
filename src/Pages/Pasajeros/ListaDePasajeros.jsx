import React, { useEffect, useState } from "react";
import ItemPasajero from "../../Components/ItemPasajero/ItemPasajero";
import {
  getAllPasajerosByParada,
  updateEstadoPasajeros,
  updatePagoPasajeros,
} from "../../Services/firestoreServicee";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./listaDePasajeros.css";
import { useNavigation, useNavigate, useLocation } from "react-router-dom";

function ListaDePasajeros() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [listaDePasajeros, setListaDePasajeros] = useState([]);
  const [actualizarLista, setActualizarLista] = useState(true);
  const [paradaSeleccionada, setParadaSeleccionada] = useState({
    parada: "Barracas",
    lugar: "Plaza Colombia 15:30",
  });
  const [showSeleccionarParada, setShowSeleccionarParada] = useState(false);
  useEffect(() => {
    if (!location.state || !location.state.autorizado) {
      navigate("/");
    }
  }, [location.state, navigate]);

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

  return (
    <div className="container-lista">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <h2
            className="text-center bg-warning m-0 p-3"
            onClick={() => setShowSeleccionarParada(true)}
          >
            Seleccionar Parada
          </h2>
          {showSeleccionarParada ? (
            <>
              <div className="text-center bg-warning">
                <h1
                  onClick={() => {
                    setParadaSeleccionada({
                      parada: "Caballito",
                      lugar: "Acoyte y Rivadavia 15:50",
                    });
                    setShowSeleccionarParada(false);
                    setActualizarLista(true);
                  }}
                >
                  Caballito
                </h1>
                <h1
                  onClick={() => {
                    setParadaSeleccionada({
                      parada: "Barracas",
                      lugar: "Plaza Colombia 15:30",
                    });
                    setShowSeleccionarParada(false);
                    setActualizarLista(true);
                  }}
                >
                  Barracas
                </h1>
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
