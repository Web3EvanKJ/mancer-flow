"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { timeAgo } from "@/utils/time";
import { getEventDetail, getEventIcon } from "@/utils/activityHelper";

export function StreamActivitySection({
  activityTimeline,
  page,
  setPage,
  pageInfo,
  totalCount,
  PAGE_SIZE,
}: any) {
  return (
    <Card className="bg-white border-2 border-gray-100 rounded-3xl shadow-xl shadow-red-500/5">
      <CardContent className="px-8 py-2">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F9140D] to-red-600 flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          Activity Timeline
        </h2>

        <div className="space-y-1">
          {activityTimeline?.map((e: any) => (
            <div
              key={e.id}
              className="group relative flex items-center justify-between p-5 rounded-xl hover:bg-gradient-to-r hover:from-red-50/50 hover:to-transparent transition-all duration-300 border-l-4 border-transparent hover:border-[#F9140D]"
            >
              <div className="flex items-center gap-4">
                <div>{getEventIcon(e.type)}</div>
                <div>
                  <div className="font-semibold text-gray-800 text-lg">
                    {e.type.replace("_", " ")}
                  </div>
                  <div className="text-sm text-gray-500">
                    {getEventDetail(e)}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400 font-medium px-3 py-1 bg-gray-100 rounded-full">
                {timeAgo(e.timestamp)}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage((p: number) => Math.max(p - 1, 0))}
            disabled={!pageInfo?.hasPreviousPage}
            className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 bg-red-500 text-white"
          >
            ← Previous
          </button>

          <div className="text-sm text-gray-500">
            Page {page + 1} of {Math.ceil(totalCount / PAGE_SIZE)}
          </div>

          <button
            onClick={() => setPage((p: number) => p + 1)}
            disabled={!pageInfo?.hasNextPage}
            className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 bg-red-500 text-white"
          >
            Next →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
