const pool = require('../utils/pool');

module.exports = class FavAnimals {
  id;
  species;
  classification;

  constructor(row) {
    this.id = row.id;
    this.species = row.species;
    this.classification = row.classification;
  }

  static async insert({ species, classification }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            favanimals (species, classification)
        VALUES
            ($1, $2)
        RETURNING
            *
      `,
      [species, classification]
    );

    return new FavAnimals(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          favanimals
      `
    );

    return rows.map((row) => new FavAnimals(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            favanimals
        WHERE
            id=$1  
      `,
      [id]
    );

    return new FavAnimals(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingEntry = await FavAnimals.findById(id);
    const updatedEntry = { ...existingEntry, ...attributes };
    const { species, classification } = updatedEntry;
    const { rows } = await pool.query(
      `
        UPDATE
            favanimals
        SET
            species=$1,
            classification=$2
        WHERE
            id=$3
        RETURNING
            *
      `,
      [species, classification, id]
    );

    return new FavAnimals(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
            favanimals
        WHERE
            id=$1
        RETURNING
            *
      `,
      [id]
    );
    return new FavAnimals(rows[0]);
  }
};
