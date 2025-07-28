import { useState, useEffect } from "react";
import { isSameDay, startOfDay } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, RefreshCw, BarChart3 } from "lucide-react";
import TodayRecord from "@/pages/tracking/components/record/TodayRecord";
import RecordCalendar from "@/pages/tracking/components/record/RecordCalendar";
import RecordsList from "@/pages/tracking/components/record/RecordsList";
import RecordDialog from "@/pages/tracking/components/record/RecordDialog";
import type { SmokingRecord } from "@/types/models/record";
import {
  defaultPaginationResponse,
  type PaginationResponse,
} from "@/types/pagination";
import PlanTrackingTab from "./PlanTrackingTab";
import useApi from "@/hooks/useApi";
const RecordHabbitPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<
    PaginationResponse<SmokingRecord>
  >(defaultPaginationResponse);

  const apiWithInterceptor = useApi();

  const [smokingRecords, setSmokingRecords] = useState<SmokingRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showRecordDialog, setShowRecordDialog] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<SmokingRecord | null>(
    null
  );
  const [newCigarettesCount, setNewCigarettesCount] = useState<number>(0);
  const [newNote, setNewNote] = useState<string>("");

  useEffect(() => {
    const fetchSmokingRecords = async () => {
      setLoading(true);
      try {
        const response = await apiWithInterceptor.get(
          `/v1/records/my-records?page=${pagination.page}&size=${pagination.size}`
        );
        console.log("Smoking records response:", response);
        const data = response.data.result;
        const records = response.data.result.content;

        console.log("Fetched smoking records:", records);

        const validRecords = Array.isArray(records)
          ? records.filter((record: any) => record && record.date)
          : [];

        setSmokingRecords(validRecords);
        setPagination({
          ...pagination,
          page: data.pageNumber || 0,
          size: data.pageSize || 30,
          totalElements: data.totalElements || 0,
          totalPages: data.totalPages || 1,
        });
      } catch (error) {
        console.error("Failed to fetch smoking records:", error);
        toast.error("Failed to load smoking records");
        setSmokingRecords([]);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.accessToken) {
      fetchSmokingRecords();
    } else {
      // If not authenticated, make sure smoking records is an empty array
      setSmokingRecords([]);
    }
  }, [auth, pagination.page, pagination.size, showRecordDialog]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    // Check if the selected date is not today
    const today = startOfDay(new Date());
    const selectedDay = startOfDay(date);

    if (!isSameDay(selectedDay, today)) {
      // For non-today dates, just show the record without allowing edit
      setSelectedDate(date);
      return;
    }

    setSelectedDate(date);

    // Check if there's a record for this date
    const existingRecord = smokingRecords.find((record) =>
      isSameDay(new Date(record.date), date)
    );

    if (existingRecord) {
      setCurrentRecord(existingRecord);
      setNewCigarettesCount(existingRecord.cigarettesSmoked);
      setNewNote(existingRecord.note || "");
    } else {
      setCurrentRecord(null);
      setNewCigarettesCount(0);
      setNewNote("");
    }

    setShowRecordDialog(true);
  };

  const handleCalendarDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    // Don't open dialog, just update the selected date
  };

  const handleEditRecord = (record: SmokingRecord) => {
    // Check if the record date is not today
    const today = startOfDay(new Date());
    const recordDate = startOfDay(new Date(record.date));

    if (!isSameDay(recordDate, today)) {
      toast.error("You can only edit today's record");
      return;
    }

    setCurrentRecord(record);
    setSelectedDate(new Date(record.date));
    setNewCigarettesCount(record.cigarettesSmoked);
    setNewNote(record.note || "");
    setShowRecordDialog(true);
  };

  const handleSaveRecord = async () => {
    try {
      const payload = {
        date: selectedDate.toISOString(),
        cigarettesSmoked: newCigarettesCount,
        note: newNote,
      };

      if (currentRecord) {
        const response = await apiWithInterceptor.put(
          `/v1/records/${currentRecord.id}`,
          payload
        );
        setSmokingRecords((records) =>
          records.map((record) =>
            record.id === currentRecord.id ? response.data.data : record
          )
        );
        toast.success("Smoking record updated successfully");
      } else {
        const response = await apiWithInterceptor.post("/v1/records", payload);
        setSmokingRecords((records) => [...records, response.data.data]);
        toast.success("Smoking record added successfully");
      }

      setShowRecordDialog(false);
      setPagination((prev) => ({ ...prev, page: 0 }));
    } catch (error) {
      console.error("Failed to save smoking record:", error);
      toast.error("Failed to save smoking record");
    }
  };

  const handleDeleteRecord = async () => {
    if (!currentRecord) return;

    try {
      await apiWithInterceptor.delete(`/v1/records/${currentRecord.id}`);
      setSmokingRecords((records) =>
        records.filter((record) => record.id !== currentRecord.id)
      );
      toast.success("Smoking record deleted successfully");
      setShowRecordDialog(false);
      setPagination((prev) => ({ ...prev, page: 0 }));
    } catch (error) {
      console.error("Failed to delete smoking record:", error);
      toast.error("Failed to delete smoking record");
    }
  };

  const getTodayRecord = () => {
    if (!smokingRecords || smokingRecords.length === 0) return undefined;

    return smokingRecords.find(
      (record) =>
        record && record.date && isSameDay(new Date(record.date), selectedDate)
    );
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleNavigateToSettings = () => {
    navigate("/settings");
  };

  const handleNavigateToDashboard = () => {
    navigate("/member/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome Back, {auth?.currentAcc?.username}
      </h1>
      <div className="mr-2 pb-10 flex justify-between">
        <p className="text-gray-700 w-[50%]">
          Manual tracking mode is enabled. Record your smoking habits daily. You
          can also view your daily records here.
        </p>
        <Button
          onClick={handleNavigateToDashboard}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          <BarChart3 className="h-4 w-4" />
          View Dashboard
        </Button>
      </div>

      <Tabs defaultValue="records" className="mb-6">
        <TabsList className={`grid grid-cols-2 mb-4`}>
          <TabsTrigger value="records">Smoking Records</TabsTrigger>
          <TabsTrigger value="plans">Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="records">
          <div className="flex flex-col gap-6">
            <div className="w-full flex flex-col sm:flex-row gap-6">
              <TodayRecord
                loading={loading}
                todayRecord={getTodayRecord()}
                selectedDate={selectedDate}
                handleDateSelect={handleDateSelect}
              />
              <RecordCalendar
                selectedDate={selectedDate}
                smokingRecords={smokingRecords.filter(
                  (record) => record && record.date
                )}
                handleDateSelect={handleDateSelect}
                handleCalendarDateSelect={handleCalendarDateSelect}
              />
            </div>

            <RecordsList
              loading={loading}
              smokingRecords={smokingRecords.filter(
                (record) => record && record.date
              )}
              pagination={pagination}
              handlePageChange={handlePageChange}
              handleEditRecord={handleEditRecord}
            />
          </div>
        </TabsContent>

        <TabsContent value="plans">
          <PlanTrackingTab />
        </TabsContent>
      </Tabs>

      <RecordDialog
        open={showRecordDialog}
        onOpenChange={setShowRecordDialog}
        selectedDate={selectedDate}
        currentRecord={currentRecord}
        newCigarettesCount={newCigarettesCount}
        newNote={newNote}
        setNewCigarettesCount={setNewCigarettesCount}
        setNewNote={setNewNote}
        handleSaveRecord={handleSaveRecord}
        handleDeleteRecord={handleDeleteRecord}
      />

      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Currently using Manual Tracking
                </p>
                <p className="text-xs text-blue-700">
                  Want to try automatic tracking? Change it in settings
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNavigateToSettings}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecordHabbitPage;
