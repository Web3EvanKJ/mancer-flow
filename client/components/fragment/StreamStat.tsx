import { Card, CardContent } from "../ui/card";

export function StreamStat({
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
    <Card className="group bg-white border-2 border-gray-100 hover:border-[#F9140D]/30 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300">
      <CardContent className="px-6 py-2">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {label}
          </div>
          <div
            className={`${highlight ? "text-[#F9140D]" : "text-gray-400"} group-hover:scale-110 transition-transform duration-300`}
          >
            {icon}
          </div>
        </div>
        <div
          className={`text-2xl font-bold ${
            highlight
              ? "bg-gradient-to-r from-[#F9140D] to-red-600 bg-clip-text text-transparent"
              : "text-gray-800"
          }`}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
