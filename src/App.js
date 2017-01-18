import React, { Component } from 'react';
import Search from './components/Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 style={{ display: 'inline-block' }}>AwesomeTV</h1>
        <em style={{ display: 'inline-block' }}>by Anders Ekman</em>
        <Search />
      </div>
    );
  }
}

export default App;
