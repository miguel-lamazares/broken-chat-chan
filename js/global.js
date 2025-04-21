// Importações dos bancos de dados (desculpas)
import { absurdas } from './desculpas/absurdas.js';
import { aleatorias } from './desculpas/aleatorias.js';
import { classicas } from './desculpas/classicas.js';

import { amigos } from './desculpas/tematicas/amigos.js';
import { namoro } from './desculpas/tematicas/namoro.js';
import { trabalho } from './desculpas/tematicas/trabalho.js';
import { familia } from './desculpas/tematicas/familia.js';

import { animes } from './desculpas/tematicas/televisivas/animes.js';
import { filmes } from './desculpas/tematicas/televisivas/filmes.js';
import { series } from './desculpas/tematicas/televisivas/series.js';

// Mapeamento de categorias
const excuses = {
    absurdas,
    aleatorias,
    classicas,
    tematicas: {
        namoro,
        amigos,
        trabalho,
        familia,
        televisivas: {
            animes,
            filmes,
            séries: series,
            series: series // suporte para "series" sem acento
        }
    }
};

let state = {
    esperandoSubcategoria: null
};

// Início do chat
function startChat() {
    addMessage("Digite a categoria: absurdas, clássicas, aleatórias ou temáticas", "bot-message", "Bot 🤖");
}

// Processador de mensagens
function processInput() {
    const input = document.getElementById("userInput").value.toLowerCase().trim();

    if (state.esperandoSubcategoria === "televisivas") {
        if (["animes", "filmes", "séries", "series"].includes(input)) {
            const categoria = input === "series" ? "séries" : input;
            gerarEDisparar(excuses.tematicas.televisivas[categoria], categoria);
        } else {
            addMessage("Escolha entre: animes, filmes ou séries", "bot-message", "Bot テレビ");
        }
        state.esperandoSubcategoria = null;
        document.getElementById("userInput").value = "";
        return;
    }

    if (["absurdas", "aleatorias", "clássicas", "classicas"].includes(input)) {
        const categoria = input === "clássicas" ? "classicas" : input;
        gerarEDisparar(excuses[categoria], categoria);
    } else if (input === "tematicas") {
        addMessage("Escolha uma temática: namoro, amigos, trabalho, família ou televisivas", "bot-message", "Bot テーマ");
    } else if (["namoro", "amigos", "trabalho", "familia"].includes(input)) {
        gerarEDisparar(excuses.tematicas[input], input);
    } else if (input === "televisivas") {
        addMessage("Você quer desculpas de: animes, filmes ou séries?", "bot-message", "Bot 📺");
        state.esperandoSubcategoria = "televisivas";
    } else {
        addMessage("Categoria não encontrada! Tente: absurdas, aleatórias, clássicas ou temáticas", "bot-message", "Bot ごめんなさい");
    }

    document.getElementById("userInput").value = "";
}

// Gera desculpa e mostra no chat
function gerarEDisparar(lista, nomeCategoria) {
    addMessage(`Você escolheu: ${nomeCategoria}`, "user-message", "You");
    const frase = lista[Math.floor(Math.random() * lista.length)];
    addMessage(frase, "bot-message", "Bot desculpe");
}

// Mostra mensagens no chat
function addMessage(text, className, sender) {
    const chatBox = document.getElementById("chatBox");
    const message = document.createElement("div");
    message.classList.add("message", className);

    const nameTag = document.createElement("div");
    nameTag.classList.add("name");
    nameTag.innerText = sender;

    const textNode = document.createElement("div");
    textNode.innerText = text;

    message.appendChild(nameTag);
    message.appendChild(textNode);

    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

window.onload = startChat;
