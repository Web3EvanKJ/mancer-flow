export function StreamDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-white animate-pulse">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        <div className="h-10 w-64 bg-gray-200 rounded-xl" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-gray-200" />
          ))}
        </div>

        <div className="h-56 rounded-3xl bg-gray-200" />
        <div className="h-72 rounded-3xl bg-gray-200" />
      </div>
    </div>
  );
}
