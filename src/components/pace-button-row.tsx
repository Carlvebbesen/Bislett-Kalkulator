import { Button } from "./ui/button";

interface PaceButtonRowProps {
  onAdjust: (seconds: number) => void;
  currentTime?: number;
}

const PaceButtonRow = ({ onAdjust, currentTime = 0 }: PaceButtonRowProps) => {
  const isDisabled = currentTime <= 0;

  return (
    <div className="flex gap-3 md:gap-2">
      <Button
        onClick={() => onAdjust(-5)}
        disabled={isDisabled}
        size="lg"
        className="h-12 px-6 text-base md:h-10 md:px-4 md:text-sm bg-blue-600 hover:bg-blue-700 text-white border-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 dark:border-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        -5
      </Button>
      <Button
        onClick={() => onAdjust(-1)}
        disabled={isDisabled}
        size="lg"
        className="h-12 px-6 text-base md:h-10 md:px-4 md:text-sm bg-blue-500 hover:bg-blue-600 text-white border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        -1
      </Button>
      <div className="w-8 md:w-7"></div>
      <Button
        onClick={() => onAdjust(1)}
        size="lg"
        className="h-12 px-6 text-base md:h-10 md:px-4 md:text-sm bg-blue-500 hover:bg-blue-600 text-white border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-blue-700"
      >
        +1
      </Button>
      <Button
        onClick={() => onAdjust(5)}
        size="lg"
        className="h-12 px-6 text-base md:h-10 md:px-4 md:text-sm bg-blue-600 hover:bg-blue-700 text-white border-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 dark:border-blue-800"
      >
        +5
      </Button>
    </div>
  );
};

export default PaceButtonRow;
