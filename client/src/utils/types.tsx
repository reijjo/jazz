export type RegisterInfo = {
  username: string;
  email: string;
  passwd: string;
  passwd2: string;
};

export type RegisterFocus = {
  username: boolean;
  email: boolean;
  passwd: boolean;
  passwd2: boolean;
};

export type FormErrors = {
  username: {
    len: string | null;
    valid: string | null;
  };
  email: {
    len: string | null;
    valid: string | null;
  };
  passwd: {
    len: string | null;
    special: string | null;
    capital: string | null;
    num: string | null;
  };
  passwd2: {
    match: string | null;
  };
};

export type LoginInfo = {
  user: string;
  passwd: string;
};

export type InfoMsg = {
  style?: string;
  message?: string | null;
};

export type User = {
  id: string;
  username: string;
  email: string;
  passwd: string;
  verifycode: string;
};

// THE GAME
export type HoldDice = {
  dice1: boolean;
  dice2: boolean;
  dice3: boolean;
  dice4: boolean;
  dice5: boolean;
};

export type HoldPoints = {
  Ones: boolean;
  Twos: boolean;
  Threes: boolean;
  Fours: boolean;
  Fives: boolean;
  Sixes: boolean;
  Empty: boolean;
  Subtotal: boolean;
  Bonus: boolean;
  Pair: boolean;
  Pair2: boolean;
  Same3: boolean;
  Same4: boolean;
  Straight15: boolean;
  Straight26: boolean;
  Fullhouse: boolean;
  Chance: boolean;
  Yatzy: boolean;
};

export type LockPoints = {
  Ones?: number;
  Twos?: number;
  Threes?: number;
  Fours?: number;
  Fives?: number;
  Sixes?: number;
  Empty?: number;
  Subtotal?: number;
  Bonus?: number; // Minor table ends
  Pair?: number;
  Pair2?: number;
  Same3?: number;
  Same4?: number;
  Straight15?: number;
  Straight26?: number;
  Fullhouse?: number;
  Chance?: number;
  Yatzy?: number;
};

export enum GameCategories {
  Ones = "Ones",
  Twos = "Twos",
  Threes = "Threes",
  Fours = "Fours",
  Fives = "Fives",
  Sixes = "Sixes",
  Empty = "",
  Subtotal = "Subtotal",
  Bonus = "Bonus", // Minor table ends
  Pair = "Pair",
  Pair2 = "Pair2",
  Same3 = "Same3",
  Same4 = "Same4",
  Straight15 = "Straight15",
  Straight26 = "Straight26",
  Fullhouse = "Fullhouse",
  Chance = "Chance",
  Yatzy = "Yatzy",
}
