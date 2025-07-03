import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CalendarCheck, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import type { MemberProfile } from "@/types/models/member";

interface MembershipTabProps {
  profile: MemberProfile;
}

export default function MembershipTab({ profile }: MembershipTabProps) {
  // Mock billing history
  const billingHistory = [
    {
      id: "INV-001",
      date: "2023-12-01",
      amount: "$99.99",
      status: "paid",
      paymentMethod: "Credit Card",
    },
    {
      id: "INV-002",
      date: "2023-11-01",
      amount: "$99.99",
      status: "paid",
      paymentMethod: "Credit Card",
    },
    {
      id: "INV-003",
      date: "2023-10-01",
      amount: "$99.99",
      status: "paid",
      paymentMethod: "Credit Card",
    },
  ];

  // Calculate days remaining in membership
  const calculateDaysRemaining = () => {
    if (!profile.membershipDetails) return 0;

    const endDate = new Date(profile.membershipDetails.endDate);
    const currentDate = new Date();
    const timeDiff = endDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return Math.max(0, daysRemaining);
  };

  const daysRemaining = calculateDaysRemaining();
  const totalDays = 365; // Assuming annual plan
  const progressPercentage = (daysRemaining / totalDays) * 100;

  const membershipDetails = profile.membershipDetails;
  if (!membershipDetails) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <p>No membership information available.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Current Membership</CardTitle>
              <CardDescription>
                Details about your active subscription
              </CardDescription>
            </div>
            <Badge
              className={
                membershipDetails.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }
            >
              {membershipDetails.status === "active" ? "Active" : "Expired"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Plan</p>
              <p className="font-semibold text-lg">{membershipDetails.plan}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="font-medium">
                {new Date(membershipDetails.startDate).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">End Date</p>
              <p className="font-medium">
                {new Date(membershipDetails.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{daysRemaining} days remaining</span>
              <span>{membershipDetails.endDate}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <span>Payment Method: {membershipDetails.paymentMethod}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-muted-foreground" />
                <span>
                  Auto Renew:{" "}
                  {membershipDetails.autoRenew ? (
                    <Check className="h-4 w-4 text-green-500 inline" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 inline" />
                  )}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Change Plan</Button>
          <Button>
            {membershipDetails.autoRenew
              ? "Disable Auto Renew"
              : "Enable Auto Renew"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>
                    {new Date(invoice.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === "paid" ? "default" : "destructive"
                      }
                      className="capitalize"
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
