import { initGame, restartGame } from "./game.js";
import { showCharacterSelection } from "./ui.js";

const startScreen = document.getElementById("startScreen");

document.addEventListener("keydown", () => {
    startScreen.classList.add("hidden");
    showCharacterSelection();
}, { once: true });

window.restartGame = restartGame;