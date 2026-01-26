import { Wallet, Repeat, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";

export function FeaturesSection() {
  const features = [
    {
      icon: Wallet,
      title: "Non-custodial",
      description: "Funds stay on-chain. No middlemen, no custody risk.",
    },
    {
      icon: Repeat,
      title: "Real-time Streaming",
      description: "Salaries accrue per-second and can be withdrawn anytime.",
    },
    {
      icon: Shield,
      title: "Protocol-secured",
      description: "Auditable smart contracts with transparent protocol fees.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="text-3xl font-semibold text-center">Why Mancer Flow</h2>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white border-zinc-200 rounded-2xl shadow-sm hover:shadow-md transition">
              <CardContent className="p-6">
                <f.icon className="h-8 w-8 text-[#F9140D]" />
                <h3 className="mt-4 text-xl font-medium">{f.title}</h3>
                <p className="mt-2 text-zinc-600">{f.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
