import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";

export function HeroSection() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [triedClick, setTriedClick] = useState(false);

  function launchApp() {
    if (!isConnected) {
      setTriedClick(true);
      return;
    }
    router.push("/role");
  }

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50/30 to-white" />

      <div className="relative mx-auto max-w-7xl px-6 py-5 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Stream Salaries.
          </span>
          <span className="block mt-2 bg-gradient-to-r from-[#F9140D] via-red-600 to-red-700 bg-clip-text text-transparent">
            On-chain.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-gray-600 leading-relaxed"
        >
          Mancer Flow enables real-time, transparent salary streaming powered by
          smart contracts. Employers fund streams. Employees get paid every
          second.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col justify-center gap-4"
        >
          <button
            onClick={launchApp}
            className="group relative bg-gradient-to-r from-[#F9140D] to-red-600 hover:from-red-600 hover:to-[#F9140D] text-white flex items-center justify-center gap-2 px-8 py-2 rounded-xl font-bold text-lg shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 overflow-hidden  mx-auto"
          >
            <span className="relative z-10 flex items-center gap-2 ">
              Launch App
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>

          {triedClick && !isConnected && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500 font-medium"
            >
              Please connect your wallet using the button on the top right.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
