export function StreamAction({
  label,
  destructive,
  icon,
}: {
  label: string;
  destructive?: boolean;
  icon?: React.ReactNode;
}) {
  if (destructive) {
    return (
      <button
        className=" px-2 group relative h-14 rounded-xl border-2 border-red-200 bg-white hover:bg-red-500 hover:border-red-500 text-red-600 hover:text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-red-500/30"
        onClick={() => alert(`Mock: ${label}`)}
      >
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
      </button>
    );
  }

  return (
    <button
      className="px-2 group relative h-14 rounded-xl border-2 border-gray-200 bg-white hover:bg-gradient-to-r hover:from-[#F9140D] hover:to-red-600 hover:border-[#F9140D] text-gray-700 hover:text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-red-500/30"
      onClick={() => alert(`Mock: ${label}`)}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
    </button>
  );
}
