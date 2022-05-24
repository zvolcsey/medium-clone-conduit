/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE hashtags_articles (
      id SERIAL PRIMARY KEY,
      hashtag_id INTEGER NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
      article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
      UNIQUE (hashtag_id, article_id)
    );
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE hashtags_articles;
`);
};
