import React, { Component } from 'react';
import './index.css';
import CrimesList from './CrimesList/CrimesList'

class App extends Component {
  constructor() {
      super()

      this.state = {
          crimes: []
      }
  }

  getCrimes = async () => {

      try {
          const crimes = await fetch('https://data.cityofchicago.org/resource/crimes.json');
          const crimesJson = await crimes.json();
          this.setState({ crimes: crimesJson });
      } catch (err) {
          console.log(err, 'error in catch block')
          return err
      }
  }

  deleteItem = (index, event) => {
      this.setState((previousState) => ({
          crimes: previousState.crimes.filter((crime, i) => i !== index)
      }))
  }

  // this is called after the 
  componentDidMount() {
      this.getCrimes().then((data) => console.log(data, ' from famous quotes'))
  }

  render() {
      return (
          <div className="App">
            <h1>Hello, world!</h1>
            <CrimesList crimes={this.state.crimes} deleteItem={this.deleteItem} />
      </div>
      );
  }
}

export default App;