import { Button } from "./ui/button";

const ButtonRow = ({
  onPress,
  currentTime = 0,
}: {
  onPress: (newTime: number) => void;
  currentTime?: number;
}) => {
  const isDisabled = currentTime <= 0;

  return (
    <div className="flex gap-3 md:gap-2">
      <Button
        onClick={() => onPress(Math.max(0, currentTime - 5))}
        disabled={isDisabled}
        size="lg"
        className="h-12 px-6 text-base md:h-10 md:px-4 md:text-sm"
      >
        -5
      </Button>
      <Button
        onClick={() => onPress(Math.max(0, currentTime - 1))}
        disabled={isDisabled}
        size="lg"
        className="h-12 px-6 text-base md:h-10 md:px-4 md:text-sm"
      >
        -1
      </Button>
      <div className="w-8 md:w-7"></div>
      <Button 
        onClick={() => onPress(currentTime + 1)}
        size="lg"
        className="h-12 px-6 text-base md:h-10 md:px-4 md:text-sm"
      >
        +1
      </Button>
      <Button 
        onClick={() => onPress(currentTime + 5)}
        size="lg"
        className="h-12 px-6 text-base md:h-10 md:px-4 md:text-sm"
      >
        +5
      </Button>
    </div>
  );
};

export default ButtonRow;
