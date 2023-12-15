import { GameCategories, HoldPoints, LockPoints } from "../../utils/types";
import { ykkoset } from "../../utils/helpers";

type Props = {
  selected: keyof HoldPoints | null;
  locked: HoldPoints;
  handleHoldPoints: (category: keyof HoldPoints) => void;
  points: LockPoints;
  rolls: number;
  diceValues: {
    dice1: number;
    dice2: number;
    dice3: number;
    dice4: number;
    dice5: number;
  };
  category: GameCategories;
};

const GamePoints = ({
  selected,
  locked,
  handleHoldPoints,
  points,
  rolls,
  diceValues,
  category,
}: Props) => {
  return (
    <div className="game-pisteet">
      <button
        className={
          selected === category
            ? "selected"
            : locked[category]
            ? "locked"
            : "not-selected"
        }
        onClick={() => {
          handleHoldPoints(category);
        }}
      >
        {rolls < 3 && !locked[category]
          ? ykkoset(diceValues)
          : Number(points[category]) | 0}
      </button>
    </div>
  );
};

export default GamePoints;
