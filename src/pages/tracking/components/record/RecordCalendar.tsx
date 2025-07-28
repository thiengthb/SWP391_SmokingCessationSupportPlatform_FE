import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { type SmokingRecord } from "@/types/models/record";

interface RecordCalendarProps {
  selectedDate: Date;
  smokingRecords: SmokingRecord[];
  handleDateSelect: (date: Date | undefined) => void;
  handleCalendarDateSelect: (date: Date | undefined) => void;
}

export function RecordCalendar({
  selectedDate,
  smokingRecords,
  handleCalendarDateSelect,
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
          View your smoking records by date (Only today can be edited)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleCalendarDateSelect}
          className="rounded border mx-auto"
          modifiers={{
            booked: getCalendarDates(),
            today: new Date(),
          }}
          modifiersStyles={{
            booked: {
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              fontWeight: "bold",
            },
            today: {
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              color: "#16a34a",
              fontWeight: "bold",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default RecordCalendar;
