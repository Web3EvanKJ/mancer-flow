"use client";

import { useParams } from "next/navigation";
import { useStreamData } from "@/hooks/useStreamData";
import { useWithdrawable } from "@/hooks/useWithdrawable";
import { useRefundable } from "@/hooks/useRefundable";
import { useDepletionTime } from "@/hooks/useDepletionTime";
import { useRecipient } from "@/hooks/useRecipient";
import { useStatus } from "@/hooks/useStatus";
import { useProtocolFee } from "@/hooks/useProtocolFee";
import { StreamDetailSkeleton } from "@/components/fragment/StreamDetailSkeleton";
import { useState } from "react";
import { StreamActionModal } from "@/components/fragment/StreamActionModal";
import { useStreamActions } from "@/hooks/useStreamAction";
import { useActivityStream } from "@/hooks/useActivityStream";
import { StreamStatusBadge } from "@/components/fragment/StreamStatusBadge";
import { StreamActionsSection } from "@/components/layout/StreamActionsSection";
import { StreamStatsSection } from "@/components/layout/StreamStatsSection";
import { StreamActivitySection } from "@/components/layout/StreamActivitySection";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";

export default function EmployerStreamDetailPage() {
  const params = useParams();
  const streamId = params.id;
  const PAGE_SIZE = 10;
  let disabled;

  type ActionType = "deposit" | "restart" | "adjust" | "refund" | null;

  const [action, setAction] = useState<ActionType>(null);
  const { address } = useAccount();

  const [page, setPage] = useState(0); // 0 = first page
  const offset = page * PAGE_SIZE;

  const { pauseStream, refundMaxStream, voidStream, isPending } =
    useStreamActions();

  const { data: activityStream, loading: activityLoading } = useActivityStream(
    Number(streamId),
    PAGE_SIZE,
    offset,
  );

  const { data: stream, isLoading: dataLoading } = useStreamData(
    BigInt(Number(streamId)),
  );

  const { withdrawable, isLoading: withdrawableLoading } = useWithdrawable(
    BigInt(Number(streamId)),
  );
  const { refundable, isLoading: refundableLoading } = useRefundable(
    BigInt(Number(streamId)),
  );
  const { depletionTime, isLoading: depletionTimeLoading } = useDepletionTime(
    BigInt(Number(streamId)),
  );
  const { recipient, isLoading: recipientLoading } = useRecipient(
    BigInt(Number(streamId)),
  );
  const { status, isLoading: statusLoading } = useStatus(
    BigInt(Number(streamId)),
  );
  const { protocolFee, isLoading: protocolFeeLoading } = useProtocolFee(
    "0xc6800342F5C0895dd4419b99Bf758b2136F1CAfe",
  );

  const isLoading =
    dataLoading ||
    withdrawableLoading ||
    refundableLoading ||
    depletionTimeLoading ||
    recipientLoading ||
    statusLoading ||
    protocolFeeLoading ||
    activityLoading;

  if (isLoading || !stream) {
    return <StreamDetailSkeleton />;
  }

  const isOwner =
    address &&
    stream?.sender &&
    address.toLowerCase() === stream.sender.toLowerCase();

  if (!isLoading && stream && !isOwner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-red-50/20 to-white">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
          <p className="text-gray-600">You are not the owner of this stream.</p>
          <p className="text-sm text-gray-400 font-mono">
            Connected wallet: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>
      </div>
    );
  }

  const activityTimeline = activityStream?.streamEvents?.items;
  const pageInfo = activityStream?.streamEvents?.pageInfo;
  const totalCount = activityStream?.streamEvents?.totalCount ?? 0;
  if (!statusLoading) {
    disabled = Number(status) === 4;
  }

  const refundableFormatted = Number(formatUnits(refundable!, 18));
  const isZeroRefundable = refundableFormatted <= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50/20 to-white">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F9140D] to-red-600 bg-clip-text text-transparent">
              Stream #{streamId}
            </h1>
            <p className="text-gray-500 text-lg font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-[#F9140D] rounded-full"></span>
              Recipient:{" "}
              {recipient
                ? `${recipient.slice(0, 5)}...${recipient.slice(-4)}`
                : "—"}
            </p>
          </div>
          <StreamStatusBadge status={Number(status)} />
        </div>

        <StreamStatsSection
          stream={stream}
          withdrawable={withdrawable!}
          refundable={refundable!}
          depletionTime={depletionTime!}
          protocolFee={protocolFee}
        />

        <StreamActionsSection
          streamId={BigInt(Number(streamId))}
          disabled={disabled}
          isPending={isPending}
          setAction={setAction}
          pauseStream={pauseStream}
          refundMaxStream={refundMaxStream}
          voidStream={voidStream}
          isZeroRefundable={isZeroRefundable}
          status={status}
        />

        <StreamActivitySection
          activityTimeline={activityTimeline}
          page={page}
          setPage={setPage}
          pageInfo={pageInfo}
          totalCount={totalCount}
          PAGE_SIZE={PAGE_SIZE}
        />

        {action && (
          <StreamActionModal
            type={action}
            streamId={BigInt(Number(streamId))}
            recipient={recipient! as `0x${string}`}
            onClose={() => setAction(null)}
          />
        )}
      </div>
    </div>
  );
}
