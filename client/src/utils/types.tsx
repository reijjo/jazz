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
  ones: boolean;
  twos: boolean;
  threes: boolean;
  fours: boolean;
  fives: boolean;
  sixes: boolean;
  pair: boolean;
  pair2: boolean;
  same3: boolean;
  same4: boolean;
  straight15: boolean;
  straight26: boolean;
  fullhouse: boolean;
  chance: boolean;
  yatzy: boolean;
};

export type LockPoints = {
  ones?: number;
  twos?: number;
  threes?: number;
  fours?: number;
  fives?: number;
  sixes?: number;
  bonus?: number; // Minor table ends
  pair?: number;
  pair2?: number;
  same3?: number;
  same4?: number;
  straight15?: number;
  straight26?: number;
  fullhouse?: number;
  chance?: number;
  yatzy?: number;
};

export enum GameCategories {
  Ones = "ones",
  Twos = "twos",
  Threes = "threes",
  Fours = "fours",
  Fives = "fives",
  Sixes = "sixes",
  Bonus = "bonus", // Minor table ends
  Pair = "pair",
  Pair2 = "pair2",
  Same3 = "same3",
  Same4 = "same4",
  Straight15 = "straight15",
  Straight16 = "straight26",
  Fullhouse = "fullhouse",
  Chance = "chance",
  Yatzy = "yatzy",
}
