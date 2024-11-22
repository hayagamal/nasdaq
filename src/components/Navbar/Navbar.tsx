import { SearchBar } from "../SearchBar/SearchBar";
import styles from "./Navbar.module.css";

type NavbarProps = {
  setSearchTerm: (value: string) => void;
};
export function Navbar({ setSearchTerm }: NavbarProps) {
  return (
    <nav className={styles["navbar"]}>
      <img
        src={"/images/logo.svg"}
        alt={"logo"}
        width={60}
        height={45}
        className={styles["logo"]}
      />
      <div className={styles.searchContainer}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
    </nav>
  );
}
