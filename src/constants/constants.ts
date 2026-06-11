// Dice
export const NUMBER_OF_DICE: number = 16;

export const REQUIRED_TOP_WORDS: number = 4;

// Clock
export const SECONDS_IN_A_MINUTE: number = 60;
export const MINUTES_IN_A_GAME: number = 10;
export const INITIAL_CLOCK_WARNING_THRESHOLD: number = 180;
export const FINAL_CLOCK_WARNING_THRESHOLD: number = 60;

// Hints
export const HINT_POINTS_REQUIRED: number = 20;

// Modal
export const ModalName = {
  InfoModal: "infoModal",
  HintModal: "hintModal",
  ConfirmModal: "confirmModal",
  ResultModal: "resultModal",
};

// Tile status
export const TILE_STATE = {
  CORRECT: "correct",
  INCORRECT: "incorrect",
  IDLE: "idle",
};

// Words
export const MIN_WORD_LENGTH = 3;
export const GUESS_ERRORS = {
  DUPLICATE: "DUPLICATE",
  TOO_SMALL: "TOO SMALL",
} as const;

// API
export const CURRENT_API_VERSION = 2;