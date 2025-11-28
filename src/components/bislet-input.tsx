import { MinusIcon, PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction, } from "react";
import { Input } from "./ui/input";
import { bislettRound } from "@/lib/constants";
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
    setValue((prev) => roundToBase(prev + bislettRound, bislettRound));
  const handleDecrement = () =>
    setValue((prev) =>
      Math.max(bislettRound, roundToBase(prev - bislettRound, bislettRound))
    );

  return (
    <div className="flex items-center gap-4 md:space-x-4">
      <Button 
        onClick={handleDecrement}
        size="lg"
        className="h-12 w-12 md:h-9 md:w-9"
      >
        <MinusIcon className="h-5 w-5 md:h-4 md:w-4" />
      </Button>
      <Input
        type="number"
        value={(value / bislettRound).toFixed(0)}
        onChange={(e) =>
          setValue(Math.max(1, Number.parseInt(e.target.value) || 1))
        }
        className="w-20 text-center h-12 md:h-9 text-base md:text-sm"
      />
      <Button 
        onClick={handleIncrement}
        size="lg"
        className="h-12 w-12 md:h-9 md:w-9"
      >
        <PlusIcon className="h-5 w-5 md:h-4 md:w-4" />
      </Button>
    </div>
  );
}
