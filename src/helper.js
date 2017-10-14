export default function dataCleaner(dataObject) {
  if (dataObject[0].episode_id) {
    return dataObject.map( filmData =>
      Object.assign({
        title: filmData.title,
        releaseYear: filmData.release_date,
        crawlText: filmData.opening_crawl,
        episodeNum: filmData.episode_id
      })
    );
  }
  if (dataObject[0].manufacturer) {
    return dataObject.map( vehicleData =>
      Object.assign({
        Name: vehicleData.name,
        Model: vehicleData.model,
        Class: vehicleData.vehicle_class,
        Passengers: vehicleData.passengers,
        favorite: false
      })
    );
  }
  if (dataObject[0].terrain) {
    return dataObject.map( planetData =>
      Object.assign({
        Name: planetData.name,
        Terrain: planetData.terrain,
        Population: planetData.population,
        Climate: planetData.climate,
        Residents: planetData.residents.map(resident => resident.name),
        favorite: false
      })
    );
  }
  if (dataObject[0].homeworld) {
    return dataObject.map( peopleData =>
      Object.assign({
        Name: peopleData.name,
        Homeworld: peopleData.homeworld,
        Species: peopleData.species[0].name,
        Language: peopleData.species[0].language,
        "Homeworld Population": peopleData.homeworldPopulation,
        favorite: false
      })
    );
  }
}
