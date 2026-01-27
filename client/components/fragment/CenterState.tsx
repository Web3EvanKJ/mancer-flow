export function CenterState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6 shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-lg max-w-md">{description}</p>
    </div>
  );
}
