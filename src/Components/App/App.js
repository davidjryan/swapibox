import React, { Component } from 'react';
import dataCleaner from '../../helper';
import Crawl from '../Crawl/Crawl';
import CardContainer from '../CardContainer/CardContainer';
import Button from '../Button/Button';


class App extends Component {
  constructor() {
    super();
    this.state = {
      displayData: 'film',
      favoriteCards: [],
      filmData: [],
      peopleData: [],
      vehicleData: [],
      planetData: []
    };
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
      .then(fetchedData => fetchedData.json());
  }

  showData(category) {
    this.setState({
      displayData: category
    });
  }

  toggleFav(card) {
    const { favoriteCards } = this.state;
    let newFavoriteArray = [];
    favoriteCards.includes(card) ?
      newFavoriteArray = favoriteCards.filter( item => item !== card ) :
      newFavoriteArray = [...favoriteCards, card];
    this.setState({
      favoriteCards: newFavoriteArray
    });
  }

  componentDidMount() {
    this.fetchFilmData();
  }

  fetchFilmData() {
    const filmUrl = 'https://swapi.co/api/films';
    return this.fetchData(filmUrl)
      .then(unresolvedPromise => unresolvedPromise.results)
      .then(response => this.setState({
        filmData: dataCleaner(response)
      }));
  }

  fetchPeopleData() {
    if (!this.state.peopleData.length) {
      const peopleUrl = 'https://swapi.co/api/people';
      return this.fetchData(peopleUrl)
        .then(unresolvedPromise => unresolvedPromise.results)
        .then(rawData => this.getPersonData(rawData))
        .then(response => this.setState({
          peopleData: dataCleaner(response),
          displayData: 'people'
        })
        );
    }
    this.setState({
      displayData: 'people'
    });
  }

  fetchVehicleData() {
    if (!this.state.vehicleData.length) {
      const vehicleUrl = 'https://swapi.co/api/vehicles';
      return this.fetchData(vehicleUrl)
        .then(unresolvedPromise => unresolvedPromise.results)
        .then(response => this.setState({
          vehicleData: dataCleaner(response),
          displayData: 'vehicles'
        })
        );
    }
    this.setState({
      displayData: 'vehicles'
    });
  }

  fetchPlanetData() {
    if (!this.state.planetData.length) {
      const planetUrl = 'https://swapi.co/api/planets';
      return this.fetchData(planetUrl)
        .then(unresolvedPromise => unresolvedPromise.results)
        .then(rawData => this.getPlanetData(rawData))
        .then(response => this.setState({
          planetData: dataCleaner(response),
          displayData: 'planets'
        })
        );
    }
    this.setState({
      displayData: 'planets'
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
          climate: planets.climate
        };

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
                  click={ this.fetchPeopleData.bind(this)}
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
                  click={ this.fetchPlanetData.bind(this)}
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
                  cardData={this.state.peopleData}
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
                  cardData={this.state.planetData}
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
}

export default App;
