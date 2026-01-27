export function statusNumToString(statusNum: number) {
  if (statusNum === 0 || statusNum === 1) return "Active";
  if (statusNum === 2 || statusNum === 3) return "Paused";
  else return "Voided";
}
