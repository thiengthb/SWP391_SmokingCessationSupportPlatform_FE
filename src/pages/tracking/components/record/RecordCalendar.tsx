import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { type SmokingRecord } from "@/types/models/Record";

interface RecordCalendarProps {
  selectedDate: Date;
  smokingRecords: SmokingRecord[];
  handleDateSelect: (date: Date | undefined) => void;
}

export function RecordCalendar({
  selectedDate,
  smokingRecords,
  handleDateSelect,
}: RecordCalendarProps) {
  // Safely create dates for the calendar
  const getCalendarDates = () => {
    if (!smokingRecords || smokingRecords.length === 0) return [];

    return smokingRecords
      .filter((record) => record && record.date)
      .map((record) => new Date(record.date));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Smoking Record Calendar</CardTitle>
        <CardDescription>
          View or edit your smoking records by date
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded border mx-auto"
          modifiers={{
            booked: getCalendarDates(),
          }}
          modifiersStyles={{
            booked: {
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              fontWeight: "bold",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default RecordCalendar;
