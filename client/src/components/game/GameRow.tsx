import { HoldPoints, LockPoints } from "../../utils/types";
import GameSection from "./GameSection";

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
};

const GameRow = ({
  selected,
  locked,
  handleHoldPoints,
  rolls,
  diceValues,
  ykkoset,
  points,
  handleHover,
  handleMouseLeave,
}: Props) => {
  return (
    <div className="game-row">
      <GameSection
        selected={selected}
        locked={locked}
        handleHoldPoints={handleHoldPoints}
        rolls={rolls}
        diceValues={diceValues}
        ykkoset={ykkoset}
        points={points}
        handleHover={handleHover}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default GameRow;
