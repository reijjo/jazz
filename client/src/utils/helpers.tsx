import { Dispatch, SetStateAction } from "react";
import { HoldDice, InfoMsg } from "./types";
import { isAxiosError } from "axios";

// Setting info message and cleaning up code
type okResponse = {
  message: string;
  info: string;
};

export const infoMsgFunc = (
  res: okResponse,
  setInfoMessage: Dispatch<SetStateAction<InfoMsg>>
) => {
  setInfoMessage({
    message: res.message,
    style: res.info,
  });
  setTimeout(() => {
    setInfoMessage({
      message: null,
    });
  }, 7000);
};

// Handling errors and also cleaning up some code
export const errorMsgFunc = (
  error: unknown,
  setInfoMessage: Dispatch<SetStateAction<InfoMsg>>,
  style: string
) => {
  if (isAxiosError(error)) {
    setInfoMessage({
      message: error.response?.data?.message,
      style: style,
    });
    setTimeout(() => {
      setInfoMessage({
        message: null,
      });
    }, 7000);
  } else {
    console.log("Weird error", error);
  }
};

// Yatzy information
export const infofields = {
  ones: { header: "Ones", children: "Collect the sum of all ONES rolled." },
  twos: { header: "Twos", children: "Collect the sum of all TWOS rolled." },
  threes: {
    header: "Threes",
    children: "Collect the sum of all THREES rolled.",
  },
  fours: { header: "Fours", children: "Collect the sum of all FOURS rolled." },
  fives: { header: "Fives", children: "Collect the sum of all FIVES rolled." },
  sixes: { header: "Sixes", children: "Collect the sum of all SIXES rolled." },
  subtotal: {
    header: "Subtotal",
    children: "If you get over 63 points you get 50 extra points!",
  },
  bonus: {
    header: "Bonus",
    children: "If you get over 63 points you get 50 extra points!",
  },
  pair: {
    header: "Pair",
    children:
      "Gather two dice showing the same number. Score the sum of those dice.",
  },
  pair2: {
    header: "Pair x 2",
    children: "Collect two sets of dice pairs. Score the sum of all four dice.",
  },
  same3: {
    header: "Same x 3",
    children:
      "Collect three dice showing the same number. Score the sum of those dice.",
  },
  same4: {
    header: "Same x 4",
    children:
      "Collect four dice showing the same number. Score the sum of those dice.",
  },
  straight15: {
    header: "Straight 1 - 5",
    children:
      "Gather a sequence of at least four consecutive dice numbers from 1 to 5.",
  },
  straight26: {
    header: "Straight 2 - 6",
    children:
      "Collect a sequence of all five consecutive dice numbers from 2 to 6.",
  },
  fullhouse: {
    header: "Full House",
    children:
      "Get three dice of one number and two dice of another. Score the sum of all dice.",
  },
  chance: {
    header: "Chance",
    children: "Score the sum of all rolled dice, regardless of their values.",
  },
  yatzy: {
    header: "Yatzy",
    children: "Get all five dice showing the same number. ",
  },
};

export const resetHoldDice = (
  setHoldDice: Dispatch<SetStateAction<HoldDice>>
) => {
  setHoldDice({
    dice1: false,
    dice2: false,
    dice3: false,
    dice4: false,
    dice5: false,
  });
};

// Minor table
export const ykkoset = (diceValues: { [key: string]: number }) =>
  Object.values(diceValues)
    .filter((dice) => dice === 1)
    .reduce((acc, value) => acc + value, 0);

export const kakkoset = (diceValues: { [key: string]: number }) =>
  Object.values(diceValues)
    .filter((dice) => dice === 2)
    .reduce((acc, value) => acc + value, 0);

export const kolmoset = (diceValues: { [key: string]: number }) =>
  Object.values(diceValues)
    .filter((dice) => dice === 3)
    .reduce((acc, value) => acc + value, 0);

export const neloset = (diceValues: { [key: string]: number }) =>
  Object.values(diceValues)
    .filter((dice) => dice === 4)
    .reduce((acc, value) => acc + value, 0);

export const vitoset = (diceValues: { [key: string]: number }) =>
  Object.values(diceValues)
    .filter((dice) => dice === 5)
    .reduce((acc, value) => acc + value, 0);

export const kutoset = (diceValues: { [key: string]: number }) =>
  Object.values(diceValues)
    .filter((dice) => dice === 6)
    .reduce((acc, value) => acc + value, 0);

// Major table
export const chance = (diceValues: { [key: string]: number }) =>
  Object.values(diceValues).reduce((sum, value) => sum + (value || 0), 0);
