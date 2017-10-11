export default function dataCleaner(category, dataObject) {
  if(category === 'films') {
    return dataObject.map( (film) => {
      return {
          title: film.title,
          releaseYear: film.release_date,
          crawlText: film.opening_crawl,
          episodeNum: film.episode_id
      }
    })
  }

  if(category === 'people') {
    return dataObject.map( (film) => {
      return {
          name: film.name,
          homeworld: film.homeworld,
          species: film.species,
          language: film.species,
          homeworldPopulation: film.homeworld
      }
    })
  }

  if(category === 'planets') {
    return dataObject.map( (film) => {
      return {
          name: film.name,
          terrain: film.terrain,
          population: film.population,
          climate: film.climate,
          residents: film.residents
      }
    })
  }

  if(category === 'vehicles') {
    return dataObject.map( (film) => {
      return {
          name: film.name,
          model: film.model,
          class: film.vehicle_class,
          passengers: film.passengers,
      }
    })
  }
}
