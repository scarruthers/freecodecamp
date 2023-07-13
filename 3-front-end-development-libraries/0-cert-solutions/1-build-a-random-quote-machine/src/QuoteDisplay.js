import React from 'react';

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
    
    newQuote(state) {
      // grab a random quote from quotes and update the state
        let quoteIndex = Math.round(Math.random() * 100) % quotes.length;
        
        // TODO: make sure we don't see the same quote twice in a row

        this.setState({
            index: quoteIndex,
            text: quotes[quoteIndex].text,
            author: quotes[quoteIndex].author
        })
    }
    
    componentDidMount() {
        this.newQuote();
    }

    render() {
        
      return (
        <div id="quote-box">
            <h1 className="text-primary text-center">Share a quote</h1>
            <div className="row">
                <div id="text">{this.state.text}</div>
                <div id="author"> - {this.state.author}</div>
                <div id="new-quote-button">
                <button id="new-quote" className="btn btn-primary" onClick={this.newQuote}>Generate new quote</button>
                </div>
                <div>
                <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank">Share this quote with your Twitter followers</a>
                </div>
            </div>
            </div>
      );
    }
  }



export default QuoteDisplay;