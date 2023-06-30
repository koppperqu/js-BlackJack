class Player {
  constructor() {
    this.currentHand = 0
    this.playerIsDone = false
    let newHand = new Hand()
    this.hands = [newHand]
  }
  splitAHand(){
    let newHand = this.hands[this.currentHand].splitHand()
    this.hands.push(newHand)
  }
  standOrBustAHand(){
    this.currentHand++
    if(this.hands.length===this.currentHand){
      this.playerIsDone = true
    }
  }
}
/*
Hand holds a single hand of cards, useful incase of spliting hand
add card to a hard with .addCard() get the total of the hand with 
.total
*/
class Hand {
  constructor() {
    this.suits = ["C","H","D","S"]
    this.cardSuits = []
    this.cards = []
    this.addCard()
    this.addCard()
    this.cardTotal = 0
    this.originalTwoCards = true
    this.cardTotal = this.#totalCards()
    }
    getCardTotal(){      
      this.cardTotal = this.#totalCards()
      return this.cardTotal
    }
    addCard(){
      let newCard = this.#dealCard()
      this.cards.push(newCard)
      this.cardSuits.push(this.#pickSuit())
      this.cardTotal = this.#totalCards()
      this.originalTwoCards=false
    }
    splitHand(){
      let newHand = new Hand()
      newHand.cards.pop()
      newHand.cards[0] = this.cards[1]
      newHand.cardSuits[0] = this.cardSuits[1]
      this.cards[1] = this.#dealCard()
      this.cardSuits[1] = this.#pickSuit()
      return newHand
    }
    #totalCards(){
      const BLACKJACK = 21
      let total=0
      for(let i = 0; i<this.cards.length; i++){
        if ([12,13,14].includes(this.cards[i])){
          total+=10
        }else{
          total+=this.cards[i]
        }
      }
      if (total>BLACKJACK && this.cards.includes(11)){
        //Change the ace from 11 into a 1 to prevent busting
        let index = this.cards.indexOf(11)
        this.cards[index]=1
        total-=10
      }
      return total
    }
    #pickSuit(){
      let newSuit = this.suits[Math.floor(Math.random()*this.suits.length)]
      return newSuit
    }
    #dealCard(){
      let cards=[2,3,4,5,6,7,8,9,10,11,12,13,14]
      let min = Math.ceil(2);
      let max = Math.floor(14);
      let card = Math.floor(Math.random() * (max - min + 1) + min);
      return card
  }
}