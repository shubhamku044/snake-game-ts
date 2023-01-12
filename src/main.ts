import "./style.css";
import {
	startBtn,
	gameBoard,
	gameBoardRows,
	gameBoardColumns,
} from "./variables";

import { Snake } from "./snake";

createBoard();

const gameBoardEl: NodeListOf<ChildNode> = document.querySelector(".game-board")
	?.childNodes as NodeListOf<ChildNode>;

startBtn.addEventListener("click", () => {
	new Snake(gameBoardEl);

	startBtn.disabled = true;
});

function createBoard() {
	const boardSize = gameBoardRows * gameBoardColumns;

	const div: HTMLDivElement = document.createElement("div");

	for (let i = 0; i < boardSize; i++) {
		gameBoard.appendChild(div.cloneNode());
	}
}
