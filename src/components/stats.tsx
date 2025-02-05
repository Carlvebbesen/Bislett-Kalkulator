import { Card, CardTitle, CardContent } from "./ui/card";
import { Pace } from "@/types";

export default function Stats({
  distance,
  pace,
}: {
  distance: number;
  pace: Pace;
}) {
  return (
    <Card className="p-4 min-w-96">
      <CardTitle className="mb-2 text-3xl">Stats:</CardTitle>
      <CardContent className="flex items-center flex-col">
        <p>
          Distance run:{" "}
          <span className="font-semibold text-lg">{distance} meters</span>
        </p>
        <table className="divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr key={"pace-value"}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {pace.pace}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {"min:km"}
              </td>
            </tr>
            <tr key={"kmt-value"}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {pace.speedKmt.toFixed(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                km/t
              </td>
            </tr>
            <tr key={"ms-value"}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {pace.speedMs.toFixed(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                m/s
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
