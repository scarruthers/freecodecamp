import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import './QuoteDisplay.css';

// quotes referenced from https://www.goalcast.com/history-quotes/
const quotes = [
  {
    text: "A people without the knowledge of their past history, origin and culture is like a tree without roots.",
    author: "Marcus Garvey"
  },
  {
    text: "If you don’t know history, then you don’t know anything. You are a leaf that doesn’t know it is part of a tree.",
    author: "Michael Crichton"
  },
  {
    text: "Alternate history fascinates me, as it fascinates all novelists, because ‘What if?’ is the big thing.",
    author: "Kate Atkinson"
  },
  {
    text: "The history of the past interests us only in so far as it illuminates the history of the present.",
    author: "Ernest Dimnet"
  },
  {
    text: "History has demonstrated that the most notable winners usually encountered heartbreaking obstacles before they triumphed. They won because they refused to become discouraged by their defeats.",
    author: "B. C. Forbes"
  }
];

class QuoteDisplay extends React.Component {
    constructor(props) {
      super(props)
      
      this.newQuote = this.newQuote.bind(this);
      
      this.state = {
        index: "",
        text: "",
        author: ""
      }
    }
    
    newQuote() {
      // grab a random quote from quotes and update the state
        let newQuoteIndex = this.state.index;
        
        // Make sure we don't see the same quote twice in a row
        while(this.state.index === newQuoteIndex) {
            newQuoteIndex = Math.round(Math.random() * 100) % quotes.length;
        }

        this.setState({
            index: newQuoteIndex,
            text: quotes[newQuoteIndex].text,
            author: quotes[newQuoteIndex].author
        })
    }
    
    componentDidMount() {
        this.newQuote();
    }

    render() {
        let tweetLink = "https://twitter.com/intent/tweet?text=\"" + this.state.text + "\"";
      return (
        <div id="quote-box" className="h4">
            
            <div id="text"><p className="text-center"><FontAwesomeIcon icon={faQuoteLeft} /> {this.state.text} <FontAwesomeIcon icon={faQuoteRight} /></p></div>
            <div id="author"><p className="text-end"> - <cite>{this.state.author}</cite></p></div>
            
            <div className="row h6 text-center">
                <div className="col-6">
                    <a id="tweet-quote" href={tweetLink} className="btn btn-light" target="_blank"><FontAwesomeIcon icon={faTwitter} /> Tweet</a>
                </div>
                <div id="new-quote-button" className="col-6">
                    <button id="new-quote" className="btn btn-dark" onClick={this.newQuote}>New Quote</button>
                </div>
            </div>
            </div>
      );
    }
}

export default QuoteDisplay;