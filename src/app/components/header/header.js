import styles from "./header.module.scss";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <Image src="/images/nextjs.svg" width={40} height={40} priority />
      <h1>Next.js</h1>
    </header>
  );
}
