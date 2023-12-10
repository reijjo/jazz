import dice1 from "../assets/images/icons/icons8-dice-one-64.png";
import dice2 from "../assets/images/icons/icons8-dice-two-64.png";
import dice3 from "../assets/images/icons/icons8-dice-three-64.png";
import dice4 from "../assets/images/icons/icons8-dice-four-64.png";
import dice5 from "../assets/images/icons/icons8-dice-five-64.png";
import dice6 from "../assets/images/icons/icons8-dice-six-64.png";
import info from "../assets/images/icons/icons8-info-50.png";

import { useState } from "react";

import { HoldDice } from "../utils/types";

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
    const newValues = { ...diceValues };
    Object.keys(newValues).forEach((diceId) => {
      if (!holdDice[diceId as keyof HoldDice]) {
        newValues[diceId as keyof HoldDice] = Math.floor(Math.random() * 6) + 1;
      }
    });

    setDiceValues(newValues);
  };

  // Return
  return (
    <section id="play">
      <div className="the-game">
        <div className="game-header">
          <h2>nimi points</h2>
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Ones</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              <div className="game-ohje-div">
                <div>Pair</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Twos</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Pair x2</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Threes</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Same x3</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Fours</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Same x4</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Fives</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Straight 1-5</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Sixes</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Straight 2-6</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Full House</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Subtotal</div>
                <img src={info} alt="info" height="50%" />
              </div>
            </div>
          </div>
          <div className="game-section">
            <div className="game-kuva">
              {" "}
              <div className="game-kuva-div">?</div>
            </div>
            <div className="game-pisteet">
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Chance</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>+35 points</div>
                <img src={info} alt="info" height="50%" />
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
              <button>0</button>
            </div>
            <div className="game-ohje">
              {" "}
              <div className="game-ohje-div">
                <div>Yatzy</div>
                <img src={info} alt="info" height="50%" />
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
              >
                {diceValues[diceId as keyof HoldDice]}
              </button>
            </div>
          ))}
          {/* <div className="dice">
            <button id="dice1" type="button" onClick={handleDiceClick}>
              ...
            </button>
          </div>
          <div className="dice">
            <button
              id="dice2"
              type="button"
              onClick={() => console.log("dice clicked")}
            >
              2
            </button>
          </div>
          <div className="dice">
            <button
              id="dice3"
              type="button"
              onClick={() => console.log("dice clicked")}
            >
              3
            </button>
          </div>
          <div className="dice">
            <button
              id="dice4"
              type="button"
              onClick={() => console.log("dice clicked")}
            >
              4
            </button>
          </div>
          <div className="dice">
            <button
              id="dice5"
              type="button"
              onClick={() => console.log("dice clicked")}
            >
              5
            </button>
          </div> */}
        </div>

        {/* Roll button */}
        <div className="game-button">
          <button
            className="my-btn-outline extra-outline"
            type="button"
            onClick={handleDiceRoll}
          >
            <h3>Roll</h3>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Play;
