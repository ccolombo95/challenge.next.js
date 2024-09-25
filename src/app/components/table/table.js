import PropTypes from "prop-types";
import styles from "./table.module.scss";
import React from "react";

export default function Table({ data, isVisible }) {
  // Traducción de claves a español
  const translations = {
    importer: "Importador",
    vessel_name: "Buque",
    status: "Estado",
    origin: "Origen",
    destination: "Destino",
    arrival_date: "Fecha de llegada",
    arrival_time: "Hora de llegada",
  };

  return (
    <table
      className={`${styles.detailsTable} ${isVisible ? styles.expanded : ""}`}
    >
      {data[0]?.importer && (
        <thead>
          <tr>
            <th colSpan="2" className={styles.label}>
              {data[0].importer}
            </th>
          </tr>
        </thead>
      )}
      <tbody>
        {data.map((item, index) =>
          Object.entries(item)
            .filter(([key]) => key !== "importer") // Excluir "importer" de las filas
            .map(([key, value], subIndex) => (
              <tr key={`${index}-${subIndex}`}>
                <td className={styles.label}>{translations[key] || key}</td>
                <td>{value}</td>
              </tr>
            ))
        )}
      </tbody>
    </table>
  );
}

// Definición de PropTypes
Table.propTypes = {
  data: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
};
