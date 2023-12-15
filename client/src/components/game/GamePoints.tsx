import { GameCategories, HoldPoints, LockPoints } from "../../utils/types";
import {
  ykkoset,
  kakkoset,
  kolmoset,
  neloset,
  vitoset,
  kutoset,
  chance,
} from "../../utils/helpers";

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
  const calcPoints = () => {
    switch (category) {
      case GameCategories.Ones:
        return rolls < 3 && !locked[category]
          ? ykkoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Twos:
        return rolls < 3 && !locked[category]
          ? kakkoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Threes:
        return rolls < 3 && !locked[category]
          ? kolmoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Fours:
        return rolls < 3 && !locked[category]
          ? neloset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Fives:
        return rolls < 3 && !locked[category]
          ? vitoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Sixes:
        return rolls < 3 && !locked[category]
          ? kutoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Subtotal:
        return rolls < 3 && !locked[category]
          ? ykkoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Bonus:
        return rolls < 3 && !locked[category]
          ? ykkoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Pair:
        return rolls < 3 && !locked[category]
          ? ykkoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Pair2:
        return rolls < 3 && !locked[category]
          ? ykkoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Same3:
        return rolls < 3 && !locked[category]
          ? ykkoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Same4:
        return rolls < 3 && !locked[category]
          ? ykkoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Straight15:
        return rolls < 3 && !locked[category]
          ? ykkoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Straight26:
        return rolls < 3 && !locked[category]
          ? ykkoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Fullhouse:
        return rolls < 3 && !locked[category]
          ? ykkoset(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Chance:
        return rolls < 3 && !locked[category]
          ? chance(diceValues)
          : Number(points[category]) | 0;
      case GameCategories.Yatzy:
        return rolls < 3 && !locked[category]
          ? ykkoset(diceValues)
          : Number(points[category]) | 0;
      default:
        return Number(points[category] | 0);
    }
  };

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
        {calcPoints()}
      </button>
    </div>
  );
};

export default GamePoints;
