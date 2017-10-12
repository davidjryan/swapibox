import React from 'react';
import PropTypes from 'prop-types';

const Crawl = ({ films }) => {
  const randomNumber = Math.floor(Math.random() * 7) + 1;
  const movieCrawl = films.find( (film) => {
    return film.episodeNum === randomNumber;
  });
  return (
    <div className="crawl-container">
      <aside className="side-bar">
        <div className="crawl">
          <h2 className="crawl-title">{movieCrawl.title}</h2>
          <h2 className="crawl-title">{movieCrawl.releaseYear}</h2>
          <h3 className="crawl-text">
            {movieCrawl.crawlText}
          </h3>
        </div>
      </aside>
    </div>
  );
};

Crawl.propTypes = {
  films: PropTypes.array.isRequired
};

export default Crawl;
