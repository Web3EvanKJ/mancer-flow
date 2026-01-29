export function StreamStatusBadge({ status }: { status: number }) {
  if (status === 0 || status === 1) {
    return (
      <div className="px-4 py-2 rounded-xl bg-green-500 text-white font-semibold flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        Active
      </div>
    );
  }

  if (status === 2 || status === 3) {
    return (
      <div className="px-4 py-2 rounded-xl bg-yellow-400 text-white font-semibold flex items-center">
        Paused
      </div>
    );
  }

  return (
    <div className="px-4 py-2 rounded-xl bg-gray-400 text-white font-semibold flex items-center">
      Voided
    </div>
  );
}
