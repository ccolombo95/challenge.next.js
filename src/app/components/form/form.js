import { useState } from "react";
import styles from "./form.module.scss";

export default function Form({ onSubmit, onCodeChange }) {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que el código tenga exactamente 9 caracteres numéricos
    const isValid = /^\d{9}$/.test(codigo);
    setError(isValid ? "" : "Incorrecto. Ingrese el código de 9 números");

    if (isValid) {
      onSubmit(codigo);
    } else {
      onCodeChange();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (/^\d{0,9}$/.test(value)) {
      setCodigo(value);
      setError("");
      onCodeChange();
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <input
          type="text"
          id="codigo"
          name="codigo"
          className={styles.formInput}
          value={codigo}
          onChange={handleChange}
          placeholder=" "
          maxLength="9"
        />
        <label htmlFor="codigo" className={styles.formLabel}>
          Código
        </label>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <button type="submit" className={styles.formButton}>
        Buscar
      </button>
    </form>
  );
}
