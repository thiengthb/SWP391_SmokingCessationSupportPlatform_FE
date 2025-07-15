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
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import {
  TransactionStatus,
  type BillingTransaction,
} from "@/types/models/transaction";
import { useTranslate } from "@/hooks/useTranslate";

interface PaginationResponse {
  content: BillingTransaction[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export default function BillingHistory() {
  const { tProfile } = useTranslate();
  const apiWithInterceptor = useApi();
  const [billingHistory, setBillingHistory] = useState<BillingTransaction[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    const fetchBillingHistory = async () => {
      setIsLoading(true);
      try {
        const response = await apiWithInterceptor.get(
          "/v1/transactions/my-transactions",
          {
            params: {
              page: currentPage,
              size: pageSize,
            },
          }
        );
        const data: PaginationResponse = response.data.result;
        console.log("Billing history data:", data);
        setBillingHistory(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      } catch (error) {
        console.error("Failed to fetch billing history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBillingHistory();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tProfile("profile.billing.title")}</CardTitle>
        <CardDescription>
          {tProfile("profile.billing.description", { total: totalElements })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="mx-auto w-8 h-8 bg-muted rounded-full flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            </div>
            <p className="text-muted-foreground">
              {tProfile("profile.billing.loading")}
            </p>
          </div>
        ) : billingHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              {tProfile("profile.billing.empty.title")}
            </h3>
            <p className="text-muted-foreground mb-4">
              {tProfile("profile.billing.empty.description")}
            </p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{tProfile("profile.billing.table.invoice")}</TableHead>
                  <TableHead>{tProfile("profile.billing.table.date")}</TableHead>
                  <TableHead>{tProfile("profile.billing.table.amount")}</TableHead>
                  <TableHead>{tProfile("profile.billing.table.currency")}</TableHead>
                  <TableHead>{tProfile("profile.billing.table.status")}</TableHead>
                  <TableHead>{tProfile("profile.billing.table.method")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingHistory.map((invoice) => (
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
              currentPage={currentPage}
              totalPages={totalPages}
              totalElements={totalElements}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              className="mt-4"
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
