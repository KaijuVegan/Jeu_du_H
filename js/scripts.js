/**
 * Add form
 */
let playerDiv = document.getElementById("player");
let addPLayer = document.getElementById("add-player");

addPLayer.addEventListener("click", () => {
    let div = document.createElement('div');
    let label = document.createElement('label');
    let input = document.createElement('input');
    div.setAttribute('class', 'player-form');
    label.innerText = 'Joueur '
    input.setAttribute('type', 'text');
    // input.setAttribute('autocomplete', 'off');
    div.appendChild(label)
    div.appendChild(input)
    playerDiv.appendChild(div)
})

/**
 * Start game
 */
let startButton = document.getElementById('start-game');
let players = [];
let deckNbr = document.getElementById('32').checked;

startButton.addEventListener('click', () => {
    let playerDiv = document.getElementById("player");
    let playersForm = playerDiv.getElementsByTagName('input')
    for (let player of playersForm) {
        players.push(player.value)
    }
    let content = document.getElementById("content");
    content.innerHTML = "";
    let playerHands = document.createElement('div');
    playerHands.setAttribute('id', 'players-hands');
    content.appendChild(playerHands)
    for (let i = 0; i < players.length; i++) {
        let player = document.createElement('div');
        player.setAttribute('id', 'player' + (i + 1));
        player.innerHTML = "cartes de " + players[i] + ": ";
        playerHands.appendChild(player);
    }
    
    new Game(players, deckNbr);
})





