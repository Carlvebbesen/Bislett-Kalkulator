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
  currentTime: number;
}

export default function TimeInput({ onChange, currentTime }: TimeInputProps) {
  const handleMinutesChange = (value: string) => {
    const newMinutes = parseInt(value, 10);
    const updatedValue = isNaN(newMinutes)
      ? 0
      : Math.min(59, Math.max(0, newMinutes));
    const oldSeconds = currentTime % 60;
    onChange(updatedValue, oldSeconds);
  };

  const handleSecondsChange = (value: string) => {
    const newSeconds = parseInt(value, 10);
    const updatedValue = isNaN(newSeconds)
      ? 0
      : Math.min(59, Math.max(0, newSeconds));
    const oldMinutes = Math.floor(currentTime / 60);
    onChange(oldMinutes, updatedValue);
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
        <Select
          onValueChange={handleMinutesChange}
          value={Math.floor(currentTime / 60).toString()}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="00" />
          </SelectTrigger>
          <SelectContent>{renderOptions(59)}</SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="seconds">Seconds</Label>
        <Select
          onValueChange={handleSecondsChange}
          value={(currentTime % 60).toString()}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="00" />
          </SelectTrigger>
          <SelectContent>{renderOptions(59)}</SelectContent>
        </Select>
      </div>
    </Card>
  );
}
