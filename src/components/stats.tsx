"use client";

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
    <Card className="p-6 min-w-96 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
      <CardTitle className="mb-4 text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
        Stats
      </CardTitle>
      <CardContent className="flex items-center flex-col gap-4">
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400 mb-2">
            Distance run
          </p>
          <p className="text-center font-bold text-2xl text-gray-900 dark:text-gray-100">
            {distance.toLocaleString()} meters
          </p>
        </div>
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                key={"pace-value"}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900 dark:text-gray-100">
                  {pace.pace}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  min:km
                </td>
              </tr>
              <tr
                key={"kmt-value"}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900 dark:text-gray-100">
                  {pace.speedKmt.toFixed(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  km/t
                </td>
              </tr>
              <tr
                key={"ms-value"}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900 dark:text-gray-100">
                  {pace.speedMs.toFixed(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  m/s
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
