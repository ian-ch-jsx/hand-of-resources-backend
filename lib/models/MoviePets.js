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
};
