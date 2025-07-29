import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, isToday } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Calendar, Cigarette, Edit, Plus, FileText } from "lucide-react";

interface TodayRecordProps {
  loading: boolean;
  todayRecord:
    | {
        cigarettesSmoked: number;
        note?: string;
      }
    | undefined;
  selectedDate: Date;
  handleDateSelect: (date: Date) => void;
}

export function TodayRecord({
  loading,
  todayRecord,
  selectedDate,
  handleDateSelect,
}: TodayRecordProps) {
  const isSelectedDateToday = isToday(selectedDate);
  const selectedDateFormatted = format(selectedDate, "dd/MM/yyyy");

  // const getCigaretteStatusColor = (count: number) => {
  //   if (count === 0) return "bg-green-100 text-green-800 border-green-200";
  //   if (count <= 5) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  //   if (count <= 10) return "bg-orange-100 text-orange-800 border-orange-200";
  //   return "bg-red-100 text-red-800 border-red-200";
  // };

  const getCigaretteNumberColor = (count: number) => {
    if (count === 0) return "text-green-600";
    if (count <= 5) return "text-yellow-600";
    if (count <= 10) return "text-orange-600";
    return "text-red-600";
  };

  const getCigaretteStatusBadge = (count: number) => {
    if (count === 0)
      return {
        text: "Rất tốt!",
        variant: "default",
        className: "bg-green-100 text-green-800 hover:bg-green-100",
      };
    if (count <= 5)
      return {
        text: "Cố gắng tốt",
        variant: "secondary",
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      };
    if (count <= 10)
      return {
        text: "Hãy cố gắng",
        variant: "secondary",
        className: "bg-orange-100 text-orange-800 hover:bg-orange-100",
      };
    return {
      text: "Cần cải thiện",
      variant: "destructive",
      className: "bg-red-100 text-red-800 hover:bg-red-100",
    };
  };

  return (
    <Card className="flex-1 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span
              className={
                isSelectedDateToday ? "text-blue-600" : "text-gray-700"
              }
            >
              {isSelectedDateToday
                ? "Bản ghi hôm nay"
                : `Bản ghi ngày ${selectedDateFormatted}`}
            </span>
          </div>
          {!isSelectedDateToday && (
            <Badge variant="secondary" className="text-xs">
              Chỉ đọc
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {isSelectedDateToday
            ? "Theo dõi thói quen hút thuốc hàng ngày"
            : "Xem bản ghi hút thuốc cho ngày này"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
            <p className="text-sm text-gray-500 mt-2">Loading...</p>
          </div>
        ) : todayRecord ? (
          <div className="space-y-6">
            {/* Cigarette Count Display */}
            <div className="flex justify-between bg-white rounded-lg p-4 border shadow-sm">
              <div className="flex flex-col gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Cigarette className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Số điếu đã hút
                  </span>
                </div>
                <Badge
                  variant={
                    getCigaretteStatusBadge(todayRecord.cigarettesSmoked)
                      .variant as any
                  }
                  className={`text-xs ${
                    getCigaretteStatusBadge(todayRecord.cigarettesSmoked)
                      .className
                  }`}
                >
                  {getCigaretteStatusBadge(todayRecord.cigarettesSmoked).text}
                </Badge>
              </div>
              <div
                className={`text-center mt-3 mr-6 text-4xl font-bold ${getCigaretteNumberColor(
                  todayRecord.cigarettesSmoked
                )}`}
              >
                {todayRecord.cigarettesSmoked}
              </div>
            </div>

            {/* Note Display */}
            {todayRecord.note && (
              <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Ghi chú
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {todayRecord.note}
                </p>
              </div>
            )}

            {/* Action Button */}
            {isSelectedDateToday ? (
              <Button
                onClick={() => handleDateSelect(selectedDate)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                size="lg"
              >
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa bản ghi hôm nay
              </Button>
            ) : (
              <div className="text-center py-4 bg-gray-50 rounded-lg border">
                <p className="text-sm text-gray-500">
                  Chỉ có thể chỉnh sửa bản ghi hôm nay
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Cigarette className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isSelectedDateToday
                ? "Chưa có bản ghi"
                : "Không tìm thấy bản ghi"}
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              {isSelectedDateToday
                ? "Bắt đầu theo dõi thói quen hút thuốc hôm nay"
                : `Không có bản ghi hút thuốc cho ngày ${selectedDateFormatted}`}
            </p>
            {isSelectedDateToday ? (
              <Button
                onClick={() => handleDateSelect(selectedDate)}
                className="bg-green-600 hover:bg-green-700 text-white shadow-md"
                size="lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm bản ghi hôm nay
              </Button>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 border">
                <p className="text-sm text-gray-500">
                  Chỉ có thể thêm hoặc chỉnh sửa bản ghi hôm nay
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TodayRecord;
