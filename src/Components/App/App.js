import React, { Component } from 'react';
import dataCleaner from '../../helper'
import Crawl from '../Crawl/Crawl'
import ViewFavorites from '../ViewFavorites/ViewFavorites'
import Card from '../Card/Card'
import Buttons from '../Button/Button'


class App extends Component {
  constructor() {
    super()
    this.state = {
      films: [],
      people: [],
      planets: [],
      vehicles: [],
      favorites: [],
    }
  }

  render() {
    return (
      <div className="App">
        {
          this.state.films.length &&
          <header className="side-bar">
            <Crawl films={this.state.films}/>
          </header>
        }

        <main className="content-container">
          <div className="title-container">
            <h1 className="page-title">SWapi-Box</h1>
            <ButtonContainer />
          </div>
          <div className="main-content-container">
            <div className="card-container">
              <Card />
            </div>
          </div>

        </main>
      </div>
    );
  }
  
  showPlanets() {
    // this.setState
  }

  showVehicles() {
    // this.setState
  }

  showPeople() {
    // this.setState
  }

  showFavorites() {
    // this.setState
  }

  toggleFav(card) {
    // grab favorite array
    // add to favorite array
    // reset state with edited array
  }
}

export default App;
