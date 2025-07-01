import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TodayRecordProps {
  loading: boolean;
  todayRecord:
    | {
        cigarettesSmoked: number;
        note?: string;
      }
    | undefined;
  handleDateSelect: (date: Date) => void;
}

export function TodayRecord({
  loading,
  todayRecord,
  handleDateSelect,
}: TodayRecordProps) {
  return (
    <Card className="flex-1 shadow-lg">
      <CardHeader>
        <CardTitle>Today's Record</CardTitle>
        <CardDescription>
          Log your cigarette consumption for today
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : todayRecord ? (
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {todayRecord.cigarettesSmoked}
            </div>
            <p className="text-gray-500">Cigarettes Today</p>
            {todayRecord.note && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm italic">{todayRecord.note}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="mb-4">No record for today yet</p>
            <Button onClick={() => handleDateSelect(new Date())}>
              Add Today's Record
            </Button>
          </div>
        )}
      </CardContent>
      {todayRecord && (
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => handleDateSelect(new Date())}
          >
            Update Today's Record
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default TodayRecord;
