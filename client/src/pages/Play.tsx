import WhatToDo from "../components/WhatToDo";
import GameRow from "../components/game/GameRow";
import cancel from "../assets/images/icons/icons8-cancel-96.png";

import { useEffect, useState } from "react";

import {
  GameCategories,
  HoldDice,
  HoldPoints,
  LockPoints,
} from "../utils/types";
import {
  resetHoldDice,
  ykkoset,
  kakkoset,
  kolmoset,
  neloset,
  vitoset,
  kutoset,
  pair,
  chance,
  pair2,
  same3,
  same4,
  yatzy,
  fullhouse,
  straight15,
  straight26,
  imgForDice,
} from "../utils/helpers";
import { useNavigate } from "react-router-dom";

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

  // const [randomValues, setRandomValues] = useState<{
  //   [key: number]: string;
  // } | null>(null);

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
    Subtotal: 0,
    Bonus: 0, // Minor table ends
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
    Empty: true,
    Subtotal: true,
    Bonus: true,
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
  const [diceRolling, setDiceRolling] = useState(false);

  const totalPoints = Object.values(points).reduce(
    (sum, value) => sum + (value || 0),
    0
  );

  const navigate = useNavigate();

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

  // Check for Yatzy
  useEffect(() => {
    if (points.Yatzy === 50 && rolls < 3) {
      console.log("on jo yatzy");
    }
  }, [points.Yatzy, rolls]);

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
    setDiceRolling(true);

    if (rolls > 0 && !diceRolling) {
      const newValues = { ...diceValues };
      Object.keys(newValues).forEach((diceId) => {
        if (!holdDice[diceId as keyof HoldDice]) {
          // newValues[diceId as keyof HoldDice] =
          //   Math.floor(Math.random() * 6) + 1;
          newValues[diceId as keyof HoldDice] =
            Math.floor(Math.random() * 3) + 1;
        }
      });

      setRolls(rolls - 1);
      setTimeout(() => {
        setDiceRolling(false);
        setDiceValues(newValues);
      }, 300);
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
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Ones: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: ykkoset(diceValues),
          }));
        }
      } else if (category === "Twos") {
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Twos: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: kakkoset(diceValues),
          }));
        }
      } else if (category === "Threes") {
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Threes: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: kolmoset(diceValues),
          }));
        }
      } else if (category === "Fours") {
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Fours: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: neloset(diceValues),
          }));
        }
      } else if (category === "Fives") {
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Fives: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: vitoset(diceValues),
          }));
        }
      } else if (category === "Sixes") {
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Sixes: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: kutoset(diceValues),
          }));
        }
        // Major table
      } else if (category === "Pair") {
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Pair: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: pair(diceValues),
          }));
        }
      } else if (category === "Pair2") {
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Pair2: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: pair2(diceValues),
          }));
        }
      } else if (category === "Same3") {
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Same3: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: same3(diceValues),
          }));
        }
      } else if (category === "Same4") {
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Same4: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: same4(diceValues),
          }));
        }
      } else if (category === "Straight15") {
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Straight15: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: straight15(diceValues),
          }));
        }
      } else if (category === "Straight26") {
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Straight26: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: straight26(diceValues),
          }));
        }
      } else if (category === "Fullhouse") {
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Fullhouse: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: fullhouse(diceValues),
          }));
        }
      } else if (category === "Chance") {
        if (locked.Yatzy && points.Yatzy === 50 && yatzy(diceValues)) {
          setPoints((prevpoints) => ({
            ...prevpoints,
            Chance: 50,
          }));
        } else {
          setPoints((prevpoints) => ({
            ...prevpoints,
            [category]: chance(diceValues),
          }));
        }
      } else if (category === "Yatzy") {
        setPoints((prevpoints) => ({
          ...prevpoints,
          [category]: yatzy(diceValues),
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

  console.log("locked", locked);

  // console.log("points", points);
  // console.log("sbutota", subtotal);

  // console.log(
  //   "points sum",
  //   Object.values(points).reduce((sum, value) => sum + (value || 0), 0)
  // );

  // Return
  return (
    <section id="play">
      {isHovered && hoverInfos && (
        <WhatToDo header={hoverInfos.header} children={hoverInfos.children} />
      )}
      <div className="the-game">
        <div className="game-header">
          <a onClick={() => navigate("/")}>
            <img src={cancel} alt="cancel" title="go back" width="100%" />
          </a>
          <h2>
            <span>Testiukko</span> {totalPoints} points
          </h2>
        </div>

        {/* Ones & Pair */}
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
          category1={GameCategories.Ones}
          category2={GameCategories.Pair}
          subtotal={subtotal}
        />

        {/* Twos & Pair x2 */}
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
          category1={GameCategories.Twos}
          category2={GameCategories.Pair2}
          subtotal={subtotal}
        />

        {/* Threes & Same x3 */}
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
          category1={GameCategories.Threes}
          category2={GameCategories.Same3}
          subtotal={subtotal}
        />

        {/* Fours & Same x4 */}
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
          category1={GameCategories.Fours}
          category2={GameCategories.Same4}
          subtotal={subtotal}
        />

        {/* Fives & Small straight */}
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
          category1={GameCategories.Fives}
          category2={GameCategories.Straight15}
          subtotal={subtotal}
        />

        {/* Sixes & big straight */}
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
          category1={GameCategories.Sixes}
          category2={GameCategories.Straight26}
          subtotal={subtotal}
        />

        {/* Empty & Full House */}
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
          category1={GameCategories.Empty}
          category2={GameCategories.Fullhouse}
          subtotal={subtotal}
        />

        {/* Valisumma & Chance */}
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
          category1={GameCategories.Subtotal}
          category2={GameCategories.Chance}
          subtotal={subtotal}
        />

        {/* Bonus & Yatzy */}
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
          category1={GameCategories.Bonus}
          category2={GameCategories.Yatzy}
          subtotal={subtotal}
        />

        {/* Dices */}
        <div className="dices-and-button">
          <div className="game-dices">
            {Object.keys(holdDice).map((diceId) => (
              <div className="dice" key={diceId}>
                <button
                  id={diceId}
                  className={`
									${holdDice[diceId as keyof HoldDice] ? "dice-selected" : ""}
									${!holdDice[diceId as keyof HoldDice] && diceRolling ? "dice-rolling" : ""}
									`}
                  type="button"
                  onClick={() => handleDiceClick(diceId as keyof HoldDice)}
                  disabled={rolls === 3 || diceRolling}
                >
                  {/* {!diceRolling || holdDice[diceId as keyof HoldDice]
                    ? diceValues[diceId as keyof HoldDice]
                    : Math.floor(Math.random() * 6) + 1} */}
                  <img
                    className="dice-img"
                    src={
                      !diceRolling || holdDice[diceId as keyof HoldDice]
                        ? imgForDice(diceValues[diceId as keyof HoldDice])
                        : imgForDice(Math.floor(Math.random() * 6) + 1)
                    }
                    alt="dice"
                  />
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
                  disabled={gameOver || diceRolling}
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
                    disabled={rolls === 0 || diceRolling}
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
                    onClick={handleDiceRoll}
                  >
                    {rolls}
                  </h5>
                </div>
                <button
                  className="my-btn-outline extra-outline short-button"
                  style={{ backgroundColor: "var(--PRIMARY)" }}
                  disabled={rolls === 3 || selected === null || diceRolling}
                  onClick={() => handleLockPoints(selected as keyof LockPoints)}
                >
                  <h3>Set</h3>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Play;
