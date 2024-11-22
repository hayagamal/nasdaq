export function SplashScreen() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <img
          src="/images/logo_with_title.svg"
          alt="logo"
          width={400}
          height={120}
          style={{ alignSelf: "center" }}
        />
      </div>
      <h1 style={{ marginBottom: "20px" }}>Haya Gamal</h1>
    </div>
  );
}
