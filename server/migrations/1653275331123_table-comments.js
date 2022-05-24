/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    body VARCHAR(2500) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    resource_id VARCHAR(10)
  );
`);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE comments;
`);
};
