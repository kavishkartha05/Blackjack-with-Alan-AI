// Blackjack with Alan AI:
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0, 'money': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('swish.m4a');
const winSound = new Audio('cash.mp3');
const lossSound = new Audio('aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-reset-button').addEventListener('click', reloadGame);
document.querySelector('#blackjack-pause-button').addEventListener('click', pauseFunc);

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        upadteScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `${card}.jpg`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector(YOU['scoreSpan']).style.color = 'white';
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#blackjack-result').textContent = "Let's Play!";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    }
}

function upadteScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
        dealerLogic();
    } else if (activePlayer['score'] === 21) {
        dealerLogic();
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function resumeGame() {
    $('#pause-modal').modal('hide');
}

async function pauseGame() {
    $('#pause-modal').modal('show');
}

function reloadGame() {
    location.reload();
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;
    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        upadteScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

function computeWinner() {
    let winner;
    if (DEALER['score'] > 21 && YOU['score'] <= 21) {
        blackjackGame['wins'] += 1;
        winner = YOU;
        alanBtnInstance.playText("Congratulations! You won the game!");
        YOU['money'] = YOU['money'] + 100;
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses'] += 1;
        winner = DEALER;
        dealerScoreText = DEALER['score'].toString();
        alanBtnInstance.playText("Better luck next time!");
        YOU['money'] = YOU['money'] - 100;
    } else if (YOU['score'] === DEALER['score']) {
        blackjackGame['draws'] += 1;
        alanBtnInstance.playText("Good game! We tied.");
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws'] += 1;
        alanBtnInstance.playText("Good game! We tied.");
    } else if (YOU['score'] < DEALER['score'] && DEALER['score'] <= 21) {
        blackjackGame['losses'] += 1;
        winner = DEALER;
        alanBtnInstance.playText("Better luck next time!");
        YOU['money'] = YOU['money'] - 100;
    } else if (YOU['score'] > DEALER['score'] && YOU['score'] <= 21) {
        blackjackGame['wins'] += 1;
        winner = YOU;
        alanBtnInstance.playText("Congratulations! You won the game!");
        YOU['money'] = YOU['money'] + 100;
    }
    console.log(blackjackGame);
    return winner;
}

function showResult(winner) {
    let message, messageColor;
    if (winner === YOU) {
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        document.querySelector('#blackjack-money').textContent = YOU['money'];
        message = 'You Won!';
        messageColor = 'green';
        winSound.play();
    } else if (winner === DEALER) {
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        document.querySelector('#blackjack-money').textContent = YOU['money'];
        message = 'You Lost!';
        messageColor = 'red';
        lossSound.play();
    } else {
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message = 'You Tied!';
        messageColor = 'black';
    }
    
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
    if (YOU['money'] < 0) {
        document.querySelector('#blackjack-money').textContent = '-$' + Math.abs(YOU['money']);
        document.querySelector('#blackjack-money').style.color = 'red';
    } else if (YOU['money'] === 0) {
        document.querySelector('#blackjack-money').textContent = '$' + YOU['money'];
        document.querySelector('#blackjack-money').style.color = 'black';
    } else {
        document.querySelector('#blackjack-money').textContent = '$' + YOU['money'];
        document.querySelector('#blackjack-money').style.color = 'green';
    }
}
