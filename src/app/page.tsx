"use client";
import { BisletInput } from "@/components/bislet-input";
import { DistanceTable } from "@/components/distance-table";
import InfoBox from "@/components/info-box";
import Stats from "@/components/stats";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPace, convertHMSToSeconds } from "@/lib/calculate";
import { useState } from "react";

export default function Home() {
  const [distance, setDistance] = useState<number>(0);
  const [time, setTime] = useState("00:00:00");
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const pace = getPace(distance, convertHMSToSeconds(time));
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Distance Calculator</h1>
      <InfoBox />

      <div className="p-4 space-y-6 flex items-center flex-col">
        <Tabs
          defaultValue="bislett"
          className="w-full flex flex-col items-center gap-4"
        >
          <TabsList>
            <TabsTrigger value="bislett">Bislett Rounds</TabsTrigger>
            <TabsTrigger value="custom">Custom Distance</TabsTrigger>
          </TabsList>
          <TabsContent value="bislett">
            <BisletInput setValue={setDistance} value={distance} />
          </TabsContent>
          <TabsContent value="custom">
            <Input
              type="number"
              className="w-60 text-center"
              value={distance}
              onChange={(e) => {
                const dist = parseInt(e.target.value, 10);
                setDistance(isNaN(dist) ? 0 : dist);
              }}
            />
          </TabsContent>
        </Tabs>
        <Input
          type="time"
          step="1"
          value={time}
          onChange={handleTimeChange}
          className="w-60 justify-center"
        />
        <Stats distance={distance} pace={pace} />
        <DistanceTable {...pace} />
      </div>
    </main>
  );
}
