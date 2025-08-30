export default function Loader() {
  // Simulate skeleton cards
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4"
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="animate-pulse bg-gray-200 rounded-lg h-40"
        />
      ))}
      <span className="sr-only">Loading recipes…</span>
    </div>
  );
}
