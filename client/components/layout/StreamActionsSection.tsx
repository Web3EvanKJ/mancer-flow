"use client";

import { Card, CardContent } from "@/components/ui/card";
import { StreamAction } from "@/components/fragment/StreamAction";
import {
  Plus,
  Pause,
  Play,
  Settings,
  RotateCcw,
  Trash2,
  ArrowDownToLine,
} from "lucide-react";

export function StreamActionsSection({
  streamId,
  disabled,
  isPending,
  setAction,
  pauseStream,
  refundMaxStream,
  voidStream,
}: any) {
  return (
    <Card className="bg-white border-2 border-gray-100 rounded-3xl shadow-xl shadow-red-500/5">
      <CardContent className="px-8 py-2 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F9140D] to-red-600 flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StreamAction
            label="Deposit"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setAction("deposit")}
            isPending={disabled}
          />
          <StreamAction
            label="Pause"
            icon={<Pause className="w-4 h-4" />}
            onClick={() => pauseStream(streamId)}
            isPending={isPending || disabled}
          />
          <StreamAction
            label="Restart"
            icon={<Play className="w-4 h-4" />}
            onClick={() => setAction("restart")}
            isPending={disabled}
          />
          <StreamAction
            label="Adjust Rate"
            icon={<Settings className="w-4 h-4" />}
            onClick={() => setAction("adjust")}
            isPending={disabled}
          />
          <StreamAction
            label="Refund"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={() => setAction("refund")}
          />
          <StreamAction
            label="Refund Max"
            destructive
            icon={<ArrowDownToLine className="w-4 h-4" />}
            onClick={() => refundMaxStream(streamId)}
            isPending={isPending}
          />
          <StreamAction
            label="Void Stream"
            destructive
            icon={<Trash2 className="w-4 h-4" />}
            onClick={() => voidStream(streamId)}
            isPending={isPending || disabled}
          />
        </div>
      </CardContent>
    </Card>
  );
}
