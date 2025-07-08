import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import FTNDAssessmentForm from "@/components/ftnd/FTNDAssessmentForm";
import { useFTND } from "@/contexts/FTNDContext";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { type HealthListItem } from "@/types/models/health";
import ReusablePagination from "@/components/ReusablePagination";

interface PaginationResponse {
  content: HealthListItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export default function HealthReportsTab() {
  const { showFTNDAssessment, setShowFTNDAssessment } = useFTND();
  const apiWithInterceptor = useApi();

  const [healthReports, setHealthReports] = useState<HealthListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    const fetchHealthReports = async () => {
      setIsLoading(true);
      try {
        const response = await apiWithInterceptor.get("/v1/healths/my-page", {
          params: {
            page: currentPage,
            size: pageSize,
            sortBy: "createdAt",
            direction: "DESC",
          },
        });
        const data: PaginationResponse = response.data.result;
        const newHealthReports = Array.isArray(data.content)
          ? data.content
          : [];
        setHealthReports(newHealthReports);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      } catch (error) {
        console.error("Failed to fetch health reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealthReports();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getFTNDLevelColor = (level: number) => {
    if (level <= 2) return "bg-green-100 text-green-800";
    if (level <= 4) return "bg-yellow-100 text-yellow-800";
    if (level <= 6) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Health Reports History</CardTitle>
            <CardDescription>
              Your daily health tracking records ({totalElements} total)
            </CardDescription>
          </div>
          <Button onClick={() => setShowFTNDAssessment(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Report
          </Button>
          <FTNDAssessmentForm
            open={showFTNDAssessment}
            onOpenChange={setShowFTNDAssessment}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="mx-auto w-8 h-8 bg-muted rounded-full flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            </div>
            <p className="text-muted-foreground">Loading health reports...</p>
          </div>
        ) : healthReports.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No Health Reports</h3>
            <p className="text-muted-foreground mb-4">
              You haven't created any health reports yet. Start tracking your
              progress by adding your first report.
            </p>
            <Button onClick={() => setShowFTNDAssessment(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Report
            </Button>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Cigarettes/Day</TableHead>
                  <TableHead>Cigarettes/Pack</TableHead>
                  <TableHead>Pack Price</TableHead>
                  <TableHead>FTND Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {healthReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      {new Date(report.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {report.cigarettesPerDay}
                    </TableCell>
                    <TableCell>{report.cigarettesPerPack}</TableCell>
                    <TableCell>
                      {report.packPrice?.toLocaleString()} {report.currency}
                    </TableCell>
                    <TableCell>
                      <Badge className={getFTNDLevelColor(report.ftndLevel)}>
                        Level {report.ftndLevel}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

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
