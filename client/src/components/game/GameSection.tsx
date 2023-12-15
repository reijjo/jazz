// import dice1 from "../assets/images/icons/icons8-dice-one-64.png";
// import dice2 from "../assets/images/icons/icons8-dice-two-64.png";
// import dice3 from "../assets/images/icons/icons8-dice-three-64.png";
// import dice4 from "../assets/images/icons/icons8-dice-four-64.png";
// import dice5 from "../assets/images/icons/icons8-dice-five-64.png";
// import dice6 from "../assets/images/icons/icons8-dice-six-64.png";
import info from "../../assets/images/icons/icons8-info-50.png";

import GameImg from "./GameImg";
// import GameInfo from "./GameInfo";
// import GamePoints from "./GamePoints";
import { GameCategories, HoldPoints, LockPoints } from "../../utils/types";
import { infofields } from "../../utils/helpers";

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

const GameSection = ({
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
    <>
      <div className="game-section">
        {/* GAME IMAGE */}
        <GameImg category={GameCategories.Ones} />
        {/* END GAME IMAGE */}

        <div className="game-pisteet">
          <button
            className={
              selected === "ones"
                ? "selected"
                : locked.ones
                ? "locked"
                : "not-selected"
            }
            onClick={() => {
              handleHoldPoints("ones");
            }}
          >
            {rolls < 3 && !locked.ones
              ? ykkoset(diceValues)
              : Number(points.ones) | 0}
          </button>
        </div>
        <div className="game-ohje">
          {" "}
          <div className="game-ohje-div">
            <div>Ones</div>
            <img
              src={info}
              alt="info"
              height="50%"
              onMouseEnter={() =>
                handleHover(infofields.ones.header, infofields.ones.children)
              }
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </div>
      <div className="game-section">
        <GameImg category={GameCategories.Pair} />
        <div className="game-pisteet">
          <button
            className={
              selected === "pair"
                ? "selected"
                : locked.pair
                ? "locked"
                : "not-selected"
            }
            onClick={() => handleHoldPoints("pair")}
          >
            {points.pair || 0}
          </button>
        </div>
        <div className="game-ohje">
          <div className="game-ohje-div">
            <div>Pair</div>
            <img
              src={info}
              alt="info"
              height="50%"
              onMouseEnter={() =>
                handleHover(infofields.pair.header, infofields.pair.children)
              }
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameSection;
