"use client";

import { Formik } from "formik";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeftRight,
  ArrowRight,
  Banknote,
  CircleDollarSign,
  InfoIcon,
  User,
} from "lucide-react";
import { useCreateAndDepositStream } from "@/hooks/useCreateAndDepositStream";
import { Address } from "viem";
import { CreateStreamSchema } from "@/utils/formik";
import { useRouter } from "next/navigation";

const token = "0xc6800342F5C0895dd4419b99Bf758b2136F1CAfe";

export default function EmployerCreateStreamPage() {
  const router = useRouter();
  const { createAndDeposit, isPending } = useCreateAndDepositStream();

  return (
    <Formik
      initialValues={{
        recipient: "",
        ratePerMonth: "",
        initialDeposit: "",
        transferable: false,
      }}
      validationSchema={CreateStreamSchema}
      onSubmit={async (values, { resetForm }) => {
        await createAndDeposit({
          recipient: values.recipient as Address,
          token: token as Address,
          monthlyRate: values.ratePerMonth,
          depositAmount: values.initialDeposit,
          transferable: values.transferable,
        });

        resetForm();

        router.push("/employer/streams");
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-white">
            <div className="mx-auto max-w-3xl px-6 py-10">
              {/* Header */}
              <div className="mb-8 space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F9140D] to-red-600 bg-clip-text text-transparent">
                  Create Salary Stream
                </h1>
                <p className="text-gray-500 text-lg">
                  Set up a real-time salary stream for a contributor
                </p>
              </div>

              <Card className="bg-white border-2 border-gray-100 rounded-3xl shadow-xl shadow-red-500/5">
                <CardContent className="px-8 space-y-5">
                  {/* Recipient */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                      <User className="text-[#F9140D] w-5" />
                      Recipient Address
                    </label>
                    <Input
                      name="recipient"
                      value={values.recipient}
                      onChange={handleChange}
                      placeholder="0x..."
                      className="h-14 px-5 font-mono"
                    />
                    {touched.recipient && errors.recipient && (
                      <p className="text-sm text-red-600">{errors.recipient}</p>
                    )}
                  </div>
                  {/* Token */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#F9140D]/10 flex items-center justify-center">
                        <span className="text-[#F9140D] text-xl font-bold">
                          Ⓟ
                        </span>
                      </div>
                      Token Address
                    </label>
                    <div className="relative">
                      <Input
                        value={token}
                        disabled
                        className="h-14 px-5 text-base border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-red-50/30 font-mono text-gray-600"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <span className="px-3 py-1 bg-[#F9140D]/10 text-[#F9140D] text-xs font-semibold rounded-full">
                          PHII
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
                      <InfoIcon className="w-3.5" /> Defaulting to PHII token
                    </p>
                  </div>
                  {/* Rate */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                      <CircleDollarSign className="text-[#F9140D] w-5" />
                      Salary Rate (per month)
                    </label>
                    <Input
                      name="ratePerMonth"
                      value={values.ratePerMonth}
                      onChange={handleChange}
                      placeholder="e.g. 1000"
                      className="h-14 px-5 font-mono"
                    />
                    {touched.ratePerMonth && errors.ratePerMonth && (
                      <p className="text-sm text-red-600">
                        {errors.ratePerMonth}
                      </p>
                    )}
                  </div>
                  {/* Initial Deposit */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                      <Banknote className="text-[#F9140D] w-5" />
                      Initial Deposit
                    </label>
                    <Input
                      name="initialDeposit"
                      value={values.initialDeposit}
                      onChange={handleChange}
                      placeholder="e.g. 3000"
                      className="h-14 px-5 font-mono"
                    />
                    {touched.initialDeposit && errors.initialDeposit && (
                      <p className="text-sm text-red-600">
                        {errors.initialDeposit}
                      </p>
                    )}
                  </div>
                  {/* Transferable */}
                  <div className="rounded-2xl border p-6 flex justify-between">
                    <div>
                      <label className="font-semibold flex items-center gap-2">
                        <ArrowLeftRight className="text-[#F9140D] w-5" />
                        Transferable Stream
                      </label>
                      <p className="text-sm text-gray-500">
                        Allow recipient to transfer the stream NFT
                      </p>
                    </div>
                    <Switch
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#F9140D] data-[state=checked]:to-red-600 data-[state=unchecked]:bg-gray-300 scale-110"
                      checked={values.transferable}
                      onCheckedChange={(v) => setFieldValue("transferable", v)}
                    />
                  </div>
                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-red-600 hover:bg-red-500 text-white p-4 rounded-xl font-bold disabled:opacity-50"
                  >
                    {isPending ? (
                      "Creating Stream..."
                    ) : (
                      <div className="flex items-center justify-center">
                        Create & Deposit Stream <ArrowRight />
                      </div>
                    )}
                  </button>
                  {/* Info */}
                  <div className="pt-4 border-t">
                    <div className="flex gap-3 p-4 bg-blue-50 rounded-xl">
                      <InfoIcon className="text-blue-700 w-5" />
                      <p className="text-sm text-blue-700">
                        Make sure you have enough PHII and EDU for gas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
