import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

const ButtonRow = ({
  onPress,
}: {
  onPress: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="flex gap-2">
      <Button onClick={() => onPress((prev) => prev - 5)}>-5</Button>
      <Button onClick={() => onPress((prev) => prev - 1)}>-1</Button>
      <div className="w-7"></div>
      <Button onClick={() => onPress((prev) => prev + 1)}>+1</Button>
      <Button onClick={() => onPress((prev) => prev + 5)}>+5</Button>
    </div>
  );
};

export default ButtonRow;
