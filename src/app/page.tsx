"use client";
import { BisletInput } from "@/components/bislet-input";
import ButtonRow from "@/components/button-row";
import { DistanceTable } from "@/components/distance-table";
import InfoBox from "@/components/info-box";
import Stats from "@/components/stats";
import TimeInput from "@/components/time-input";
import PaceInput from "@/components/pace-input";
import PaceButtonRow from "@/components/pace-button-row";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Gauge } from "lucide-react";
import {
  getPace,
  convertPaceToSecondsPerKm,
  convertSecondsPerKmToPace,
  getTimeFromPace,
} from "@/lib/calculate";
import { bislettRound, distances } from "@/lib/constants";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [distance, setDistance] = useState<number>(bislettRound);
  const [time, setTime] = useState(240);
  const [master, setMaster] = useState<"time" | "pace">("time");
  const [masterPaceSecondsPerKm, setMasterPaceSecondsPerKm] = useState<
    number | null
  >(null);

  // Calculate pace from time when time is master
  // Use stored pace when pace is master
  let currentPace: ReturnType<typeof getPace>;
  let currentPaceString: string;

  if (master === "pace" && masterPaceSecondsPerKm !== null) {
    // Pace is master: calculate time from pace, then get pace object for display
    const calculatedTime = getTimeFromPace(distance, masterPaceSecondsPerKm);
    currentPace = getPace(distance, Math.round(calculatedTime));
    currentPaceString = convertSecondsPerKmToPace(masterPaceSecondsPerKm);
  } else {
    // Time is master: calculate pace from time
    currentPace = getPace(distance, time);
    currentPaceString = currentPace.pace;
  }

  // When time changes, time becomes master
  const handleTimeChange = (minutes: number, seconds: number) => {
    setMaster("time");
    setMasterPaceSecondsPerKm(null);
    setTime(minutes * 60 + seconds);
  };

  const handleTimeAdjust = (newTime: number) => {
    setMaster("time");
    setMasterPaceSecondsPerKm(null);
    setTime(Math.max(0, newTime));
  };

  // When pace changes, pace becomes master
  const handlePaceChange = (minutes: number, seconds: number) => {
    const paceSecondsPerKm = minutes * 60 + seconds;
    setMaster("pace");
    setMasterPaceSecondsPerKm(paceSecondsPerKm);
    const newTime = getTimeFromPace(distance, paceSecondsPerKm);
    setTime(Math.round(newTime));
  };

  const handlePaceAdjust = (seconds: number) => {
    if (distance <= 0) return;

    // Get current pace value (either from master or calculated from time)
    let currentPaceSecondsPerKm: number;
    if (master === "pace" && masterPaceSecondsPerKm !== null) {
      currentPaceSecondsPerKm = masterPaceSecondsPerKm;
    } else {
      // Calculate from current time
      if (time <= 0) return;
      const currentSpeedMs = distance / time;
      currentPaceSecondsPerKm = 1000 / currentSpeedMs;
    }

    const newPaceSecondsPerKm = Math.max(0, currentPaceSecondsPerKm + seconds);
    setMaster("pace");
    setMasterPaceSecondsPerKm(newPaceSecondsPerKm);
    const newTime = getTimeFromPace(distance, newPaceSecondsPerKm);
    setTime(Math.round(newTime));
  };

  // Handle distance changes - always recalculate time from current pace
  const handleDistanceChange = (newDistance: number) => {
    setDistance(newDistance);
    if (newDistance <= 0) return;

    // Get current pace value (either from master or calculated from time)
    let currentPaceSecondsPerKm: number;
    if (master === "pace" && masterPaceSecondsPerKm !== null) {
      currentPaceSecondsPerKm = masterPaceSecondsPerKm;
    } else {
      // Calculate from current time to get the pace
      if (time <= 0) return;
      const currentSpeedMs = distance / time;
      currentPaceSecondsPerKm = 1000 / currentSpeedMs;
      // Set pace as master when distance changes
      setMaster("pace");
      setMasterPaceSecondsPerKm(currentPaceSecondsPerKm);
    }

    // Always recalculate time from pace when distance changes
    const newTime = getTimeFromPace(newDistance, currentPaceSecondsPerKm);
    setTime(Math.round(newTime));
  };

  // Sort distances by sort prop (lower value first, same value keeps original order)
  const sortedDistances = useMemo(() => {
    return [...distances].sort((a, b) => {
      if (a.sort !== b.sort) {
        return a.sort - b.sort;
      }
      // If sort values are the same, keep original order
      return 0;
    });
  }, []);

  // Find current distance in the sorted list for the select value
  const currentDistanceValue = useMemo(() => {
    const found = sortedDistances.find((d) => d.value === distance);
    return found ? found.value.toString() : undefined;
  }, [distance, sortedDistances]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Distance Calculator</h1>
      <InfoBox />

      <div className="p-4 space-y-2 md:space-y-3 flex items-center flex-col relative">
        <Tabs
          defaultValue={distance === bislettRound ? "bislett" : "custom"}
          className="w-full flex flex-col items-center gap-4 md:gap-3"
        >
          <TabsList className="h-12 md:h-9 p-1.5 md:p-1">
            <TabsTrigger
              value="bislett"
              className="h-10 md:h-7 px-6 md:px-3 text-base md:text-sm font-medium"
            >
              Bislett Rounds
            </TabsTrigger>
            <TabsTrigger
              value="custom"
              className="h-10 md:h-7 px-6 md:px-3 text-base md:text-sm font-medium"
            >
              Custom Distance
            </TabsTrigger>
          </TabsList>
          <TabsContent value="bislett">
            <BisletInput
              setValue={(newDistance) => {
                const dist =
                  typeof newDistance === "function"
                    ? newDistance(distance)
                    : newDistance;
                handleDistanceChange(dist);
              }}
              value={distance}
            />
          </TabsContent>
          <TabsContent value="custom">
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <Input
                type="number"
                className="w-60 text-center"
                step={"1"}
                value={distance}
                onChange={(e) => {
                  const dist = parseInt(e.target.value, 10);
                  const newDistance = isNaN(dist) ? 0 : dist;
                  handleDistanceChange(newDistance);
                }}
              />
              <Select
                value={currentDistanceValue}
                onValueChange={(value) => {
                  const selectedDistance = parseFloat(value);
                  handleDistanceChange(selectedDistance);
                }}
              >
                <SelectTrigger className="w-60 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100 dark:from-blue-950 dark:to-indigo-950 dark:border-blue-800 dark:hover:from-blue-900 dark:hover:to-indigo-900">
                  <SelectValue placeholder="Select distance" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {sortedDistances.map((dist) => (
                    <SelectItem
                      key={dist.value}
                      value={dist.value.toString()}
                      className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900"
                    >
                      {dist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile: Time first, then Pace (sticky) */}
        <div className="md:hidden w-full flex flex-col items-center gap-2 pb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h3 className="text-lg font-semibold">Time</h3>
          </div>
          <TimeInput currentTime={time} onChange={handleTimeChange} />
          <ButtonRow onPress={handleTimeAdjust} currentTime={time} />
        </div>
        <div className="w-96 h-px bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
        <div className="sticky top-0 md:hidden z-50 flex flex-col items-center gap-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-lg rounded-lg pb-4 md:p-4 w-screen border-b border-gray-200/30 dark:border-gray-700/30 mb-2 -mx-4 md:mx-0 md:w-full">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
              Pace
            </h3>
          </div>
          <PaceInput
            currentPace={currentPaceString}
            onChange={handlePaceChange}
          />
          <PaceButtonRow onAdjust={handlePaceAdjust} currentTime={time} />
        </div>

        {/* Desktop: Time, separator, Pace */}
        <div className="hidden md:flex md:flex-row items-center gap-4 w-full justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <h3 className="text-lg font-semibold">Time</h3>
            </div>
            <TimeInput currentTime={time} onChange={handleTimeChange} />
            <ButtonRow onPress={handleTimeAdjust} currentTime={time} />
          </div>
          <div className="h-64 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                Pace
              </h3>
            </div>
            <PaceInput
              currentPace={currentPaceString}
              onChange={handlePaceChange}
            />
            <PaceButtonRow onAdjust={handlePaceAdjust} currentTime={time} />
          </div>
        </div>

        <Stats distance={distance} pace={currentPace} />
        <DistanceTable {...currentPace} />
      </div>
    </main>
  );
}
