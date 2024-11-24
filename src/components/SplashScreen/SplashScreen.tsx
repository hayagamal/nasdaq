import styles from "./SplashScreen.module.css";
export function SplashScreen() {
  return (
    <div className="full-page">
      <div className={styles["splashImage"]}>
        <img
          src="/images/logo_with_title.svg"
          alt="logo"
          width={400}
          height={120}
          className={styles["logo"]}
        />
      </div>
      <h1 className={styles["desc"]}>Haya Gamal</h1>
    </div>
  );
}
