import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="side-bar">
          <div className="crawl">
            <h2 className="crawl-title">Episode V</h2>
            <h2 className="crawl-title">The Empire Strikes Back</h2>
            <h3 className="crawl-text">
              It is a dark time for the
              Rebellion. Although the Death
              Star has been destroyed,
              Imperial troops have driven the
              Rebel forces from their hidden
              base and pursued them across
              the galaxy.

              Evading the dreaded Imperial
              Starfleet, a group of freedom
              fighters led by Luke Skywalker
              has established a new secret
              base on the remote ice world
              of Hoth.

              The evil lord Darth Vader,
              obsessed with finding young
              Skywalker, has dispatched
              thousands of remote probes into
              the far reaches of space....
            </h3>
          </div>
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
}

export default App;
