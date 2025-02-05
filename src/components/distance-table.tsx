"use client";

import { getTimeUsedDistance } from "@/lib/calculate";
import { distances } from "@/lib/constants";
import { Pace } from "@/types";

export function DistanceTable(pace: Pace) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Distance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time used
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {distances.map((distance) => {
            const timeOnDistance = getTimeUsedDistance(
              distance.value,
              pace.speedMs
            );
            return (
              <tr key={distance.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {distance.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {timeOnDistance}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
