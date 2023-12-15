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
  const isSubtotal = category === GameCategories.Subtotal;
  const isBonus = category === GameCategories.Bonus;
  const isPair = category === GameCategories.Pair;

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
        ) : isSubtotal ? (
          <>=</>
        ) : isBonus ? (
          <>Bonus</>
        ) : isPair ? (
          <>
            <img src={dice2} alt="dice 2" height="75%" width="50%" />
            <img src={dice2} alt="dice 2" height="75%" width="50%" />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default GameImg;
