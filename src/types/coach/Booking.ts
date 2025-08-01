export interface Booking {
  id: string;
  memberId: string;
  memberName?: string;
  coachId: string;
  meetLink: string;
  startedAt: string;
  endedAt: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  declineReason: string | null;
}