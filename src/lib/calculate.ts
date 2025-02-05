import { Pace } from "@/types";

export const getPace = (
  totalDistanceInMeter: number,
  timeUsedInSec: number
): Pace => {
  if (timeUsedInSec === 0) {
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
  if (speedMs <= 0) throw new Error("Speed must be greater than 0");

  const totalSecondsPerKm = 1000 / speedMs;
  const minutes = Math.floor(totalSecondsPerKm / 60);
  const seconds = Math.round(totalSecondsPerKm % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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
export function convertHMSToSeconds(hms: string): number {
  const parts = hms.split(":").map(Number);

  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error("Invalid time format. Expected 'hh:mm:ss'");
  }

  const [hours, minutes, seconds] = parts;

  return hours * 3600 + minutes * 60 + seconds;
}
