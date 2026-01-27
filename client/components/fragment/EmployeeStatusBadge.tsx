import { statusNumToString } from "@/lib/status";

export function EmployeeStatusBadge({ status }: { status: number }) {
  const styles: Record<number, { bg: string; text: string; dot: boolean }> = {
    0: {
      bg: "bg-gradient-to-r from-green-500 to-emerald-500",
      text: "text-white",
      dot: true,
    },
    1: {
      bg: "bg-gradient-to-r from-green-500 to-emerald-500",
      text: "text-white",
      dot: true,
    },
    2: {
      bg: "bg-yellow-400 ",
      text: "text-white",
      dot: false,
    },
    3: {
      bg: "bg-yellow-400 ",
      text: "text-white",
      dot: false,
    },
    4: {
      bg: "bg-gray-400 ",
      text: "text-white",
      dot: false,
    },
  };

  const style = styles[status] || {
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: false,
  };

  return (
    <div
      className={`px-4 py-2 rounded-xl ${style.bg} ${style.text} font-semibold shadow-lg flex items-center gap-2`}
    >
      {style.dot && (
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
      )}
      {statusNumToString(status)}
    </div>
  );
}
