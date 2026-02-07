interface NotFoundMessageProps {
  onTryAgain: () => void;
}

const NotFoundMessage = ({ onTryAgain }: NotFoundMessageProps) => {
  return (
    <div className="animate-fade-in-up text-center">
      <div className="silver-border rounded-xl bg-card p-8">
        <p className="mb-2 text-2xl">🔍</p>
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
          Email Not Found
        </h3>
        <p className="mb-6 text-sm text-muted-foreground">
          We couldn't find a creator account linked to this email. Please double-check and try again.
        </p>
        <button
          onClick={onTryAgain}
          className="text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Try another email
        </button>
      </div>
    </div>
  );
};

export default NotFoundMessage;
