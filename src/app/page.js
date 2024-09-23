import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>Hellow </li>
          <li>Its me, hellow from the other side</li>
          <li>Candela</li>
        </ol>
      </main>
    </div>
  );
}
