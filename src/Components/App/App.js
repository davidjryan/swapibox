import React, { Component } from 'react';
import dataCleaner from '../../helper'
import Crawl from '../Crawl/Crawl'

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
        <header className="side-bar">
          <Crawl films={this.state.films}/>
        </header>

        <main className="content-container">
          <div className="title-container">
            <h1 className="page-title">SWapi-Box</h1>
            <div className="view-favorite">
              View Favorites
              <span className="favorite-count">0</span>
            </div>
          </div>
          <div className="main-content-container">
            <div className="button-container">

              <button>people</button>
              <button>planets</button>
              <button>vehicles</button>
            </div>
            <div className="card-container">
              <div className="card">
                <h2 className="card-title">
                  Luke Skywalker
                  <button className="favorite-button">
                    &#x2606;
                  </button>
                </h2>
                <p>Homeworld</p>
                <p>Species</p>
                <p>Language</p>
                <p>Population</p>
              </div>
              <div className="card">
                <h2 className="card-title">
                  Luke Skywalker
                  <button className="favorite-button">
                    &#x2606;
                  </button>
                </h2>
                <p>Homeworld</p>
                <p>Species</p>
                <p>Language</p>
                <p>Population</p>
              </div>
              <div className="card">
                <h2 className="card-title">
                  Luke Skywalker
                  <button className="favorite-button">
                    &#x2606;
                  </button>
                </h2>
                <p>Homeworld</p>
                <p>Species</p>
                <p>Language</p>
                <p>Population</p>
              </div>
              <div className="card">
                <h2 className="card-title">
                  Luke Skywalker
                  <button className="favorite-button">
                    &#x2606;
                  </button>
                </h2>
                <p>Homeworld</p>
                <p>Species</p>
                <p>Language</p>
                <p>Population</p>
              </div>
              <div className="card">
                <h2 className="card-title">
                  Luke Skywalker
                  <button className="favorite-button">
                    &#x2606;
                  </button>
                </h2>
                <p>Homeworld</p>
                <p>Species</p>
                <p>Language</p>
                <p>Population</p>
              </div>
              <div className="card">
                <h2 className="card-title">
                  Luke Skywalker
                  <button className="favorite-button">
                    &#x2606;
                  </button>
                </h2>
                <p>Homeworld</p>
                <p>Species</p>
                <p>Language</p>
                <p>Population</p>
              </div>
              <div className="card">
                <h2 className="card-title">
                  Luke Skywalker
                  <button className="favorite-button">
                    &#x2606;
                  </button>
                </h2>
                <p>Homeworld</p>
                <p>Species</p>
                <p>Language</p>
                <p>Population</p>
              </div>
              <div className="card">
                <h2 className="card-title">
                  Luke Skywalker
                  <button className="favorite-button">
                    &#x2606;
                  </button>
                </h2>
                <p>Homeworld</p>
                <p>Species</p>
                <p>Language</p>
                <p>Population</p>
              </div>
            </div>
          </div>

        </main>
      </div>
    );
  }

  componentDidMount() {
    const films = this.getApi('films');
    // const people = this.getApi('people');
    // const planets = this.getApi('planets');
    // const vehicles = this.getApi('vehicles');
  }

  getApi(category) {
    fetch(`https:/swapi.co/api/${category}`)
    .then(dataObject => dataObject.json())
    .then(dirtyData => dataCleaner(category, dirtyData.results))
    .then((parsedData) => {
      // console.log(parsedData);
      this.setState({
        [category]: parsedData,
      })
    })
  }


  // getStarWarData() {
  //   fetch('https://swapi.co/api/')
  //   //takes api call and makes it an object
  //   .then(dataObject => dataObject.json())
  //   //traverses the object to the key 'people'
  //   .then(catUrl => {
  //     // const categoryApi = catUrl.filter( (url) => {
  //     //   if (url === 'people', 'planets', 'vehicles') {
  //     //     console.log(url);
  //     //   }
  //     // })
  //     console.log(catUrl);
  //   })


    // //the key people returns a url of another api so we need to 'fetch' from that api
    // .then(stuff => {
    //   ///returning the result of the second fetch as an object with the .json()
    //   return fetch(stuff).then(things =>  things.json())
    //   //logging the result of the fetch
    //   .then(whatIsIt => console.log(whatIsIt))
    // })

  // }
}

export default App;
