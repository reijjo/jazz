import { GameCategories } from "../../utils/types";

import dice1 from "../../assets/images/icons/icons8-dice-one-64.png";
import dice2 from "../../assets/images/icons/icons8-dice-two-64.png";
import dice3 from "../../assets/images/icons/icons8-dice-three-64.png";
import dice4 from "../../assets/images/icons/icons8-dice-four-64.png";
import dice5 from "../../assets/images/icons/icons8-dice-five-64.png";
import dice6 from "../../assets/images/icons/icons8-dice-six-64.png";

type Props = {
  category: GameCategories;
};

const GameImg = ({ category }: Props) => {
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
    <div className="game-kuva">
      {" "}
      <div className="game-kuva-div">
        {isOnes ? (
          <img src={dice1} alt="dice 1" height="100%" width="100%" />
        ) : isTwos ? (
          <img src={dice2} alt="dice 2" height="100%" width="100%" />
        ) : isThrees ? (
          <img src={dice3} alt="dice 3" height="100%" width="100%" />
        ) : isFours ? (
          <img src={dice4} alt="dice 4" height="100%" width="100%" />
        ) : isFives ? (
          <img src={dice5} alt="dice 5" height="100%" width="100%" />
        ) : isSixes ? (
          <img src={dice6} alt="dice 6" height="100%" width="100%" />
        ) : isEmpty ? null : isSubtotal ? (
          <>=</>
        ) : isBonus ? (
          <>Bonus</>
        ) : isPair ? (
          <>
            <img src={dice2} alt="dice 2" height="75%" width="50%" />
            <img src={dice2} alt="dice 2" height="75%" width="50%" />
          </>
        ) : isPair2 ? (
          <div className="too-many-dices">
            <div>
              <img src={dice4} alt="dice 4" height="24px" width="100%" />
              <img src={dice4} alt="dice 4" height="24px" width="100%" />
            </div>
            <div>
              <img src={dice6} alt="dice 6" height="24px" width="100%" />
              <img src={dice6} alt="dice 6" height="24px" width="100%" />
            </div>
          </div>
        ) : isSame3 ? (
          <div className="too-many-dices">
            <div>
              <img src={dice3} alt="dice 3" height="24px" width="100%" />
              <img src={dice3} alt="dice 3" height="24px" width="100%" />
              <img src={dice3} alt="dice 3" height="24px" width="100%" />
            </div>
          </div>
        ) : isSame4 ? (
          <div className="too-many-dices">
            <div>
              <img src={dice5} alt="dice 5" height="24px" width="24px" />
              <img src={dice5} alt="dice 5" height="24px" width="24px" />
            </div>
            <div>
              <img src={dice5} alt="dice 5" height="24px" width="24px" />
              <img src={dice5} alt="dice 5" height="24px" width="24px" />
            </div>
          </div>
        ) : isStraight15 ? (
          <div className="too-many-dices">
            <div>
              <img src={dice1} alt="dice 1" height="24px" width="100%" />
              <img src={dice2} alt="dice 2" height="24px" width="100%" />
            </div>
            <div>
              <img src={dice3} alt="dice 3" height="24px" width="100%" />
              <img src={dice4} alt="dice 4" height="24px" width="100%" />
              <img src={dice5} alt="dice 5" height="24px" width="100%" />
            </div>
          </div>
        ) : isStraight26 ? (
          <div className="too-many-dices">
            <div>
              <img src={dice2} alt="dice 2" height="24px" width="100%" />
              <img src={dice3} alt="dice 3" height="24px" width="100%" />
            </div>
            <div>
              <img src={dice4} alt="dice 4" height="24px" width="100%" />
              <img src={dice5} alt="dice 5" height="24px" width="100%" />
              <img src={dice6} alt="dice 6" height="24px" width="100%" />
            </div>
          </div>
        ) : isFullhouse ? (
          <div className="too-many-dices">
            <div>
              <img src={dice4} alt="dice 4" height="24px" width="100%" />
              <img src={dice4} alt="dice 4" height="24px" width="100%" />
            </div>
            <div>
              <img src={dice6} alt="dice 6" height="24px" width="100%" />
              <img src={dice6} alt="dice 6" height="24px" width="100%" />
              <img src={dice6} alt="dice 6" height="24px" width="100%" />
            </div>
          </div>
        ) : isChance ? (
          <>?</>
        ) : (
          <div className="too-many-dices">
            <div>
              <img src={dice5} alt="dice 5" height="24px" width="100%" />
              <img src={dice5} alt="dice 5" height="24px" width="100%" />
            </div>
            <div>
              <img src={dice5} alt="dice 5" height="24px" width="100%" />
              <img src={dice5} alt="dice 5" height="24px" width="100%" />
              <img src={dice5} alt="dice 5" height="24px" width="100%" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameImg;
