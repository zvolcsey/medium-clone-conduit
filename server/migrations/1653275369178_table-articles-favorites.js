/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE articles_favorites (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    UNIQUE (user_id, article_id)
  );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE articles_favorites;
  `);
};
