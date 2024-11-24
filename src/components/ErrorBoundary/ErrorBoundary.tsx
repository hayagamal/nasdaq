type ErrorBoundaryProps = {
  error: Error;
  children: any;
};
export function ErrorBoundary({ error, children }: ErrorBoundaryProps) {
  return error ? (
    <div className="full-page">
      <span>{error?.message}</span>
    </div>
  ) : (
    <>{children}</>
  );
}
