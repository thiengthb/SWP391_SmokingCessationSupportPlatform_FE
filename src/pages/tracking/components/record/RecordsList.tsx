import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { type SmokingRecord } from "@/types/models/record";
import type { PaginationResponse } from "@/types/pagination";
import { isToday } from "date-fns";

interface RecordsListProps {
  loading: boolean;
  smokingRecords: SmokingRecord[];
  pagination: PaginationResponse<SmokingRecord>;
  handlePageChange: (page: number) => void;
  handleEditRecord: (record: SmokingRecord) => void;
}

export function RecordsList({
  loading,
  smokingRecords,
  pagination,
  handlePageChange,
  handleEditRecord,
}: RecordsListProps) {
  // Render pagination controls
  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    return (
      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.page === 0}
          onClick={() => handlePageChange(pagination.page - 1)}
        >
          Trước
        </Button>
        <span className="flex items-center px-3">
          Trang {pagination.page + 1} / {pagination.totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.page === pagination.totalPages - 1}
          onClick={() => handlePageChange(pagination.page + 1)}
        >
          Tiếp
        </Button>
      </div>
    );
  };

  const isTodayRecord = (recordDate: string) => {
    return isToday(new Date(recordDate));
  };

  return (
    <Card className="shadow-lg md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Bản Ghi Hút Thuốc</CardTitle>
          <CardDescription>Lịch sử bản ghi hút thuốc của bạn</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Đang tải...</div>
        ) : smokingRecords.length > 0 ? (
          <div className="divide-y">
            {smokingRecords.map((record) => (
              <div
                key={record.id}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {format(new Date(record.date), "dd/MM/yyyy")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {record.note ? record.note : "Không có ghi chú"}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`px-3 py-1 rounded-full ${
                      record.cigarettesSmoked === 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {record.cigarettesSmoked} điếu thuốc
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditRecord(record)}
                    disabled={!isTodayRecord(record.date.toString())}
                    className={
                      !isTodayRecord(record.date.toString())
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                  >
                    {isTodayRecord(record.date.toString()) ? "Sửa" : "Xem"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p>Không tìm thấy bản ghi nào</p>
          </div>
        )}
        {renderPagination()}
      </CardContent>
    </Card>
  );
}

export default RecordsList;
