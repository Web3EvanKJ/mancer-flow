export function RoleOption({
  label,
  description,
  icon,
  active,
  onClick,
}: {
  label: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
        active
          ? "border-[#F9140D] bg-gradient-to-br from-red-50 to-red-100/50 shadow-lg shadow-red-500/20"
          : "border-gray-200 bg-white hover:border-[#F9140D]/50 hover:bg-red-50/50 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 transition-all duration-300 ${
          active
            ? "bg-gradient-to-br from-[#F9140D] to-red-600 text-white shadow-lg shadow-red-500/30"
            : "bg-gray-100 text-gray-400 group-hover:bg-red-100 group-hover:text-[#F9140D]"
        }`}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="space-y-1">
        <div
          className={`font-bold text-base ${active ? "text-[#F9140D]" : "text-gray-800"}`}
        >
          {label}
        </div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>

      {/* Active indicator */}
      {active && (
        <div className="absolute top-3 right-3">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F9140D] to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
}
