import styles from "./header.module.scss";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <Image
        src="/images/nextjs.svg" // Ruta de la imagen (ubicada en la carpeta public)
        alt="Descripción de la imagen"
        width={40}
        height={40}
        priority
      />
      <h1>Next.js</h1>
    </header>
  );
}
