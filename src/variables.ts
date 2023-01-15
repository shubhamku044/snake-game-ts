const startBtn: HTMLButtonElement = document.querySelector(
  ".start-btn"
) as HTMLButtonElement;
const gameBoard: HTMLDivElement = document.querySelector(
  ".game-board"
) as HTMLDivElement;

const { gridTemplateRows, gridTemplateColumns } = getComputedStyle(gameBoard);

const gameBoardRows: number = gridTemplateRows.split(" ").length;
const gameBoardColumns: number = gridTemplateColumns.split(" ").length;
const scoreEl: HTMLSpanElement = document.querySelector(
  "#score"
) as HTMLSpanElement;

export { startBtn, gameBoard, gameBoardRows, gameBoardColumns, scoreEl };
