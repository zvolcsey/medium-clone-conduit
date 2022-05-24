/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(60) NOT NULL,
    description VARCHAR(200),
    body VARCHAR(400) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id),
    slug VARCHAR(60),
    resource_id VARCHAR(10),
    UNIQUE (resource_id)
  );
`);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE articles;
  `);
};
