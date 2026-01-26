export function EmployeeStatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; dot: boolean }> = {
    Active: {
      bg: "bg-gradient-to-r from-green-500 to-emerald-500",
      text: "text-white",
      dot: true,
    },
    Paused: {
      bg: "bg-yellow-400 ",
      text: "text-white",
      dot: false,
    },
    Voided: {
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
      {status}
    </div>
  );
}
