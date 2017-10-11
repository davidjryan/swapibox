getPeopleData(url){
    fetch(url)
    .then(raw => raw.json())
    .then(parsedData => {
      const unresolvedPromises = parsedData.results.map( (person, index, array) => {
        // declare the object to be manipulated - this is the result after promise resolution
        let tempObject = {name: person.name};
        // Put the promise at the end of the chain into the unresolvedPromises array (Promise is on line 27)
        return fetch(person.homeworld) //get the data from the current person Homeworld URL
          .then(homeworldRawData => homeworldRawData.json()) //translate raw data
          .then(homeworldData => { //add data retrieved into the object
            Object.assign(tempObject, {
              homeworld: homeworldData.name,
              homeworldPop: homeworldData.population
            }) //return nothing, next .then is a new thing
          })
          .then(totallynewstuff => { //start a totally new process in the same chain
            //Species can be an array of URLs, let's create a promise array of all URLs in the array
            const unresolvedSpeciesPromises = person.species.map((eachSpecies) => {
              // put promise on line 22 in the array for each species
              return fetch(eachSpecies) //grab data
              .then(speciesRawData => speciesRawData.json()) //parse data promise - this is put in the species array
            })
            // let's resolve the array of species promises - this will give an array of objects
            return Promise.all(unresolvedSpeciesPromises) //return this promise chain to line 5
            //create a promise - This promise is not resolved and is placed in the unresolvedPromises array
            .then(resolvedSpecies => Object.assign(tempObject, {species: resolvedSpecies}))
          })
      })
      Promise.all(unresolvedPromises) // unresolved promises is currently an array of Object promises
        .then(promiseAllResults => { //resolve promises to get objects
          this.setState({
            peopleArray: promiseAllResults //put objects in state
          })
        })
    })
  }
