// desculpas
import { absurdas } from './desculpas/absurdas';
import { aleatorias } from './desculpas/aleatorias';
import { classicas } from './desculpas/classicas';

// temáticas
import { amigos } from './desculpas/tematicas/amigos';
import { namoro } from './desculpas/tematicas/namoro';
import { trabalho } from './desculpas/tematicas/trabalho';
import { familia } from './desculpas/tematicas/familia';

// televisivas
import { animes } from './desculpas/tematicas/televisivas/animes';
import { filmes } from './desculpas/tematicas/televisivas/filmes';
import { series } from './desculpas/tematicas/televisivas/series';

const excuses = {
    absurdas,
    aleatorias,
    classicas,
    namoro,
    trabalho,
    familia,
    amigos,
    animes,
    filmes,
    series
};

let waitingForTelevisivasChoice = false;

function startChat() {
    addMessage("Digite a categoria: absurdas, clássicas, aleatórias ou temáticas", "bot-message", "Bot i'm sorry");
}

function processInput() {
    let userInput = document.getElementById("userInput").value.toLowerCase().trim();

    if (waitingForTelevisivasChoice) {
        if (["animes", "filmes", "séries", "series"].includes(userInput)) {
            const categoriaFinal = (userInput === "series") ? "séries" : userInput;
            addMessage(`Você escolheu: ${categoriaFinal}`, "user-message", "You");
            generateExcuse(categoriaFinal);
        } else {
            addMessage("Opção inválida! Escolha entre: animes, filmes ou séries", "bot-message", "Bot テレビ");
        }
        waitingForTelevisivasChoice = false;
    } else if (excuses[userInput]) {
        addMessage(`Você escolheu: ${userInput}`, "user-message", "You");
        generateExcuse(userInput);
    } else if (userInput === "tematicas") {
        addMessage("Escolha um tema: televisivas, namoro, amigos, trabalho ou família", "bot-message", "Bot lo lamento");
    } else if (userInput === "televisivas") {
        addMessage("Você escolheu: televisivas", "user-message", "You");
        addMessage("Você quer desculpas de: animes, filmes ou séries?", "bot-message", "Bot テレビ");
        waitingForTelevisivasChoice = true;
    } else if (["namoro", "amigos", "trabalho", "familia"].includes(userInput)) {
        addMessage(`Você escolheu: ${userInput}`, "user-message", "You");
        generateExcuse(userInput);
    } else {
        addMessage("Categoria não encontrada! Tente: absurdas, aleatórias, clássicas ou temáticas", "bot-message", "Bot ごめんなさい");
    }

    document.getElementById("userInput").value = "";
}

function generateExcuse(category) {
    const excuse = excuses[category][Math.floor(Math.random() * excuses[category].length)];
    addMessage(excuse, "bot-message", "Bot desculpe");
}

function addMessage(text, className, name) {
    const chatBox = document.getElementById("chatBox");
    const message = document.createElement("div");
    message.classList.add("message", className);

    const nameTag = document.createElement("div");
    nameTag.classList.add("name");
    nameTag.innerText = name;

    const textNode = document.createElement("div");
    textNode.innerText = text;

    message.appendChild(nameTag);
    message.appendChild(textNode);

    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

window.onload = startChat;
