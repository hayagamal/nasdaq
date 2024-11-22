import { Stock } from "../../utils/commons";
import styles from "./Card.module.css";

type CardProps = {
  stock: Stock;
};
function Card({ stock }: CardProps) {
  return (
    <div className={styles["card"]}>
      <label title={stock?.name}>
        <span>Name:</span> {stock?.name}
      </label>
      <label title={stock?.ticker}>
        <span>Ticket:</span> {stock?.ticker}
      </label>
    </div>
  );
}

export default Card;
