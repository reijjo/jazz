import dice1 from "../assets/images/icons/icons8-dice-one-64.png";
import dice2 from "../assets/images/icons/icons8-dice-two-64.png";
import dice3 from "../assets/images/icons/icons8-dice-three-64.png";
import dice4 from "../assets/images/icons/icons8-dice-four-64.png";
import dice5 from "../assets/images/icons/icons8-dice-five-64.png";
import dice6 from "../assets/images/icons/icons8-dice-six-64.png";
import info from "../assets/images/icons/icons8-info-50.png";
import WhatToDo from "../components/WhatToDo";
import GameRow from "../components/game/GameRow";

import { useEffect, useState } from "react";

import { HoldDice, HoldPoints, LockPoints } from "../utils/types";
import {
  infofields,
  resetHoldDice,
  ykkoset,
  kakkoset,
  kolmoset,
  neloset,
  vitoset,
  kutoset,
  chance,
} from "../utils/helpers";

const Play = () => {
  const [holdDice, setHoldDice] = useState<HoldDice>({
    dice1: false,
    dice2: false,
    dice3: false,
    dice4: false,
    dice5: false,
  });

  const [diceValues, setDiceValues] = useState({
    dice1: Math.floor(Math.random() * 6) + 1,
    dice2: Math.floor(Math.random() * 6) + 1,
    dice3: Math.floor(Math.random() * 6) + 1,
    dice4: Math.floor(Math.random() * 6) + 1,
    dice5: Math.floor(Math.random() * 6) + 1,
  });

  // For instructions
  const [isHovered, setIsHovered] = useState(false);
  const [hoverInfos, setHoverInfos] = useState({
    header: "",
    children: "",
  });

  const [points, setPoints] = useState<LockPoints>({
    Ones: 0 || undefined,
    Twos: 0 || undefined,
    Threes: 0 || undefined,
    Fours: 0 || undefined,
    Fives: 0 || undefined,
    Sixes: 0 || undefined,
    Bonus: 0 || undefined, // Minor table ends
    Pair: 0 || undefined,
    Pair2: 0 || undefined,
    Same3: 0 || undefined,
    Same4: 0 || undefined,
    Straight15: 0 || undefined,
    Straight26: 0 || undefined,
    Fullhouse: 0 || undefined,
    Chance: 0 || undefined,
    Yatzy: 0 || undefined,
  });

  const [selected, setSelected] = useState<keyof HoldPoints | null>(null);
  const [locked, setLocked] = useState<HoldPoints>({
    Ones: false,
    Twos: false,
    Threes: false,
    Fours: false,
    Fives: false,
    Sixes: false, // Minor table ends
    Subtotal: false,
    Bonus: false,
    Pair: false,
    Pair2: false,
    Same3: false,
    Same4: false,
    Straight15: false,
    Straight26: false,
    Fullhouse: false,
    Chance: false,
    Yatzy: false,
  });

  const [rolls, setRolls] = useState<number>(3);
  const [gameOver, setGameOver] = useState(false);

  const totalPoints = Object.values(points).reduce(
    (sum, value) => sum + (value || 0),
    0
  );

  const subtotal =
    (points.Ones || 0) +
    (points.Twos || 0) +
    (points.Threes || 0) +
    (points.Fours || 0) +
    (points.Fives || 0) +
    (points.Sixes || 0);

  // When every slot is locked
  useEffect(() => {
    if (Object.values(locked).every((value) => value === true)) {
      console.log("ALL DONE!");
      setGameOver(true);
    }
  }, [locked]);

  // Check for Bonus
  useEffect(() => {
    if (subtotal >= 63) {
      setPoints((prevPoints) => ({
        ...prevPoints,
        Bonus: 50,
      }));
    }
  }, [subtotal]);

  const handleHover = (header: string, children: string) => {
    setHoverInfos({ header: header, children: children });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // To hold the dices
  const handleDiceClick = (diceId: keyof HoldDice) => {
    console.log("diceId", diceId);

    setHoldDice((prevDices) => {
      const updatedHolds = { ...prevDices };
      updatedHolds[diceId] = !updatedHolds[diceId];
      return updatedHolds;
    });
  };

  // To roll the dices
  const handleDiceRoll = () => {
    // Just roll the unheld dices
    if (rolls > 0) {
      const newValues = { ...diceValues };
      Object.keys(newValues).forEach((diceId) => {
        if (!holdDice[diceId as keyof HoldDice]) {
          newValues[diceId as keyof HoldDice] =
            Math.floor(Math.random() * 6) + 1;
        }
      });

      setDiceValues(newValues);

      setRolls(rolls - 1);
    }
  };

  // For holding points
  const handleHoldPoints = (category: keyof HoldPoints) => {
    if (rolls < 3 && points[category] === undefined) {
      if (selected === category) {
        setSelected(null);
      } else {
        setSelected(category);
      }
    }
  };

  const handleLockPoints = (category: keyof LockPoints) => {
    if (selected && points[category] === undefined) {
      if (category === "Ones") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: ykkoset(diceValues),
        }));
      } else if (category === "Twos") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: kakkoset(diceValues),
        }));
      } else if (category === "Threes") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: kolmoset(diceValues),
        }));
      } else if (category === "Fours") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: neloset(diceValues),
        }));
      } else if (category === "Fives") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: vitoset(diceValues),
        }));
      } else if (category === "Sixes") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: kutoset(diceValues),
        }));
      } else if (category === "Chance") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: chance(diceValues),
        }));
      } else {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: points[category] || 0,
        }));
      }

      setSelected(null);

      setLocked((prevLocked) => ({
        ...prevLocked,
        [category]: true,
      }));

      resetHoldDice(setHoldDice);

      if (!gameOver) {
        setRolls(3);
      }
    }
  };

  console.log(
    "every",
    Object.values(locked).every((l) => l)
  );

  console.log("points", points);
  console.log("sbutota", subtotal);

  console.log(
    "points sum",
    Object.values(points).reduce((sum, value) => sum + (value || 0), 0)
  );

  // Return
  return (
    <section id="play">
      {isHovered && hoverInfos && (
        <WhatToDo header={hoverInfos.header} children={hoverInfos.children} />
      )}
      <div className="the-game">
        <div className="game-header">
          <h2>Testiukko {totalPoints} points</h2>
        </div>

        {/* Ones & PaiPair */}
        <GameRow
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

        {/* TwTwos & PaiPair x2 */}
        <div className="game-row">
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">
                <img src={dice2} alt="dice 2" height="100%" width="100%" />
              </div>
            </div>
            <div className="game-pisteet">
              <button
                className={
                  selected === "Twos"
                    ? "selected"
                    : locked.Twos
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("Twos")}
              >
                {rolls < 3 && !locked.Twos
                  ? kakkoset(diceValues)
                  : Number(points.Twos) | 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>TwTwos</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Twos.header,
                      infofields.Twos.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">
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
              </div>
            </div>
            <div className="game-pisteet">
              <button
                className={
                  selected === "Pair2"
                    ? "selected"
                    : locked.Pair2
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("Pair2")}
              >
                {points.Pair2 || 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>PaiPair x2</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Pair2.header,
                      infofields.Pair2.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ThreThrees & Same x3 */}
        <div className="game-row">
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">
                <img src={dice3} alt="dice 3" height="100%" width="100%" />
              </div>
            </div>
            <div className="game-pisteet">
              <button
                className={
                  selected === "Threes"
                    ? "selected"
                    : locked.Threes
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("Threes")}
              >
                {rolls < 3 && !locked.Threes
                  ? kolmoset(diceValues)
                  : Number(points.Threes) | 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>ThreThrees</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Threes.header,
                      infofields.Threes.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">
                <div className="too-many-dices">
                  <div>
                    <img src={dice3} alt="dice 3" height="24px" width="100%" />
                    <img src={dice3} alt="dice 3" height="24px" width="100%" />
                    <img src={dice3} alt="dice 3" height="24px" width="100%" />
                  </div>
                </div>
              </div>
            </div>
            <div className="game-pisteet">
              <button
                className={
                  selected === "Same3"
                    ? "selected"
                    : locked.Same3
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("Same3")}
              >
                {points.Same3 || 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Same x3</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Same3.header,
                      infofields.Same3.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FoursFours & Same x4 */}
        <div className="game-row">
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">
                <img src={dice4} alt="dice 4" height="100%" width="100%" />
              </div>
            </div>
            <div className="game-pisteet">
              <button
                className={
                  selected === "Fours"
                    ? "selected"
                    : locked.Fours
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("Fours")}
              >
                {rolls < 3 && !locked.Fours
                  ? neloset(diceValues)
                  : Number(points.Fours) | 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>FoursFours</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Fours.header,
                      infofields.Fours.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">
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
              </div>
            </div>
            <div className="game-pisteet">
              <button
                className={
                  selected === "Same4"
                    ? "selected"
                    : locked.Same4
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("Same4")}
              >
                {points.Same4 || 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Same x4</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Same4.header,
                      infofields.Same4.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FiveFives & Small straight */}
        <div className="game-row">
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">
                <img src={dice5} alt="dice 5" height="100%" width="100%" />
              </div>
            </div>
            <div className="game-pisteet">
              <button
                className={
                  selected === "Fives"
                    ? "selected"
                    : locked.Fives
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("Fives")}
              >
                {rolls < 3 && !locked.Fives
                  ? vitoset(diceValues)
                  : Number(points.Fives) | 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>FiveFives</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Fives.header,
                      infofields.Fives.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">
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
              </div>
            </div>
            <div className="game-pisteet">
              <button
                className={
                  selected === "Straight15"
                    ? "selected"
                    : locked.Straight15
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("Straight15")}
              >
                {points.Straight15 || 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Straight 1-5</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Straight15.header,
                      infofields.Straight15.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SixSixes & big straight */}
        <div className="game-row">
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">
                <img src={dice6} alt="dice 6" height="100%" width="100%" />
              </div>
            </div>
            <div className="game-pisteet">
              <button
                className={
                  selected === "Sixes"
                    ? "selected"
                    : locked.Sixes
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("Sixes")}
              >
                {rolls < 3 && !locked.Sixes
                  ? kutoset(diceValues)
                  : Number(points.Sixes) | 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>SixSixes</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Sixes.header,
                      infofields.Sixes.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">
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
              </div>
            </div>
            <div className="game-pisteet">
              <button
                className={
                  selected === "Straight26"
                    ? "selected"
                    : locked.Straight26
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("Straight26")}
              >
                {points.Straight26 || 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Straight 2-6</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Straight26.header,
                      infofields.Straight26.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Empty & Full House */}
        <div className="game-row">
          <div className="game-section"></div>
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">
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
              </div>
            </div>
            <div className="game-pisteet">
              <button
                className={
                  selected === "Fullhouse"
                    ? "selected"
                    : locked.Fullhouse
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("Fullhouse")}
              >
                {points.Fullhouse || 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Full House</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Fullhouse.header,
                      infofields.Fullhouse.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Valisumma & ChanChance */}
        <div className="game-row">
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">=</div>
            </div>
            <div className="game-pisteet">
              <button className="not-selected no-pointer">{subtotal}</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Subtotal</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Subtotal.header,
                      infofields.Subtotal.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">?</div>
            </div>
            <div className="game-pisteet">
              <button
                className={
                  selected === "Chance"
                    ? "selected"
                    : locked.Chance
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("Chance")}
              >
                {rolls < 3 && !locked.Chance
                  ? chance(diceValues)
                  : Number(points.Chance) | 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>ChanChance</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Chance.header,
                      infofields.Chance.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BonusBonus & YaYatzy */}
        <div className="game-row">
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">BonusBonus</div>
            </div>
            <div className="game-pisteet">
              <button className="not-selected no-pointer">
                {points.Bonus || 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>+50 points</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Bonus.header,
                      infofields.Bonus.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">
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
              </div>
            </div>
            <div className="game-pisteet">
              <button
                className={
                  selected === "Yatzy"
                    ? "selected"
                    : locked.Yatzy
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("Yatzy")}
              >
                {points.Yatzy || 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>YaYatzy</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.Yatzy.header,
                      infofields.Yatzy.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dices */}
        <div className="game-dices">
          {Object.keys(holdDice).map((diceId) => (
            <div className="dice" key={diceId}>
              <button
                id={diceId}
                className={
                  holdDice[diceId as keyof HoldDice] ? "dice-selected" : ""
                }
                type="button"
                onClick={() => handleDiceClick(diceId as keyof HoldDice)}
                disabled={rolls === 3}
              >
                {diceValues[diceId as keyof HoldDice]}
              </button>
            </div>
          ))}
        </div>

        {/* Roll button */}
        <div className="game-button">
          {rolls === 3 ? (
            <div className="long-button-div">
              <button
                className="my-btn-outline extra-outline long-button"
                type="button"
                onClick={handleDiceRoll}
                disabled={gameOver}
              >
                <h3>Roll</h3>
                <h4
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "var(--TEXT)",
                    border: "1px solid var(--TEXT)",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "var(--PRIMARY3)", // Set the background color
                  }}
                >
                  {rolls}
                </h4>
              </button>
            </div>
          ) : (
            <div className="short-button-div">
              <div className="short-roll">
                <button
                  className="my-btn-outline extra-outline short-button1"
                  onClick={handleDiceRoll}
                  disabled={rolls === 0}
                >
                  <h3>Roll</h3>
                </button>
                <h5
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "var(--TEXT)",
                    border: "1px solid var(--TEXT)",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "var(--PRIMARY3)", // Set the background color
                  }}
                >
                  {rolls}
                </h5>
              </div>
              <button
                className="my-btn-outline extra-outline short-button"
                style={{ backgroundColor: "var(--PRIMARY)" }}
                disabled={rolls === 3 || selected === null}
                onClick={() => handleLockPoints(selected as keyof LockPoints)}
              >
                <h3>Set</h3>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Play;
