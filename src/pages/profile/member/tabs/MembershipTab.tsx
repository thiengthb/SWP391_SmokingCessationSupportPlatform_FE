import BillingHistory from "../components/BillingHistory";
import CurrentMembership from "../components/CurrentMembership";

export default function MembershipTab() {
  return (
    <div className="space-y-6">
      <CurrentMembership />
      <BillingHistory />
    </div>
  );
}
