export default function dataCleaner(dataObject) {

  const films = dataObject[0].map( filmData =>
    Object.assign({
      title: filmData.title,
      releaseYear: filmData.release_date,
      crawlText: filmData.opening_crawl,
      episodeNum: filmData.episode_id
    }));

  const people = dataObject[1].map( peopleData =>
    Object.assign({
      Name: peopleData.name,
      Homeworld: peopleData.homeworld,
      Species: peopleData.species[0].name,
      Language: peopleData.species[0].language,
      "Homeworld Population": peopleData.homeworldPopulation,
      favorite: false
    }));

  const planets = dataObject[2].map( planetData =>
    Object.assign({
      Name: planetData.name,
      Terrain: planetData.terrain,
      Population: planetData.population,
      Climate: planetData.climate,
      Residents: planetData.residents.map(resident => resident.name),
      favorite: false
    }));

  const vehicles = dataObject[3].map( vehicleData =>
    Object.assign({
      Name: vehicleData.name,
      Model: vehicleData.model,
      Class: vehicleData.vehicle_class,
      Passengers: vehicleData.passengers,
      favorite: false
    }));


  return ([films, people, planets, vehicles]);
}

// export default
