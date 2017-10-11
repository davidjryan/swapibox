import React, { Component } from 'react';
import dataCleaner from '../../helper'
import Crawl from '../Crawl/Crawl'
import ViewFavorites from '../ViewFavorites/ViewFavorites'
import Card from '../Card/Card'
import Buttons from '../Buttons/Buttons'


class App extends Component {
  constructor() {
    super()
    this.state = {
      films: [],
      people: [],
      planets: [],
      vehicles: []
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
            <ViewFavorites />
          </div>
          <div className="main-content-container">
            <Buttons />
            <div className="card-container">
              <Card />
            </div>
          </div>

        </main>
      </div>
    );
  }

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
        const speciesApiUrls = resolvingPromise[1].results.map( (person) => person.species);

        const filmData = resolvingPromise[0].results;
        const peopleData = this.getPersonData(resolvingPromise[1].results)
        // const peopleData = this.getHomeworldData(resolvingPromise[1].results).then(incompletePerson => this.getSpeciesData(incompletePerson,  speciesApiUrls));

        const planetData = this.getPlanetData(resolvingPromise[2].results)
        const vehicleData = resolvingPromise[3].results;
        resolvingPromise.map( (category) => {
          // console.log(peopleData);
        })
      })
  }

  getPersonData(personDatatoParse) {
    if(personDatatoParse) {
      const completePerson = personDatatoParse.map( (person) => {
        const speciesInfo = person.species.map( (speciesUrl) => {
          return fetch(speciesUrl).then(speciesData =>
             speciesData.json())
            .then(creature => Object.assign({species: creature.name, language: creature.language})
            )
          })
        const homeworldInfo = fetch(person.homeworld)
          .then(homeworldUrl => homeworldUrl.json())
            .then(planet => Object.assign({homeworld: planet.homeworld}, {homeworldPopulation: planet.population}))

        console.log(speciesInfo[0]);
        console.log(homeworldInfo);
        return Object.assign({name: person.name}, speciesInfo)
        })
      return Promise.all(completePerson).then(info => info)
    }
  }

  // getHomeworldData(peopleDataToParse) {
  //   if(peopleDataToParse) {
  //     const peoplePlanetData = peopleDataToParse.map( (person) =>
  //       fetch(person.homeworld)
  //         .then(planetInfo => planetInfo.json())
  //           .then(planet => Object.assign({name: person.name, homeworld: planet.name, homeworldPopulation: planet.population}))
  //     )
  //     return Promise.all(peoplePlanetData).then(personInProgress =>  personInProgress)
  //   }
  // }
  //
  // getSpeciesData(personToComplete, speciesUrl) {
  //   if(speciesUrl) {
  //     const speciesInfo = speciesUrl.map( (url) =>
  //       fetch(url).then(speciesData => speciesData.json())
  //         .then(creature => Object.assign({species: creature.name, language: creature.language}, personToComplete)))
  //     return Promise.all(speciesInfo).then(completePerson =>  completePerson)
  //   }
  // }

  getPlanetData(planetDataToParse) {
    if(planetDataToParse) {
      const detailedPlanetData = planetDataToParse.map( (planets) => {
        const planetInhabitants = planets.residents.map( (planetUrl) => {
          return fetch(planetUrl).then(planetApiCall => planetApiCall.json())
            .then(planetDwellers => planetDwellers)
        })

        return Promise.all(planetInhabitants).then( inhabitant =>
          Object.assign(planets, {residents: planetInhabitants})
        )
      })
      return Promise.all(detailedPlanetData).then(planetData => planetData)
    }
  }
}

export default App;
