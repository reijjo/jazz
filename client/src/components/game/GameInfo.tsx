import info from "../../assets/images/icons/icons8-info-50.png";

import { GameCategories } from "../../utils/types";
import { getInfoFields } from "../../utils/helpers";

type Props = {
  category: GameCategories;
  handleHover: (header: string, children: string) => void;
  handleMouseLeave: () => void;
};

const GameInfo = ({ category, handleHover, handleMouseLeave }: Props) => {
  const { header, children } = getInfoFields(category);

  const isOnes = category === GameCategories.Ones;
  const isTwos = category === GameCategories.Twos;
  const isThrees = category === GameCategories.Threes;
  const isFours = category === GameCategories.Fours;
  const isFives = category === GameCategories.Fives;
  const isSixes = category === GameCategories.Sixes;
  const isEmpty = category === GameCategories.Empty;
  const isSubtotal = category === GameCategories.Subtotal;
  const isBonus = category === GameCategories.Bonus;
  const isPair = category === GameCategories.Pair;
  const isPair2 = category === GameCategories.Pair2;
  const isSame3 = category === GameCategories.Same3;
  const isSame4 = category === GameCategories.Same4;
  const isStraight15 = category === GameCategories.Straight15;
  const isStraight26 = category === GameCategories.Straight26;
  const isFullhouse = category === GameCategories.Fullhouse;
  const isChance = category === GameCategories.Chance;
  // const isYatzy = category === GameCategories.Yatzy;

  if (isEmpty) {
    return null;
  }

  return (
    <div className="game-ohje">
      <div className="game-ohje-div">
        <div>
          {isOnes
            ? GameCategories.Ones
            : isTwos
            ? GameCategories.Twos
            : isThrees
            ? GameCategories.Threes
            : isFours
            ? GameCategories.Fours
            : isFives
            ? GameCategories.Fives
            : isSixes
            ? GameCategories.Sixes
            : isSubtotal
            ? GameCategories.Subtotal
            : isBonus
            ? GameCategories.Bonus
            : isPair
            ? GameCategories.Pair
            : isPair2
            ? "Pair x2"
            : isSame3
            ? "Same x3"
            : isSame4
            ? "Same x4"
            : isStraight15
            ? "Straight 1-5"
            : isStraight26
            ? "Straight 2-6"
            : isFullhouse
            ? "Full House"
            : isChance
            ? GameCategories.Chance
            : GameCategories.Yatzy}
        </div>
        <img
          src={info}
          alt="info"
          height="50%"
          onMouseEnter={() => handleHover(header, children)}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
};

export default GameInfo;
