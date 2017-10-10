export default function dataCleaner(category, dataObject) {
  if(category === 'films') {
    console.log('here');
    return dataObject.map( (film) => {
      return {
          title: film.title,
          releaseYear: film.release_date,
          crawlText: film.opening_crawl,
          episodeNum: film.episode_id
      }
    })
    // return {
    //   title: dataObject.title,
    //   releaseYear: dataObject.release_date,
    //   crawlText: dataObject.opening_crawl
    // }
  }
}
