import { GameCategories, HoldPoints, LockPoints } from "../../utils/types";
import GameImg from "./GameImg";
import GameInfo from "./GameInfo";
import GamePoints from "./GamePoints";

type Props = {
  selected: keyof HoldPoints | null;
  locked: HoldPoints;
  handleHoldPoints: (category: keyof HoldPoints) => void;
  rolls: number;
  diceValues: {
    dice1: number;
    dice2: number;
    dice3: number;
    dice4: number;
    dice5: number;
  };
  ykkoset: (diceValues: { [key: string]: number }) => number;
  points: LockPoints;
  handleHover: (header: string, children: string) => void;
  handleMouseLeave: () => void;
  category: GameCategories;
  subtotal: number;
};

const GameSection = ({
  selected,
  locked,
  handleHoldPoints,
  rolls,
  diceValues,
  points,
  handleHover,
  handleMouseLeave,
  category,
  subtotal,
}: Props) => {
  return (
    <div className="game-section">
      <GameImg category={category} />
      <GamePoints
        category={category}
        selected={selected}
        handleHoldPoints={handleHoldPoints}
        points={points}
        rolls={rolls}
        diceValues={diceValues}
        locked={locked}
        subtotal={subtotal}
      />
      <GameInfo
        category={category}
        handleHover={handleHover}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default GameSection;
