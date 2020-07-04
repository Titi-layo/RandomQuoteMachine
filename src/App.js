import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.min.css'

class Tweet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      link : ''
    };
  }
 
  handleTweet = () =>
   {
     this.setState(
   {
    link : "https://twitter.com/intent/tweet?text=" + this.props.quote + " " + "- " + this.props.author}
   );
     
   }
 
  render() {
  
     return(
      <div>
       <a href={this.state.link} onClick={this.handleTweet} target="_blank"><button className="tweet-design" style={this.props.styling}><i className="fa fa-twitter"></i></button></a>  
      </div>);
   
  }
}

class GetQuote extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      quote: '',
      author: '',
      tweet: false,
      BackgroundChange: {backgroundColor: "green"},
      TextChange : {color: "green", transition: '',
      opacity: ''},
      link : ''
    };
    
  }
  
  componentDidMount()
  {
    
     this.handleColor()
     const cont = new XMLHttpRequest();
     cont.open("GET","https://api.quotable.io/random",true);
     cont.send();
  
   cont.onload = () =>
  {
    let first = {}
    first = JSON.parse(cont.responseText);
     
    this.setState(
    {quote: first.content, author: first.author}
    );
  }
   
}
  
  handleClick = () =>
  {
   
    let json = {};
    const cont = new XMLHttpRequest();
    cont.open("GET","https://api.quotable.io/random",true);
    cont.send();
  
 cont.onload = () =>
{
  json = JSON.parse(cont.responseText);
    this.setState(
   {quote: json.content, author: json.author}
   );
  
 }
 
 } 
  
  
  handleColor = () =>
  {
      
   let colors = 
    ["blue","crimson","red","green","orange","purple","pink","grey","indigo","brown","yellow"];
   let index=Math.floor(Math.random() * (10) + 0);
    this.setState(
   {BackgroundChange: {backgroundColor: colors[index], transition: "background-color 1s ease-in"},TextChange: {color : colors[index], transition: "color 1s ease-in"}}
   );
     
  }
  
  render() {
    
  return (
      <div style={this.state.BackgroundChange} className="full-page">
      <div className="quote-box">
      <h1 style={this.state.TextChange} className="text">{this.state.quote}</h1>
      <h1 style={this.state.TextChange} className="author">{this.state.author}</h1>
       
      <Tweet styling={this.state.BackgroundChange} quote={this.state.quote} author={this.state.author} />
         
      <div className="styling"> <button className="new-quote" onClick={ () => {this.handleColor();this.handleClick();}} style={this.state.BackgroundChange}>New quote</button></div>
      </div>
      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <GetQuote/>
      </div>
    );
  }
}


export default App;
