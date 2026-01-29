import {
  CheckCircle2,
  ArrowUpFromLine,
  ArrowDownToLine,
  Pause,
  Play,
  Settings,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { formatToken } from "./formatToken";

export function getEventIcon(type: string) {
  switch (type) {
    case "CREATE":
      return (
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
        </div>
      );

    case "DEPOSIT":
      return (
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <ArrowUpFromLine className="w-5 h-5 text-green-600" />
        </div>
      );

    case "WITHDRAW":
      return (
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
          <ArrowDownToLine className="w-5 h-5 text-orange-600" />
        </div>
      );

    case "REFUND":
      return (
        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
          <RotateCcw className="w-5 h-5 text-yellow-600" />
        </div>
      );

    case "PAUSE":
      return (
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <Pause className="w-5 h-5 text-gray-700" />
        </div>
      );

    case "RESTART":
      return (
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
          <Play className="w-5 h-5 text-emerald-600" />
        </div>
      );

    case "ADJUST_RATE":
      return (
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <Settings className="w-5 h-5 text-purple-600" />
        </div>
      );

    case "VOID":
      return (
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <Trash2 className="w-5 h-5 text-red-600" />
        </div>
      );

    default:
      return null;
  }
}

export function getEventDetail(e: any) {
  switch (e.type) {
    case "CREATE":
      return "Stream created";

    case "DEPOSIT":
      return `Deposited ${formatToken(e.amount)} PHII`;

    case "WITHDRAW":
      return `Recipient withdrew ${formatToken(e.amount)} PHII`;

    case "REFUND":
      return `Sender refunded ${formatToken(e.amount)} PHII`;

    case "PAUSE":
      return "Stream paused";

    case "RESTART":
      return `Stream restarted with new rate`;

    case "ADJUST_RATE":
      return `Rate changed from ${formatToken(e.oldRate)} → ${formatToken(
        e.newRate,
      )} PHII/sec`;

    case "VOID":
      return "Stream voided permanently";

    default:
      return "Activity";
  }
}
