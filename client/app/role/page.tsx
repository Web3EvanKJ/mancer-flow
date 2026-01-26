"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Briefcase, Wallet, ArrowRight } from "lucide-react";
import { RoleOption } from "@/components/fragment/RoleOption";

export default function Role() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [role, setRole] = useState<"employer" | "employee" | null>(null);

  function continueFlow() {
    if (!name || !role) return;

    // Redirect based on role
    router.push(role === "employer" ? "/employer/streams" : "/me");
  }
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/60 via-red-950/40 to-black/60 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-md px-4"
      >
        <Card className="w-full bg-white border-2 border-gray-100 rounded-3xl shadow-2xl shadow-red-500/20">
          <CardContent className="px-8 py-2 space-y-4">
            {/* Header */}
            <div className="text-center space-y-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F9140D] to-red-600 bg-clip-text text-transparent">
                Welcome to Mancer
              </h1>
              <p className="text-gray-500 text-base">
                Let's set up your experience
              </p>
            </div>

            {/* Name input */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Your name
              </label>
              <Input
                placeholder="e.g. Alice"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 px-5 text-base border-2 border-gray-200 rounded-xl focus:border-[#F9140D] focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
              />
            </div>

            {/* Role selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                I am a
              </label>

              <div className="grid grid-cols-2 gap-4">
                <RoleOption
                  label="Employer"
                  description="Pay contributors"
                  icon={<Briefcase className="w-6 h-6" />}
                  active={role === "employer"}
                  onClick={() => setRole("employer")}
                />

                <RoleOption
                  label="Employee"
                  description="Receive salary"
                  icon={<Wallet className="w-6 h-6" />}
                  active={role === "employee"}
                  onClick={() => setRole("employee")}
                />
              </div>
            </div>

            {/* Continue */}
            <button
              className="group relative w-full h-14 bg-gradient-to-r from-[#F9140D] to-red-600 hover:from-red-600 hover:to-[#F9140D] text-white rounded-xl font-bold text-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg overflow-hidden"
              disabled={!name || !role}
              onClick={continueFlow}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Continue
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
