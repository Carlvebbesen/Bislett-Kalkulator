"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "./ui/card";

interface PaceInputProps {
  onChange: (minutes: number, seconds: number) => void;
  currentPace: string; // Format: "MM:SS"
}

export default function PaceInput({ onChange, currentPace }: PaceInputProps) {
  const [minutes, seconds] = currentPace.split(":").map(Number);
  const currentMinutes = isNaN(minutes) ? 0 : minutes;
  const currentSeconds = isNaN(seconds) ? 0 : seconds;

  const handleMinutesChange = (value: string) => {
    const newMinutes = parseInt(value, 10);
    const updatedValue = isNaN(newMinutes)
      ? 0
      : Math.min(59, Math.max(0, newMinutes));
    onChange(updatedValue, currentSeconds);
  };

  const handleSecondsChange = (value: string) => {
    const newSeconds = parseInt(value, 10);
    const updatedValue = isNaN(newSeconds)
      ? 0
      : Math.min(59, Math.max(0, newSeconds));
    onChange(currentMinutes, updatedValue);
  };

  return (
    <Card className="flex gap-4 p-4 w-60 justify-center bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
      <PaceInputPart
        handleChange={handleMinutesChange}
        currentValue={currentMinutes}
        label="Minutes"
      />
      <PaceInputPart
        label="Seconds"
        handleChange={handleSecondsChange}
        currentValue={currentSeconds}
      />
    </Card>
  );
}

function PaceInputPart({
  handleChange,
  currentValue,
  label,
  placeholder = "00",
}: {
  label: string;
  placeholder?: string;
  handleChange: (value: string) => void;
  currentValue: number;
}) {
  const renderOptions = (max: number) => {
    return Array.from({ length: max + 1 }, (_, i) => (
      <SelectItem key={i} value={i.toString()}>
        {i.toString().padStart(2, "0")}
      </SelectItem>
    ));
  };
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Select onValueChange={handleChange} value={currentValue.toString()}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{renderOptions(59)}</SelectContent>
      </Select>
    </div>
  );
}
