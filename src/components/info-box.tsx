import { Card, CardContent } from "@/components/ui/card";
import { bisletRound } from "@/lib/constants";
import { Info } from "lucide-react";

export default function InfoBox() {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="flex items-start space-x-4 p-6">
        <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
        <p className="text-blue-700">
          One round at the bislett course is {bisletRound} meters long, therefore
          this calculator was made to make it easier to convert to more known
          distances.
        </p>
      </CardContent>
    </Card>
  );
}
