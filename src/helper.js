export default function dataCleaner(dataObject) {

  const films = dataObject[0].map( filmData =>
    Object.assign({title: filmData.title, releaseYear: filmData.release_date, crawlText: filmData.opening_crawl, episodeNum: filmData.episode_id}));

  const people = dataObject[1].map( peopleData =>
    Object.assign({name: peopleData.name, homeworld: peopleData.homeworld, species: peopleData.species[0].name, language: peopleData.species[0].language, homeworldPopulation: peopleData.homeworldPopulation}));

  const planets = dataObject[2].map( planetData =>
    Object.assign({name: planetData.name, terrain: planetData.terrain, population: planetData.population, climate: planetData.climate, residents: planetData.residents.map(resident => resident.name)}));

  const vehicles = dataObject[3].map( vehicleData =>
    Object.assign({name: vehicleData.name, model: vehicleData.model, class: vehicleData.vehicle_class, passengers: vehicleData.passengers}));


  return ([films, people, planets, vehicles])
}
