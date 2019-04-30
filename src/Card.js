import React, { Component } from 'react'
import './Card.css'

class Card extends Component {
    constructor(props) {
        super(props)
        let randomX = Math.floor(Math.random() * 50) + 1;
        let randomY = Math.floor(Math.random() * 50) + 1;
        let randomRotate = Math.floor(Math.random() * 360) + 1;
        this._transform =  `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;

    }
  render() {
      
    
    return (
      <div>
        <img className="Card" src={this.props.img} alt={this.props.alt} style={{transform : this._transform}} />
      </div>
    )
  }
}

export default Card