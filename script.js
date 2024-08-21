const boardSize = 10;
const gridContainer = document.querySelector('.grid-container');

const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
};

const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
};

function createBoard() {
    for (let i = 100; i > 0; i--) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.textContent = i;
        gridContainer.appendChild(gridItem);
        
        if (snakes[i]) {
            gridItem.classList.add('snake');
            gridItem.textContent += ` 🐍 ${snakes[i]}`;
        } else if (ladders[i]) {
            gridItem.classList.add('ladder');
            gridItem.textContent += ` 🪜 ${ladders[i]}`;
        }
    }
}

let currentPlayer = 1;
let player1Pos = 1;
let player2Pos = 1;

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function movePlayer(player, pos) {
    if (snakes[pos]) {
        return snakes[pos];
    } else if (ladders[pos]) {
        return ladders[pos];
    }
    return pos;
}

document.getElementById('roll-dice').addEventListener('click', function() {
    const dice = rollDice();
    document.getElementById('dice-number').textContent = dice;

    let currentPosition;
    if (currentPlayer === 1) {
        currentPosition = player1Pos + dice;
        if (currentPosition <= 100) {
            player1Pos = movePlayer(1, currentPosition);
        }
        document.getElementById('player1-pos').textContent = player1Pos;
        currentPlayer = 2;
        document.getElementById('player-turn').textContent = "Player 2";
    } else {
        currentPosition = player2Pos + dice;
        if (currentPosition <= 100) {
            player2Pos = movePlayer(2, currentPosition);
        }
        document.getElementById('player2-pos').textContent = player2Pos;
        currentPlayer = 1;
        document.getElementById('player-turn').textContent = "Player 1";
    }

    // Check for a winner
    if (player1Pos === 100) {
        document.getElementById('game-status').textContent = "Player 1 Wins!";
        document.getElementById('roll-dice').disabled = true;
    } else if (player2Pos === 100) {
        document.getElementById('game-status').textContent = "Player 2 Wins!";
        document.getElementById('roll-dice').disabled = true;
    }
});

createBoard();
