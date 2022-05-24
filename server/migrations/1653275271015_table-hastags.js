/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE hashtags (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      title VARCHAR(15) NOT NULL,
      UNIQUE (title)
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE hashtags;
  `);
};
