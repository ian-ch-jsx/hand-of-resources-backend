-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS moviepets;

CREATE TABLE moviepets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pet_name TEXT NOT NULL,
    pet_species TEXT NOT NULL,
    movie TEXT NOT NULL
);

INSERT INTO
    moviepets (pet_name, pet_species, movie)
VALUES
    ('Hooch', 'Dog', 'Turner & Hooch'),
    ('Jones', 'Cat', 'Alien'),
    ('Toto', 'Dog', 'Wizard of Oz');