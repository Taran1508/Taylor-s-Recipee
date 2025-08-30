interface EmptyStateProps {
  message: string;
  onRetry?: () => void;
}

export default function EmptyState({ message, onRetry }: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-8 text-center"
    >
      <p className="text-lg font-semibold mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
