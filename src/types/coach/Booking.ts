export interface Booking {
  id: string;
  memberId: string;
  memberName?: string;
  coachId: string;
  coachFullName?: string; 
  meetLink: string;
  startedAt: string;
  endedAt: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  declineReason: string | null;
}