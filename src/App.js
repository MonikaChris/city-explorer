import './App.css';
import React from 'react';
import Header from './Header.js';
import SearchBar from './SearchBar';
import Footer from './Footer';



class App extends React.Component {

  render() {    
    return (
      <div className="App">
        <Header />
        <SearchBar />
        
      </div>
    )
  }
}

export default App;
