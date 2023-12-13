import dice1 from "../assets/images/icons/icons8-dice-one-64.png";
import dice2 from "../assets/images/icons/icons8-dice-two-64.png";
import dice3 from "../assets/images/icons/icons8-dice-three-64.png";
import dice4 from "../assets/images/icons/icons8-dice-four-64.png";
import dice5 from "../assets/images/icons/icons8-dice-five-64.png";
import dice6 from "../assets/images/icons/icons8-dice-six-64.png";
import info from "../assets/images/icons/icons8-info-50.png";
import WhatToDo from "../components/WhatToDo";

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
    ones: 0 || undefined,
    twos: 0 || undefined,
    threes: 0 || undefined,
    fours: 0 || undefined,
    fives: 0 || undefined,
    sixes: 0 || undefined,
    bonus: 0 || undefined, // Minor table ends
    pair: 0 || undefined,
    pair2: 0 || undefined,
    same3: 0 || undefined,
    same4: 0 || undefined,
    straight15: 0 || undefined,
    straight26: 0 || undefined,
    fullhouse: 0 || undefined,
    chance: 0 || undefined,
    yatzy: 0 || undefined,
  });

  const [selected, setSelected] = useState<keyof HoldPoints | null>(null);
  const [locked, setLocked] = useState<HoldPoints>({
    ones: false,
    twos: false,
    threes: false,
    fours: false,
    fives: false,
    sixes: false, // Minor table ends
    pair: false,
    pair2: false,
    same3: false,
    same4: false,
    straight15: false,
    straight26: false,
    fullhouse: false,
    chance: false,
    yatzy: false,
  });

  const [rolls, setRolls] = useState<number>(3);
  const [gameOver, setGameOver] = useState(false);

  const totalPoints = Object.values(points).reduce(
    (sum, value) => sum + (value || 0),
    0
  );

  const subtotal =
    (points.ones || 0) +
    (points.twos || 0) +
    (points.threes || 0) +
    (points.fours || 0) +
    (points.fives || 0) +
    (points.sixes || 0);

  // When every slot is locked
  useEffect(() => {
    if (Object.values(locked).every((value) => value === true)) {
      console.log("ALL DONE!");
      setGameOver(true);
    }
  }, [locked]);

  // Check for bonus
  useEffect(() => {
    if (subtotal >= 63) {
      setPoints((prevPoints) => ({
        ...prevPoints,
        bonus: 50,
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
      const ykkoset = Object.values(diceValues)
        .filter((dice) => dice === 1)
        .reduce((acc, value) => acc + value, 0);

      const kakkoset = Object.values(diceValues)
        .filter((dice) => dice === 2)
        .reduce((acc, value) => acc + value, 0);

      const kolmoset = Object.values(diceValues)
        .filter((dice) => dice === 3)
        .reduce((acc, value) => acc + value, 0);

      const neloset = Object.values(diceValues)
        .filter((dice) => dice === 4)
        .reduce((acc, value) => acc + value, 0);

      const vitoset = Object.values(diceValues)
        .filter((dice) => dice === 5)
        .reduce((acc, value) => acc + value, 0);

      const kutoset = Object.values(diceValues)
        .filter((dice) => dice === 6)
        .reduce((acc, value) => acc + value, 0);

      const chance = Object.values(diceValues).reduce(
        (sum, value) => sum + value,
        0
      );

      if (category === "ones") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: ykkoset,
        }));
      } else if (category === "twos") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: kakkoset,
        }));
      } else if (category === "threes") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: kolmoset,
        }));
      } else if (category === "fours") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: neloset,
        }));
      } else if (category === "fives") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: vitoset,
        }));
      } else if (category === "sixes") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: kutoset,
        }));
      } else if (category === "chance") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: chance,
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

        {/* Ones & Pair */}
        <div className="game-row">
          <div className="game-section">
            <div className="game-kuva">
              <div className="game-kuva-div">
                <img src={dice1} alt="dice 1" height="100%" width="100%" />
              </div>
            </div>
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
                    handleHover(
                      infofields.ones.header,
                      infofields.ones.children
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
                <img src={dice2} alt="dice 2" height="75%" width="50%" />
                <img src={dice2} alt="dice 2" height="75%" width="50%" />
              </div>
            </div>
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
                    handleHover(
                      infofields.pair.header,
                      infofields.pair.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Twos & Pair x2 */}
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
                  selected === "twos"
                    ? "selected"
                    : locked.twos
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("twos")}
              >
                {rolls < 3 && !locked.twos
                  ? kakkoset(diceValues)
                  : Number(points.twos) | 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Twos</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.twos.header,
                      infofields.twos.children
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
                  selected === "pair2"
                    ? "selected"
                    : locked.pair2
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("pair2")}
              >
                {points.pair2 || 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Pair x2</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.pair2.header,
                      infofields.pair2.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Threes & Same x3 */}
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
                  selected === "threes"
                    ? "selected"
                    : locked.threes
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("threes")}
              >
                {rolls < 3 && !locked.threes
                  ? kolmoset(diceValues)
                  : Number(points.threes) | 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Threes</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.threes.header,
                      infofields.threes.children
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
                  selected === "same3"
                    ? "selected"
                    : locked.same3
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("same3")}
              >
                {points.same3 || 0}
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
                      infofields.same3.header,
                      infofields.same3.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fours & Same x4 */}
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
                  selected === "fours"
                    ? "selected"
                    : locked.fours
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("fours")}
              >
                {rolls < 3 && !locked.fours
                  ? neloset(diceValues)
                  : Number(points.fours) | 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Fours</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.fours.header,
                      infofields.fours.children
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
                  selected === "same4"
                    ? "selected"
                    : locked.same4
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("same4")}
              >
                {points.same4 || 0}
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
                      infofields.same4.header,
                      infofields.same4.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fives & Small straight */}
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
                  selected === "fives"
                    ? "selected"
                    : locked.fives
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("fives")}
              >
                {rolls < 3 && !locked.fives
                  ? vitoset(diceValues)
                  : Number(points.fives) | 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Fives</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.fives.header,
                      infofields.fives.children
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
                  selected === "straight15"
                    ? "selected"
                    : locked.straight15
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("straight15")}
              >
                {points.straight15 || 0}
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
                      infofields.straight15.header,
                      infofields.straight15.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sixes & big straight */}
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
                  selected === "sixes"
                    ? "selected"
                    : locked.sixes
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("sixes")}
              >
                {rolls < 3 && !locked.sixes
                  ? kutoset(diceValues)
                  : Number(points.sixes) | 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Sixes</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.sixes.header,
                      infofields.sixes.children
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
                  selected === "straight26"
                    ? "selected"
                    : locked.straight26
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("straight26")}
              >
                {points.straight26 || 0}
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
                      infofields.straight26.header,
                      infofields.straight26.children
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
                  selected === "fullhouse"
                    ? "selected"
                    : locked.fullhouse
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("fullhouse")}
              >
                {points.fullhouse || 0}
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
                      infofields.fullhouse.header,
                      infofields.fullhouse.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Valisumma & Chance */}
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
                      infofields.subtotal.header,
                      infofields.subtotal.children
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
                  selected === "chance"
                    ? "selected"
                    : locked.chance
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("chance")}
              >
                {rolls < 3 && !locked.chance
                  ? chance(diceValues)
                  : Number(points.chance) | 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Chance</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.chance.header,
                      infofields.chance.children
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bonus & Yatzy */}
        <div className="game-row">
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">Bonus</div>
            </div>
            <div className="game-pisteet">
              <button className="not-selected no-pointer">
                {points.bonus || 0}
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
                      infofields.bonus.header,
                      infofields.bonus.children
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
                  selected === "yatzy"
                    ? "selected"
                    : locked.yatzy
                    ? "locked"
                    : "not-selected"
                }
                onClick={() => handleHoldPoints("yatzy")}
              >
                {points.yatzy || 0}
              </button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Yatzy</div>
                <img
                  src={info}
                  alt="info"
                  height="50%"
                  onMouseEnter={() =>
                    handleHover(
                      infofields.yatzy.header,
                      infofields.yatzy.children
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
