import { MinusIcon, PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction, } from "react";
import { Input } from "./ui/input";
import { bisletRound } from "@/lib/constants";
import { Button } from "./ui/button";
import { roundToBase } from "@/lib/calculate";

export function BisletInput({
  setValue,
  value,
}: {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}) {
  const handleIncrement = () =>
    setValue((prev) => roundToBase(prev + bisletRound, bisletRound));
  const handleDecrement = () =>
    setValue((prev) =>
      Math.max(bisletRound, roundToBase(prev - bisletRound, bisletRound))
    );

  return (
    <div className="flex items-center space-x-4">
      <Button onClick={handleDecrement}>
        <MinusIcon />
      </Button>
      <Input
        type="number"
        value={(value / bisletRound).toFixed(0)}
        onChange={(e) =>
          setValue(Math.max(1, Number.parseInt(e.target.value) || 1))
        }
        className="w-20 text-center"
      />
      <Button onClick={handleIncrement}>
        <PlusIcon />
      </Button>
    </div>
  );
}
