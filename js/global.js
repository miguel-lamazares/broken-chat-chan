let state = {
    esperandoSubcategoria: null,
    esperandoTematica: false
};

function startChat() {
    addMessage("Digite a categoria: absurdas, clássicas, aleatórias ou temáticas", "bot-message", "Bot 🤖");
}

function processInput() {
    const input = document.getElementById("userInput").value.toLowerCase().trim();
    document.getElementById("userInput").value = "";

    // Subcategoria de televisivas
    if (state.esperandoSubcategoria === "televisivas") {
        const map = { series: "séries", animes: "animes", filmes: "filmes" };
        if (map[input]) {
            carregarJson(`./json/tematicas/televisivas/${map[input]}.json`, input);
        } else {
            addMessage("Escolha entre: animes, filmes ou séries", "bot-message", "Bot テレビ");
        }
        state.esperandoSubcategoria = null;
        return;
    }

    // Subcategoria de temáticas
    if (state.esperandoTematica) {
        if (["namoro", "amigos", "trabalho", "familia"].includes(input)) {
            carregarJson(`./json/tematicas/${input}.json`, input);
        } else if (input === "televisivas") {
            addMessage("Você quer desculpas de: animes, filmes ou séries?", "bot-message", "Bot 📺");
            state.esperandoSubcategoria = "televisivas";
        } else {
            addMessage("Temática não encontrada. Tente: namoro, amigos, trabalho, família ou televisivas.", "bot-message", "Bot テーマ");
        }
        state.esperandoTematica = false;
        return;
    }

    // Categorias principais
    if (["absurdas", "aleatorias", "clássicas", "classicas"].includes(input)) {
        const nome = input === "clássicas" ? "classicas" : input;
        carregarJson(`./json/${nome}.json`, nome);
    } else if (input === "tematicas") {
        addMessage("Escolha uma temática: namoro, amigos, trabalho, família ou televisivas", "bot-message", "Bot テーマ");
        state.esperandoTematica = true;
    } else {
        addMessage("Categoria não encontrada! Tente: absurdas, aleatórias, clássicas ou temáticas", "bot-message", "Bot ごめんなさい");
    }
}

// Carrega o JSON dinamicamente
async function carregarJson(caminho, nomeCategoria) {
    try {
        addMessage(`Você escolheu: ${nomeCategoria}`, "user-message", "You");
        const resposta = await fetch(caminho);
        if (!resposta.ok) throw new Error("Arquivo não encontrado");
        const lista = await resposta.json();
        const frase = lista[Math.floor(Math.random() * lista.length)];
        addMessage(frase, "bot-message", "Bot desculpe");
    } catch (error) {
        console.error(error);
        addMessage("Desculpa, não consegui carregar essa categoria. 😓", "bot-message", "Bot ❌");
    }
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

// Garante que o chat comece após o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
    startChat();
    document.getElementById("sendBtn").addEventListener("click", processInput);
});
document.addEventListener("DOMContentLoaded", () => {
    // Função de clique do botão "Enviar"
    document.getElementById("sendBtn").addEventListener("click", processInput);

    // Vinculando o Enter ao botão "Enviar"
    document.getElementById("userInput").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();  // Previne o comportamento padrão do Enter (como enviar um formulário)
            processInput();          
        }
    });
});