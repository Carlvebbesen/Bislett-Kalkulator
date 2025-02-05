"use client";
import { BisletInput } from "@/components/bislet-input";
import { DistanceTable } from "@/components/distance-table";
import InfoBox from "@/components/info-box";
import Stats from "@/components/stats";
import TimeInput from "@/components/time-input";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPace } from "@/lib/calculate";
import { bisletRound } from "@/lib/constants";
import { useState } from "react";

export default function Home() {
  const [distance, setDistance] = useState<number>(bisletRound);
  const [time, setTime] = useState(0);

  const pace = getPace(distance, time);
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
              step={"1"}
              value={distance}
              onChange={(e) => {
                const dist = parseInt(e.target.value, 10);
                setDistance(isNaN(dist) ? 0 : dist);
              }}
            />
          </TabsContent>
        </Tabs>
        <TimeInput
          onChange={(minutes, seconds) => setTime(minutes * 60 + seconds)}
        />
        <Stats distance={distance} pace={pace} />
        <DistanceTable {...pace} />
      </div>
    </main>
  );
}
