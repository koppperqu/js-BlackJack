let dealerCards = []
let playersCards = []
let dealersCardsEl = document.getElementById("dealerCards-el")
let playersCardsEl = document.getElementById("playerCards-el")
let hitButton = document.getElementById("hitButton")
let doubleDownButton = document.getElementById("doubleDownButton")
let splitButton = document.getElementById("splitButton")
let standButton = document.getElementById("standButton")
let isFirstCards
let numberOfSplitCards = 0
let hasSelectedStand

function startGame(){
    numberOfSplitCards = 0
    isFirstCards = true
    playersCards=[]
    dealerCards=[]
    playersCards.push(dealCard())
    playersCards.push(dealCard())
    dealerCards.push(dealCard())
    
    renderDealerCards()
    renderPlayerCards()
    renderCorrectActionsToPlayer()    
    isFirstCards=false
}

function splitHandLogic(){

}


//Need to check what cards player has to present correct buttons grey out/disable buttons not needed
function countCards(cards){
    total=0
    for(let i = 0; i<cards.length; i++){
        total+=cards[i]
    }
    return total
}

function renderCorrectActionsToPlayer(){
    playersTotal = countCards(playersCards)
    //Look at players cards it blackjack do nothing player won
    if (playersTotal===21){
        dealerPlays()
    }
    //If player has cards less than totaling less than 21 show hit and stand buttons
    if (playersTotal<21 && !hasSelectedStand){
        hitButton.hidden = false
        standButton.hidden = false
    }
    //If player has 2 of same card show split button
    if (isFirstCards && areCardsTheSame(playersCards)){
        splitButton.hidden=false
    }else{
        splitButton.hidden=true
    }

    //If player was dealt their first 2 cards and it is a 9 10 or 11 show double down button otherwise disable it
    if ([9,10,11].includes(playersTotal) && isFirstCards){
        alert(playersTotal)
        doubleDownButton.hidden = false
    }else {
        doubleDownButton.hidden = true
    }
}
function areCardsTheSame(cards){
    if (cards[0] === cards [1]){
        return true
    }
    return false
}

function renderDealerCards(){
    dealersCardsEl.textContent = "Dealers Cards:"
    for (let i = 0; i < dealerCards.length; i++){
        dealersCardsEl.textContent += dealerCards[i] + "  "
    }
}

function renderPlayerCards(){
    playersCardsEl.textContent = "Your cards:"
    for (let i = 0; i < playersCards.length; i++){
        playersCardsEl.textContent += playersCards[i] + "  "
    }
}

function dealCard(){
    min = Math.ceil(2);
    max = Math.floor(11);
    let card = Math.floor(Math.random() * (max - min + 1) + min);
    return card
}

function playerHits(){
    hit(playersCards)
    playersTotal = countCards(playersCards)
    if (playersTotal>21){
        alert("BUST")
        hitButton.hidden=true
        standButton.hidden=true        
    }
}

// Hit: Ask for another card. You can ask for a hit until you decide to stand or else bust
function hit(cards){
    cards.push(dealCard())
    renderPlayerCards()
    renderCorrectActionsToPlayer()
}
// Stand: Decide that you take no additional cards. The dealer can then play this hand
function stand(){
    hasSelectedStand = true
    hitButton.hidden=true
    standButton.hidden=true
    dealerPlays()
}
// Double Down: Double the amount of your bet + an extra card + stand
function doubleDown(){
    hit(playersCards)
    stand()
}
// Split: If you have two cards of the same value, you can split them into two separate hands. The bet is the same as the original bet so essentially doubling your bet.
function splitCards(){
    numberOfSplitCards += 1
    splitHandLogic()
}

function dealerPlays(){
    renderDealerCards()
    playersTotal = countCards(playersCards)
    dealersTotal = countCards(dealerCards)
    let dealerBustorStand = false
    if (playersTotal>21){
        alert("dealer wins")
    }
    if (dealersTotal>21){
        dealerBustorStand=true
    }
    if (dealersTotal<=16){
        hit(dealerCards)
        return
    }else if (dealersTotal>=18){
        dealerBustorStand=true
    }
    // If the dealer has a hard 17, he must stand
    // If the dealer has a soft 17, the dealer must hit
    if ((21-dealersTotal)<(21-playersTotal)){
        alert("Dealer WINS")
    }else{
        alert("you win")
    }
}
