import { useState, useEffect } from "react";
import { isSameDay } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SmokingAchievements from "@/pages/tracking/components/record/SmokingAchievements";
import TodayRecord from "@/pages/tracking/components/record/TodayRecord";
import RecordCalendar from "@/pages/tracking/components/record/RecordCalendar";
import RecordsList from "@/pages/tracking/components/record/RecordsList";
import RecordDialog from "@/pages/tracking/components/record/RecordDialog";
import type { SmokingRecord } from "@/types/models/Record";
import { defaultPagination, type Pagination } from "@/types/pagination";
import PlanTrackingTab from "./PlanTrackingTab";
const RecordHabbitPage = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);

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
        const response = await api.get(
          `/v1/records?page=${pagination.pageNumber}&size=${pagination.pageSize}`
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
          pageNumber: data.pageNumber || 0,
          pageSize: data.pageSize || 30,
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
  }, [auth, pagination.pageNumber, pagination.pageSize, showRecordDialog]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
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

  const handleEditRecord = (record: SmokingRecord) => {
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
        const response = await api.put(
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
        const response = await api.post("/v1/records", payload);
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
      await api.delete(`/v1/records/${currentRecord.id}`);
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
        record && record.date && isSameDay(new Date(record.date), new Date())
    );
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome Back, {auth?.currentAcc?.username}
      </h1>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList
          className={`grid ${
            auth.currentAcc?.havingSubscription ? "grid-cols-3" : "grid-cols-2"
          } mb-4`}
        >
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="records">Smoking Records</TabsTrigger>
          {auth.currentAcc?.havingSubscription && (
            <TabsTrigger value="plans">Plan</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview">
          <SmokingAchievements />
        </TabsContent>

        <TabsContent value="records">
          <div className="flex flex-col gap-6">
            <div className="w-full flex flex-col sm:flex-row gap-6">
              <TodayRecord
                loading={loading}
                todayRecord={getTodayRecord()}
                handleDateSelect={handleDateSelect}
              />
              <RecordCalendar
                selectedDate={selectedDate}
                smokingRecords={smokingRecords.filter(
                  (record) => record && record.date
                )}
                handleDateSelect={handleDateSelect}
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
    </div>
  );
};

export default RecordHabbitPage;
