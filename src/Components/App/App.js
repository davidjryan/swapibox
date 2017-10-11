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
      fullyOperationalData: []

    }
  }

  render() {
    return (
      <div className="App">
        {
          this.state.fullyOperationalData &&
          <header className="side-bar">
            {/* <Crawl films={this.state.films}/> */}
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

  componentDidMount() {
    let unresolvedPromises = []
    const films = fetch('https://swapi.co/api/films/')
      .then(filmData => filmData.json())
    const people = fetch('https://swapi.co/api/people/')
      .then(peopleData => peopleData.json())
    const planets = fetch('https://swapi.co/api/planets/')
      .then(planetData => planetData.json())
    const vehicles = fetch('https://swapi.co/api/vehicles/')
      .then(vehicleData => vehicleData.json())

    unresolvedPromises.push(films, people, planets, vehicles);
    this.resolvePromises(unresolvedPromises)
  }

  resolvePromises(incomingPromises) {
    return Promise.all(incomingPromises)
      .then(resolvingPromise => {
        const filmData = resolvingPromise[0].results;
        const peopleData = this.getPersonData(resolvingPromise[1].results)
        const planetData = this.getPlanetData(resolvingPromise[2].results)
        const vehicleData = resolvingPromise[3].results;

        return Promise.all([filmData, peopleData, planetData, vehicleData])
          .then(fullyOperationalData => this.setState({fullyOperationalData: dataCleaner(fullyOperationalData)}))
      })
  }

  getPersonData(personDatatoParse) {
    if(personDatatoParse) {
      const completePerson = personDatatoParse.map( (person) => {
        let incompletePerson ={name: person.name}

        return fetch(person.homeworld)
        .then(homeworldUrl => homeworldUrl.json())
          .then(planet => Object.assign(incompletePerson, {homeworld: planet.name, homeworldPopulation: planet.population}))
          .then( getSpeciesData => {
            const unresolvedSpeciesPromises = person.species.map( (speciesUrl) => {
              return fetch(speciesUrl).then(speciesData => speciesData.json())
            })
            return Promise.all(unresolvedSpeciesPromises)
            .then(resolvedSpecies => Object.assign(incompletePerson, {species: resolvedSpecies}))
          })
        })

      return Promise.all(completePerson).then(youCompleteMe => youCompleteMe )
    }
  }

  getPlanetData(planetDataToParse) {
    if(planetDataToParse) {
      const detailedPlanetData = planetDataToParse.map( (planets) => {
        let incompletePlanet = {name: planets.name, terrain: planets.terrain, population: planets.population, climate: planets.climate}

        const planetInhabitants = planets.residents.map( (planetUrl) => {
          return fetch(planetUrl).then(planetApiCall => planetApiCall.json())
            .then(planetDwellers => planetDwellers)
        })

        return Promise.all(planetInhabitants).then( inhabitant =>
          Object.assign(incompletePlanet, {residents: inhabitant})
        )
      })
      return Promise.all(detailedPlanetData).then(planetData => planetData)
    }
  }
}

export default App;
