let dealersCardsEl = document.getElementById("dealerCards-el")
let playersCardsEl = document.getElementById("playerCards-el")
let hitButton = document.getElementById("hitButton")
let doubleDownButton = document.getElementById("doubleDownButton")
// let splitButton = document.getElementById("splitButton")
let standButton = document.getElementById("standButton")
const BLACKJACK = 21
let player
let dealer

function startGame() {
    player = new Player()
    dealer = new Player()
    let dealersCurrentHand = dealer.currentHand
    dealer.hands[dealersCurrentHand].cards.pop()
    dealer.hands[dealersCurrentHand].cardSuits.pop()
    renderDealerCards()
    renderPlayerCards()
    renderCorrectActionsToPlayer()
}

function renderCorrectActionsToPlayer() {
    if(player.playerIsDone){
        return
    }
    let currentHand = player.currentHand
    let playersTotal = player.hands[currentHand].getCardTotal()
    //Look at players cards it blackjack do nothing player won
    if (playersTotal === 21) {
        dealerPlays()
    }
    //If player has cards less than totaling less than 21 show hit and stand buttons
    if (playersTotal < 21) {
        hitButton.hidden = false
        standButton.hidden = false
    }
    //If player has 2 of same card show split button
    // if (areCardsTheSame(player.hands[currentHand].cards) && player.hands[currentHand].cards.length === 2) {
    //     splitButton.hidden = false
    // } else {
    //     splitButton.hidden = true
    // }
    //If player was dealt their first 2 cards and it is a 9 10 or 11 show double down button otherwise disable it
    const CARD_TOTALS_TO_DOUBLEDOWN_ON = [9, 10, 11]
    if (CARD_TOTALS_TO_DOUBLEDOWN_ON.includes(playersTotal) && player.hands[currentHand].originalTwoCards) {
        doubleDownButton.hidden = false
    } else {
        doubleDownButton.hidden = true
    }
}

function correctSVGToAdd(cardNumber, cardSuit){
    let fileName = "cards/"
    switch (cardNumber){
        case 1:
        case 11:
            fileName += "ace"
            break;
        case 12:
            fileName += "jack"
            break;
        case 13:
            fileName += "queen"
            break;
        case 14:
            fileName += "king"
            break;
        default:
            fileName += cardNumber
    }
    fileName+="_of_"
    switch (cardSuit) {
        case "C":
            fileName+="clubs"
            break;
        case "H":
            fileName+="hearts"
            break;
        case "D":
            fileName+="diamonds"
            break;
        case "S":
            fileName+="spades"
    }
    fileName+=".svg"
    return fileName
}
function renderDealerCards() {
    dealersCardsEl.textContent = "Dealers Cards: "
    for (let i = 0; i < dealer.hands[0].cards.length; i++) {
        let cardNumber = dealer.hands[0].cards[i]
        let cardSuit = dealer.hands[0].cardSuits[i]
        fileName = correctSVGToAdd(cardNumber, cardSuit)
        dealersCardsEl.innerHTML += "<img src = "+fileName+" alt="+fileName+"/>"
    }
}

function renderPlayerCards() {
    playersCardsEl.textContent = "Your cards: "
    for (let i = 0; i < player.hands.length; i++) {
        playersCardsEl.textContent += "Hand " + (i + 1) + " - "
        for (let j = 0; j < player.hands[i].cards.length; j++) {
            let cardNumber = player.hands[i].cards[j]
            let cardSuit = player.hands[i].cardSuits[j]
            fileName = correctSVGToAdd(cardNumber, cardSuit)
            playersCardsEl.innerHTML += "<img id=\"card\"src = "+fileName+" alt="+fileName+"/>"
        }
    }
}
function areCardsTheSame(cards) {
    if (cards[0] === cards[1]) {
        return true
    }
    return false
}
// Hit: Ask for another card. You can ask for a hit until you decide to stand or else bust
function hit() {
    let currentHand = player.currentHand
    player.hands[currentHand].addCard()
    renderPlayerCards()
    let playerTotal = player.hands[currentHand].getCardTotal()
    if (playerTotal >= BLACKJACK) {
        player.standOrBustAHand()
    }
    renderCorrectActionsToPlayer()
    doesDealerPlay()
}
// Stand: Decide that you take no additional cards. The dealer can then play this hand
function stand() {
    player.standOrBustAHand()
    doesDealerPlay()
}
// Double Down: Double the amount of your bet + an extra card + stand
function doubleDown() {
    //double money
    hit()
    stand()
}
// Split: If you have two cards of the same value, you can split them into two separate hands. The bet is the same as the original bet so essentially doubling your bet.
// function splitCards() {
//     numberOfSplitCards += 1
//     splitHandLogic()
// }
function doesDealerPlay() {
    if (player.playerIsDone) {
        hitButton.hidden = true
        standButton.hidden = true
        //splitButton.hidden = true
        doubleDownButton.hidden = true
        dealerPlays()
    }
}
function dealerPlays() {
    for( let i = 0; i<player.hands.length; i++){
        let playersTotal = player.hands[i].getCardTotal()  
        if (playersTotal > 21) {
            alert("dealer wins")
            return
        }
        dealer.hands[0].addCard()
        renderDealerCards()
        while (!dealer.playerIsDone){
            let dealersTotal = dealer.hands[0].getCardTotal()
            if (dealersTotal <= 16) {
                dealer.hands[0].addCard()
                renderDealerCards()
            } else if (dealersTotal >= 18) {
                dealer.standOrBustAHand()
            } else if(dealer.hands[0].cards.includes(11)){
                // If the dealer has a hard 17, he must stand
                // If the dealer has a soft 17, the dealer must hit
                dealer.hands[0].addCard()
                renderDealerCards()
            } else{
                dealer.standOrBustAHand()
            }
        }
        let dealersTotal = dealer.hands[0].getCardTotal()
        if(dealersTotal>21){
            alert("YOU WIN")
        }else if (dealersTotal===playersTotal){
            alert("TIE")
        }else if ((21 - dealersTotal) < (21 - playersTotal)) {
            alert("DEALER WINS")
        } else {
            alert("YOU WIN!!!")
        }

    }
}
