"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Form from "./components/form/form";
import Table from "./components/table/table";
import Progress from "./components/progress/progress";

export default function Home() {
  const [codigo, setCodigo] = useState("");
  const [containers, setContainers] = useState([]);
  const [error, setError] = useState(null);
  const [containerData, setContainerData] = useState([]);
  const [progreso, setProgreso] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);

  // Función para manejar el envío del formulario
  const handleFormSubmit = (codigoIngresado) => {
    setCodigo(codigoIngresado.trim());
  };

  // Función para limpiar la tabla cuando se modifica el código
  const handleClear = () => {
    setContainerData([]);
    setProgreso([]);
    setIsTableVisible(false);
  };

  // Fetch de los datos de contenedores
  const fetchContainers = async () => {
    try {
      const response = await fetch("/api/containers");
      if (!response.ok) throw new Error("Error al obtener los datos");
      const data = await response.json();
      setContainers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Filtra contenedores por el código ingresado
  const filteredContainers = (codigo) => {
    if (!codigo) return [];
    return containers.filter(
      (container) => container.shipment_number === codigo
    );
  };

  useEffect(() => {
    fetchContainers();
  }, []);

  // Calcula el porcentaje de progreso del envío
  const calcularProgresoEnvioPorFecha = (created_at, eta) => {
    const fechaActual = new Date();
    const fechaInicio = new Date(created_at);
    const fechaFin = new Date(eta);
    const totalTiempo = fechaFin - fechaInicio;
    const tiempoTranscurrido = fechaActual - fechaInicio;
    if (totalTiempo <= 0) return 0;
    return Math.min(
      Math.max(Math.round((tiempoTranscurrido / totalTiempo) * 100), 0),
      100
    );
  };

  useEffect(() => {
    const filteredData = filteredContainers(codigo).map((containerItem) => {
      const progreso = calcularProgresoEnvioPorFecha(
        containerItem.created_at,
        containerItem.eta
      );
      const containerDetails = {
        importer: containerItem.importer,
        vessel_name: containerItem.containers[0].events.at(-1).vessel.name,
        status:
          containerItem.status === "IN_TRANSIT"
            ? "En tránsito"
            : containerItem.status,
        origin: containerItem.origin_location.name,
        destination: containerItem.destination_location.name,
        arrival_date: new Date(containerItem.eta).toLocaleDateString(),
        arrival_time: new Date(containerItem.eta).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      return { progreso, containerDetails };
    });

    setProgreso(filteredData.map((item) => item.progreso));
    setContainerData(filteredData.map((item) => item.containerDetails));
    setIsTableVisible(filteredData.length > 0);
  }, [codigo, containers]);

  const hasMatchingContainers = filteredContainers(codigo).length > 0;

  return (
    <main
      className={`${styles.main} ${
        hasMatchingContainers ? styles.expanded : ""
      }`}
    >
      <Form
        title="Formulario"
        onSubmit={handleFormSubmit}
        onCodeChange={handleClear}
      />
      <Progress progreso={progreso} />
      {hasMatchingContainers ? (
        <h1 className={styles.title}>Orden #{codigo}</h1>
      ) : (
        codigo && <p>No se encontraron resultados para la orden #{codigo}</p>
      )}
      <Table data={containerData} isVisible={isTableVisible} />
      {error && <div className={styles.error}>{error}</div>}
    </main>
  );
}
