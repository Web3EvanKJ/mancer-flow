export function StreamAction({
  label,
  destructive,
  icon,
  onClick,
  isPending,
}: {
  label: string;
  destructive?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  isPending?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2 h-14 rounded-xl border-2 font-semibold transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-50 disabled:cursor-no-drop ${
        destructive
          ? "border-red-200 text-red-600 hover:bg-red-500 hover:text-white"
          : "border-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-[#F9140D] hover:to-red-600 hover:text-white"
      }`}
      disabled={isPending}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
    </button>
  );
}
