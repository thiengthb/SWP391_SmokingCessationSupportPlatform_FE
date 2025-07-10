import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReusablePagination from "@/components/ReusablePagination";
import { useTransactionListSwr } from "@/hooks/swr/useTransactionSwr";
import { TransactionStatus } from "@/types/enums/TransactionStatus";
import { useAuth } from "@/contexts/AuthContext";

export default function BillingHistory() {
  const { auth } = useAuth();
  const { transactions, pagination, setPaginationParams, isLoading } =
    useTransactionListSwr(auth.currentAcc?.id || "");

  const handlePageChange = (page: number) => {
    setPaginationParams((prev) => ({
      ...prev,
      page: page,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>
          Your recent payments and invoices ({pagination.totalElements} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="mx-auto w-8 h-8 bg-muted rounded-full flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            </div>
            <p className="text-muted-foreground">Loading billing history...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No Billing History</h3>
            <p className="text-muted-foreground mb-4">
              You don't have any billing history yet. Your invoices will appear
              here after your first payment.
            </p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {invoice.amount}
                    </TableCell>
                    <TableCell className="font-medium">
                      {invoice.currency}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          invoice.status === TransactionStatus.COMPLETED
                            ? "default"
                            : "destructive"
                        }
                        className="capitalize"
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {invoice.method}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Reusable Pagination Component */}
            <ReusablePagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              totalElements={pagination.totalElements}
              pageSize={pagination.size}
              onPageChange={handlePageChange}
              className="mt-4"
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
