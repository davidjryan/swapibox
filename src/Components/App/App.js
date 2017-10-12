import React, { Component } from 'react';
import dataCleaner from '../../helper';
import Crawl from '../Crawl/Crawl';
import CardContainer from '../CardContainer/CardContainer';
import Button from '../Button/Button';


class App extends Component {
  constructor() {
    super();
    this.state = {
      fullyOperationalData: [],
      displayData: 'people',
      favoriteCards: []
    };
  }

  render() {
    if (this.state.fullyOperationalData.length) {
      return (
        <div className="App">

          <header className="side-bar">
            <Crawl films={this.state.fullyOperationalData[0]}/>
          </header>


          <main className="content-container">
            <div className="title-container">
              <h1 className="page-title">SWapi-Box</h1>
              <div className="btns">

                <Button
                  givenClass={'people-btn'}
                  click={ this.showData.bind(this)}
                  text='People'
                  category='people' />
                <Button
                  givenClass={'vehicle-btn'}
                  click={ this.showData.bind(this)}
                  text='Vehicles'
                  category='vehicles' />
                <Button
                  givenClass={'planet-btn'}
                  click={ this.showData.bind(this)}
                  text='Planets'
                  category='planets' />
                <Button
                  givenClass={'favorites-btn'}
                  click={ this.showData.bind(this)}
                  text='Favorites'
                  category='favorites' />

              </div>
            </div>
            <div className="main-content-container">
              {
                this.state.displayData === 'people' &&
                <CardContainer
                  cardData={this.state.fullyOperationalData[1]}
                  toggleFav={ this.toggleFav.bind(this) }/>
              }
              {
                this.state.displayData === 'vehicles' &&
                <CardContainer
                  cardData={this.state.fullyOperationalData[3]}
                  toggleFav={ this.toggleFav.bind(this)}/>
              }
              {
                this.state.displayData === 'planets' &&
                <CardContainer
                  cardData={this.state.fullyOperationalData[2]}
                  toggleFav={ this.toggleFav.bind(this)}/>
              }
              {
                this.state.displayData === 'favorites' &&
                <CardContainer
                  cardData={this.state.favoriteCards}
                  toggleFav={ this.toggleFav.bind(this)} />
              }
            </div>

          </main>
        </div>
      );
    } else {
      return (
        <div className="App">
          Stay on target...
        </div>
      );
    }
  }

  activeCategory() {

  }

  showData(category) {
    this.setState({
      displayData: category
    });
  }

  toggleFav(card) {
    console.log(card);
    // let favoredCards = [];
    // favoredCards.push(card);
    this.setState({
      favoriteCards: [...this.state.favoriteCards, card]
    });
  }

  componentDidMount() {
    let unresolvedPromises = [];
    const films = fetch('https://swapi.co/api/films/')
      .then(filmData => filmData.json());
    const people = fetch('https://swapi.co/api/people/')
      .then(peopleData => peopleData.json());
    const planets = fetch('https://swapi.co/api/planets/')
      .then(planetData => planetData.json());
    const vehicles = fetch('https://swapi.co/api/vehicles/')
      .then(vehicleData => vehicleData.json());

    unresolvedPromises.push(films, people, planets, vehicles);
    this.resolvePromises(unresolvedPromises);
  }

  resolvePromises(incomingPromises) {
    return Promise.all(incomingPromises)
      .then(resolvingPromise => {
        const filmData = resolvingPromise[0].results;
        const peopleData = this.getPersonData(resolvingPromise[1].results);
        const planetData = this.getPlanetData(resolvingPromise[2].results);
        const vehicleData = resolvingPromise[3].results;

        return Promise.all([filmData, peopleData, planetData, vehicleData])
          .then(fullyOperationalData => this.setState({
            fullyOperationalData: dataCleaner(fullyOperationalData)
          }));
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
