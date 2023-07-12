const quotes = [
  
];
class QuoteDisplay extends React.Component {
  constructor(props) {
    super(props)
    
    this.newQuote = this.newQuote.bind(this);
    
    this.state = {
      text: "nothing here",
      author: "John Doe"
    }
  }
  
  newQuote() {
    // grab a random quote from quotes and update the state
    this.setState({
      
    })
  }
  
  render() {
    return (
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
    );
  }
}

const quoteRoot = ReactDOM.createRoot(document.getElementById('quote-box'));

quoteRoot.render(<QuoteDisplay />);