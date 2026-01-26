export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Create Stream",
      description: "Employer creates a salary stream and deposits tokens.",
    },
    {
      step: "02",
      title: "Stream Accrues",
      description: "Salary accrues every second based on the defined rate.",
    },
    {
      step: "03",
      title: "Withdraw Anytime",
      description: "Employees withdraw available funds instantly.",
    },
  ];

  return (
    <section className="bg-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-3xl font-semibold text-center">How It Works</h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F9140D] text-white font-bold">
                {s.step}
              </div>
              <h3 className="mt-6 text-xl font-medium">{s.title}</h3>
              <p className="mt-2 text-zinc-600 mx-6">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
