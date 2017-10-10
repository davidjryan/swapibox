import React from 'react';

const Crawl = ({ films }) => {
    const randomNumber = Math.floor(Math.random() * 7) + 1;
    const movieCrawl = films.find( (film) => {
      return film.episodeNum === randomNumber
    })

    console.log(movieCrawl);
    return (
      <aside className="crawl">
        {/* <h2 className="crawl-title">{movieCrawl.title}</h2>
        <h2 className="crawl-title">{movieCrawl.releaseYear}</h2>
        <h3 className="crawl-text">
          {movieCrawl.crawlText}
        </h3> */}
      </aside>
    )

}

export default Crawl;
