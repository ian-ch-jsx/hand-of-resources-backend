DROP TABLE IF EXISTS moviepets, gamechars, podcasts, music, favanimals;

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

CREATE TABLE podcasts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    topic TEXT NOT NULL,
    descr TEXT NOT NULL
);

INSERT INTO
    podcasts (title, topic, descr)
VALUES
    ('Welcome to Night Vale', 'Fictional stories', 'A fictional community news radio station with heavy surreal vibes.'),
    ('The Magnus Archives', 'Fictional stories', 'A fictional horror podcast examining case files on unexplained phenomena.'),
    ('The Weirdest Thing I Learned This Week','Non-fiction educational', 'Weird facts presented by Popular Science magazine.');

CREATE TABLE music (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    song TEXT NOT NULL,
    artist TEXT NOT NULL
);

INSERT INTO
    music (song, artist)
VALUES
    ('The Other Side of Paradise', 'Glass Animals'),
    ('Two', 'The Antlers'),
    ('Map Of The World', 'Monsters Of Folk');

CREATE TABLE favanimals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    species TEXT NOT NULL,
    classification TEXT NOT NULL
);

INSERT INTO 
    favanimals (species, classification)
VALUES
    ('Saiga Antelope','Mammal'),
    ('Maned Wolf', 'Mammal'),
    ('Blue Malaysian Coral Snake', 'Reptile');