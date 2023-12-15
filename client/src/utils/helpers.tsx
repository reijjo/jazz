import { Dispatch, SetStateAction } from "react";
import { GameCategories, HoldDice, InfoMsg } from "./types";
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
  Ones: { header: "Ones", children: "Collect the sum of all ONES rolled." },
  Twos: { header: "Twos", children: "Collect the sum of all TWOS rolled." },
  Threes: {
    header: "Threes",
    children: "Collect the sum of all THREES rolled.",
  },
  Fours: { header: "Fours", children: "Collect the sum of all FOURS rolled." },
  Fives: { header: "Fives", children: "Collect the sum of all FIVES rolled." },
  Sixes: { header: "Sixes", children: "Collect the sum of all SIXES rolled." },
  Subtotal: {
    header: "Subtotal",
    children: "If you get over 63 points you get 50 extra points!",
  },
  Bonus: {
    header: "Bonus",
    children: "If you get over 63 points you get 50 extra points!",
  },
  Pair: {
    header: "Pair",
    children:
      "Gather two dice showing the same number. Score the sum of those dice.",
  },
  Pair2: {
    header: "Pair x 2",
    children: "Collect two sets of dice pairs. Score the sum of all four dice.",
  },
  Same3: {
    header: "Same x 3",
    children:
      "Collect three dice showing the same number. Score the sum of those dice.",
  },
  Same4: {
    header: "Same x 4",
    children:
      "Collect four dice showing the same number. Score the sum of those dice.",
  },
  Straight15: {
    header: "Straight 1 - 5",
    children:
      "Gather a sequence of at least four consecutive dice numbers from 1 to 5.",
  },
  Straight26: {
    header: "Straight 2 - 6",
    children:
      "Collect a sequence of all five consecutive dice numbers from 2 to 6.",
  },
  Fullhouse: {
    header: "Full House",
    children:
      "Get three dice of one number and two dice of another. Score the sum of all dice.",
  },
  Chance: {
    header: "Chance",
    children: "Score the sum of all rolled dice, regardless of their values.",
  },
  Yatzy: {
    header: "Yatzy",
    children: "Get all five dice showing the same number. ",
  },
};

export const getInfoFields = (category: GameCategories) => {
  switch (category) {
    case GameCategories.Ones:
      return infofields.Ones;
    case GameCategories.Twos:
      return infofields.Twos;
    case GameCategories.Threes:
      return infofields.Threes;
    case GameCategories.Fours:
      return infofields.Fours;
    case GameCategories.Fives:
      return infofields.Fives;
    case GameCategories.Sixes:
      return infofields.Sixes;
    case GameCategories.Subtotal:
      return infofields.Subtotal;
    case GameCategories.Bonus:
      return infofields.Bonus;
    case GameCategories.Pair:
      return infofields.Pair;
    case GameCategories.Pair2:
      return infofields.Pair2;
    case GameCategories.Same3:
      return infofields.Same3;
    case GameCategories.Same4:
      return infofields.Same4;
    case GameCategories.Straight15:
      return infofields.Straight15;
    case GameCategories.Straight26:
      return infofields.Straight26;
    case GameCategories.Fullhouse:
      return infofields.Fullhouse;
    case GameCategories.Chance:
      return infofields.Chance;
    case GameCategories.Yatzy:
      return infofields.Yatzy;
    default:
      return { header: "", children: "" };
  }
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
