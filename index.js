let dealerCards = []
let playerCards = []
let dealersCardsEl
let playersCardsEl

function startGame(){
    dealersCardsEl = document.getElementById("dealerCards-el")
    playersCardsEl = document.getElementById("playerCards-el")

    playerCards.push(dealCard())
    playerCards.push(dealCard())

    dealerCards.push(dealCard())

    renderPlayerCards()
    renderDealerCards()
    renderCorrectActionsToPlayer()
}


//Need to check what cards player has to present correct buttons grey out/disable buttons not needed

function renderCorrectActionsToPlayer(){

}

function renderPlayerCards(){
    for (let i = 0; i < playerCards.length; i++){
        playersCardsEl.textContent += playerCards[i] + "  "
    }
}

function renderDealerCards(){
    for (let i = 0; i < dealerCards.length; i++){
        dealersCardsEl.textContent += dealerCards[i] + "  "
    }
}

function dealCard(){
    min = Math.ceil(2);
    max = Math.floor(11);
    let card = Math.floor(Math.random() * (max - min + 1) + min);
    return card
}

// Hit: Ask for another card. You can ask for a hit until you decide to stand or else bust
function hit(){
    playerCards.push(dealCard())
    renderPlayerCards()
    renderCorrectActionsToPlayer()
}
// Stand: Decide that you take no additional cards. The dealer can then play this hand
function stand(){

}
// Double Down: Double the amount of your bet + an extra card + stand
function doubleDown(){

}
// Split: If you have two cards of the same value, you can split them into two separate hands. The bet is the same as the original bet so essentially doubling your bet.
function splitCards(){

}

function dealerPlays(){
// The dealer automatically wins if you bust or surrender
// He also wins if his total hand value is closest to 21
// If the dealer has a total of 16 or less, he must hit
// If the dealer has a total of 18 or more, then he must stand
// If the dealer has a hard 17, he must stand
// If the dealer has a soft 17, the dealer must hit
}
