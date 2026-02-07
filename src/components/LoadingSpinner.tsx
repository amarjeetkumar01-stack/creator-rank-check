const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-8 animate-fade-in-up">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-muted" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
      </div>
      <p className="text-sm text-muted-foreground">Searching for your rank…</p>
    </div>
  );
};

export default LoadingSpinner;
