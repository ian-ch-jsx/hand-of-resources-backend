-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS moviepets, gamechars;

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
    ('Toto', 'Dog', 'The Wizard of Oz');

    CREATE TABLE gamechars (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        char_name TEXT NOT NULL,
        char_species TEXT NOT NULL,
        game TEXT NOT NULL
    );

INSERT INTO
    gamechars (char_name, char_species, game)
VALUES
    ('Gwen', 'Deer', 'Spiritfarer'),
    ('Acrid', 'Alien', 'Risk of Rain 2'),
    ('Heather Mason', 'Human', 'Silent Hill 3');

