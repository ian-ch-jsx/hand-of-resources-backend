const pool = require('../utils/pool');

module.exports = class MoviePets {
  id;
  petName;
  petSpecies;
  movie;

  constructor(row) {
    this.id = row.id;
    this.petName = row.pet_name;
    this.petSpecies = row.pet_species;
    this.movie = row.movie;
  }

  static async insert({ petName, petSpecies, movie }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            moviepets (pet_name, pet_species, movie)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
          `,
      [petName, petSpecies, movie]
    );

    return new MoviePets(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          moviepets
    `
    );
    return rows.map((row) => new MoviePets(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          moviepets
        WHERE
          id=$1  
          `,
      [id]
    );

    return new MoviePets(rows[0]);
  }
};
