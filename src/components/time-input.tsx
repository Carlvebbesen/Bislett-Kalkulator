"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "./ui/card";

interface TimeInputProps {
  onChange: (minutes: number, seconds: number) => void;
}

export default function TimeInput({ onChange }: TimeInputProps) {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const handleMinutesChange = (value: string) => {
    const newMinutes = parseInt(value, 10);
    setMinutes(isNaN(newMinutes) ? 0 : Math.min(59, Math.max(0, newMinutes)));
    onChange(newMinutes, seconds);
  };

  const handleSecondsChange = (value: string) => {
    const newSeconds = parseInt(value, 10);
    setSeconds(isNaN(newSeconds) ? 0 : Math.min(59, Math.max(0, newSeconds)));
    onChange(minutes, newSeconds);
  };

  const renderOptions = (max: number) => {
    return Array.from({ length: max + 1 }, (_, i) => (
      <SelectItem key={i} value={i.toString()}>
        {i.toString().padStart(2, "0")}
      </SelectItem>
    ));
  };

  return (
    <Card className="flex gap-4 p-4 w-60 justify-center">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="minutes">Minutes</Label>
        <Select onValueChange={handleMinutesChange} value={minutes.toString()}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="00" />
          </SelectTrigger>
          <SelectContent>{renderOptions(59)}</SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="seconds">Seconds</Label>
        <Select onValueChange={handleSecondsChange} value={seconds.toString()}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="00" />
          </SelectTrigger>
          <SelectContent>{renderOptions(59)}</SelectContent>
        </Select>
      </div>
    </Card>
  );
}
