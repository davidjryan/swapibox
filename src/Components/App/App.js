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
      displayData: 'film',
      favoriteCards: [],
      filmData: [],
      vehicleData: []
    };
  }

  render() {
    if (this.state.filmData.length) {
      return (
        <div className="App">

          <Crawl films={this.state.filmData}/>

          <main className="content-container">
            <div className="title-container">
              <h1 className="page-title">SWapi-Box</h1>
              <div className="btns">

                <Button
                  givenClass={this.activeCategory(this.state.displayData,
                    'people') + ' people-btn'}
                  click={ this.showData.bind(this)}
                  text='People'
                  category='people' />
                <Button
                  givenClass={this.activeCategory(this.state.displayData,
                    'vehicles') + ' vehicles-btn'}
                  click={ this.fetchVehicleData.bind(this) }
                  text='Vehicles'
                  category='vehicles' />
                <Button
                  givenClass={this.activeCategory(this.state.displayData,
                    'planets') + ' planets-btn'}
                  click={ this.showData.bind(this)}
                  text='Planets'
                  category='planets' />
                <Button
                  givenClass={this.activeCategory(this.state.displayData,
                    'favorites') + ' favorites-btn'}
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
                  cardData={this.state.vehicleData}
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

  activeCategory(display, button) {
    if (display === button) {
      return 'activeBtn';
    } else {
      return '';
    }
  }

  fetchData(incomingUrl) {
    return fetch(incomingUrl)
      .then(fetchedData => fetchedData.json())
  }

  showData(category) {
    this.setState({
      displayData: category
    });
  }

  toggleFav(card) {
    this.setState({
      favoriteCards: [...this.state.favoriteCards, card]
    });
  }

  componentDidMount() {
    this.fetchFilmData()
    // let unresolvedPromises = [];
    // const films = fetch('https://swapi.co/api/films/')
    //   .then(filmData => filmData.json());
    // const people = fetch('https://swapi.co/api/people/')
    //   .then(peopleData => peopleData.json());
    // const planets = fetch('https://swapi.co/api/planets/')
    //   .then(planetData => planetData.json());
    // const vehicles = fetch('https://swapi.co/api/vehicles/')
    //   .then(vehicleData => vehicleData.json());
    //
    // unresolvedPromises.push(films, people, planets, vehicles);
    // this.resolvePromises(unresolvedPromises);
  }



  fetchFilmData() {
    const filmUrl = 'https://swapi.co/api/films';
    const fetchedFilmData = this.fetchData(filmUrl).then(unresolvedPromise => {
      return unresolvedPromise.results
    }).then(response => this.setState({
      filmData: dataCleaner(response)
    }));
  }

  fetchVehicleData() {
    if(this.state.vehicleData.length === 0) {
      const vehicleUrl = 'https://swapi.co/api/vehicles';
      const fetchedVehicleData = this.fetchData(vehicleUrl).then(unresolvedPromise => {
        return unresolvedPromise.results
      }).then(response => this.setState({
        vehicleData: dataCleaner(response)
      }));
    }
    this.setState({
      displayData: 'vehicles'
    })
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
      });
  }

  getPersonData(personDatatoParse) {
    if (personDatatoParse) {
      const completePerson = personDatatoParse.map( (person) => {
        let incompletePerson ={name: person.name};

        return fetch(person.homeworld)
          .then(homeworldUrl => homeworldUrl.json())
          .then(planet => Object.assign(incompletePerson, {
            homeworld: planet.name,
            homeworldPopulation: planet.population
          }))
          .then( getSpeciesData => {
            const unresSpecPromies = person.species.map( (speciesUrl) => {
              return fetch(speciesUrl).then(speciesData => speciesData.json());
            });
            return Promise.all(unresSpecPromies)
              .then(resolvedSpecies =>
                Object.assign(incompletePerson, {species: resolvedSpecies})
              );
          });
      });

      return Promise.all(completePerson).then(youCompleteMe => youCompleteMe);
    }
  }

  getPlanetData(planetDataToParse) {
    if (planetDataToParse) {
      const detailedPlanetData = planetDataToParse.map( (planets) => {
        let incompletePlanet = {
          name: planets.name,
          terrain: planets.terrain,
          population: planets.population,
          climate: planets.climate};

        const planetInhabitants = planets.residents.map( (planetUrl) => {
          return fetch(planetUrl).then(planetApiCall => planetApiCall.json())
            .then(planetDwellers => planetDwellers);
        });

        return Promise.all(planetInhabitants).then( inhabitant =>
          Object.assign(incompletePlanet, {residents: inhabitant})
        );
      });
      return Promise.all(detailedPlanetData).then(planetData => planetData);
    }
  }
}

export default App;
