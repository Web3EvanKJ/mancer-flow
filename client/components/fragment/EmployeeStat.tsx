export function EmployeeStat({
  label,
  value,
  highlight,
  icon,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className={`${highlight ? "text-[#F9140D]" : "text-gray-400"}`}>
          {icon}
        </div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {label}
        </div>
      </div>
      <div
        className={`text-lg font-bold ${
          highlight
            ? "bg-gradient-to-r from-[#F9140D] to-red-600 bg-clip-text text-transparent"
            : "text-gray-800"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
