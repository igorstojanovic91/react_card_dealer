import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'
import './CardDeck.css'

const url = "https://deckofcardsapi.com/api/deck/new/shuffle/"

class CardDeck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deckId: "",
            cards: [],
            remainingCards: 52
     }
        this.getCard = this.getCard.bind(this)
        this.startGame = this.startGame.bind(this)
    }

    async componentDidMount() {
        this.startGame()
    }

    async startGame() {

        if(this.state.remainingCards === 0) {
            this.setState ({
                deckId: "",
                cards: [],
                remainingCards: 52
            })
        }

        try {
            let response = await axios.get(url)
            this.setState({deckId: response.data.deck_id})
        } catch (error) {
            console.log(error)
        }
        
        
    }
    async getCard() {
        const getUrl = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`
        try {
            let response = await axios.get(getUrl);
            let remaining = response.data.remaining;
            let suit = response.data.cards[0].suit;
            let card = `${suit}-${response.data.cards[0].value}`;
            let imageURL = response.data.cards[0].image;

            
            this.setState(curState => ({cards: [...curState.cards, {
                id: card,
                cardsURL: imageURL
            }],
            remainingCards: remaining}))

        } catch (error) {
            console.log(error)
        }
    }

  render() {

    let cards = this.state.cards.map((el,idx) => 
    <Card img={el.cardsURL} 
    key={el.id} 
    alt={el.id} 
    />)

    return (
      <div className="Deck">
          <h1 className="CardDeck-Title">♧♧Card Dealer♧♧</h1>
          <h2 className="CardDeck-Title Subtitle">♧♧Little Demo made with React♧♧</h2>
            {this.state.remainingCards === 0 
            ? (<button onClick={this.startGame}>Restart Game</button>
                )
            : (
                <div>
                <button className="CardDeck-Btn" onClick={this.getCard}>GIMME A CARD</button>
                <div className="CardDeck">
                    {cards}
                </div>
                </div>
            )
            }
      </div>
    )
  }
}

export default CardDeck