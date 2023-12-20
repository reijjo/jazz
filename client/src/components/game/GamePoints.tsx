import { GameCategories, HoldPoints, LockPoints } from "../../utils/types";
import {
  ykkoset,
  kakkoset,
  kolmoset,
  neloset,
  vitoset,
  kutoset,
  pair,
  pair2,
  chance,
  same3,
  same4,
  yatzy,
  fullhouse,
  straight15,
  straight26,
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
  subtotal: number;
};

const GamePoints = ({
  selected,
  locked,
  handleHoldPoints,
  points,
  rolls,
  diceValues,
  category,
  subtotal,
}: Props) => {
  const calcPoints = () => {
    switch (category) {
      case GameCategories.Ones:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? ykkoset(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Twos:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? kakkoset(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Threes:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? kolmoset(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Fours:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? neloset(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Fives:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? vitoset(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Sixes:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? kutoset(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Empty:
        return "";
      case GameCategories.Subtotal:
        return subtotal;
      case GameCategories.Bonus:
        return points.Bonus;
      case GameCategories.Pair:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? pair(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Pair2:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? pair2(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Same3:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? same3(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Same4:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? same4(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Straight15:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? straight15(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Straight26:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? straight26(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Fullhouse:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? fullhouse(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Chance:
        if (points.Yatzy === 50 && rolls < 3 && !locked[category]) {
          return yatzy(diceValues);
        } else {
          return rolls < 3 && !locked[category]
            ? chance(diceValues)
            : Number(points[category]) | 0;
        }
      case GameCategories.Yatzy:
        return rolls < 3 && !locked[category]
          ? yatzy(diceValues)
          : Number(points[category]) | 0;
      default:
        return Number(points[category] | 0);
    }
  };

  if (category === GameCategories.Empty) {
    return null;
  }

  return (
    <div className="game-pisteet">
      <button
        className={
          selected === category
            ? "selected"
            : ["Empty", "Subtotal", "Bonus"].includes(category)
            ? "not-selected"
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
