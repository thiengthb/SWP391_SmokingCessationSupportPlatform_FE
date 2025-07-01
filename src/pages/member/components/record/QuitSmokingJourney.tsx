import { format, differenceInDays } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface QuitSmokingJourneyProps {
  quitDate: Date | null;
}

export function QuitSmokingJourney({ quitDate }: QuitSmokingJourneyProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Your Quit Smoking Journey</CardTitle>
        <CardDescription>Track your progress and achievements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-600">
              {differenceInDays(new Date(), quitDate ? quitDate : new Date())}
            </h2>
            <p className="text-gray-500">Days Without Smoking</p>
            <p className="mt-2">
              Quit Date: {format(quitDate ? quitDate : new Date(), "PPP")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuitSmokingJourney;
