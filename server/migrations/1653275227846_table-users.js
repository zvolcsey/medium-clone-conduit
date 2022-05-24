/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      username VARCHAR(15) NOT NULL,
      password VARCHAR(240),
      bio VARCHAR(400),
      UNIQUE (username)
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE users;
  `);
};
