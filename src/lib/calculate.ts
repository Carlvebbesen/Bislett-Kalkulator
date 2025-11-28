import { Pace } from "@/types";

export const getPace = (
  totalDistanceInMeter: number,
  timeUsedInSec: number
): Pace => {
  if (timeUsedInSec === 0 || totalDistanceInMeter === 0) {
    return {
      speedMs: 0,
      pace: "00:00",
      speedKmt: 0,
    };
  }
  const speedMs = totalDistanceInMeter / timeUsedInSec;
  const speedKmt = speedMs * 3.6;
  const pace = convertSpeedToPace(speedMs);
  return {
    speedMs,
    pace,
    speedKmt,
  };
};

export const roundToBase = (value: number, base: number) =>
  Math.round(value / base) * base;

export const getTimeUsedDistance = (distanceInMeter: number, speedMs: number) =>
  convertSecondsToHMS(distanceInMeter / speedMs);

export function convertSpeedToPace(speedMs: number): string {
  if (speedMs <= 0) return "--:--";
  const totalSecondsPerKm = 1000 / speedMs;
  const totalMinutes = Math.floor(totalSecondsPerKm / 60);
  let seconds = Math.round(totalSecondsPerKm % 60);

  // Handle rollover: if seconds round to 60, add 1 to minutes and set seconds to 0
  if (seconds >= 60) {
    const minutes = totalMinutes + 1;
    seconds = 0;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return `${totalMinutes}:${seconds.toString().padStart(2, "0")}`;
}

export function convertSecondsToHMS(seconds: number): string {
  if (seconds < 0) throw new Error("Seconds cannot be negative");
  if (seconds === 0 || isNaN(seconds) || !isFinite(seconds)) {
    return "0 min 0 sec";
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours > 0 ? `${hours} h` : ""} ${
    minutes > 0 ? `${minutes} min` : ""
  }  ${remainingSeconds.toFixed(1)} sec`;
}

/**
 * Converts a pace string (MM:SS) to seconds per kilometer
 */
export function convertPaceToSecondsPerKm(pace: string): number {
  const [minutes, seconds] = pace.split(":").map(Number);
  if (isNaN(minutes) || isNaN(seconds)) return 0;
  return minutes * 60 + seconds;
}

/**
 * Converts seconds per kilometer to a pace string (MM:SS)
 */
export function convertSecondsPerKmToPace(secondsPerKm: number): string {
  if (secondsPerKm <= 0 || !isFinite(secondsPerKm)) return "00:00";
  const totalMinutes = Math.floor(secondsPerKm / 60);
  let seconds = Math.round(secondsPerKm % 60);

  // Handle rollover: if seconds round to 60, add 1 to minutes and set seconds to 0
  if (seconds >= 60) {
    const minutes = totalMinutes + 1;
    seconds = 0;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return `${totalMinutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Calculates time in seconds for a given distance and pace
 */
export function getTimeFromPace(
  distanceInMeter: number,
  paceSecondsPerKm: number
): number {
  if (paceSecondsPerKm <= 0 || distanceInMeter <= 0) return 0;
  return (distanceInMeter / 1000) * paceSecondsPerKm;
}
