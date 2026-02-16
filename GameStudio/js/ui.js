import { characters } from "./characters.js";
import { initGame } from "./game.js";

export function showCharacterSelection() {
    const screen = document.getElementById("characterScreen");
    const list = document.getElementById("characterList");

    screen.classList.remove("hidden");

    characters.forEach(char => {
        const btn = document.createElement("button");
        btn.innerText = char.name;
        btn.onclick = () => {
            screen.classList.add("hidden");
            initGame(char);
        };
        list.appendChild(btn);
    });
}
