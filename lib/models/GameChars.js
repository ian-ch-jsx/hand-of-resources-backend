const pool = require('../utils/pool');

module.exports = class GameChars {
  id;
  char_name;
  char_species;
  game;

  constructor(row) {
    this.id = row.id;
    this.charName = row.char_name;
    this.charSpecies = row.char_species;
    this.game = row.game;
  }

  static async insert({ charName, charSpecies, game }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
        gamechars (char_name, char_species, game)
    VALUES
        ($1, $2, $3)
    RETURNING
        *
      `,
      [charName, charSpecies, game]
    );

    return new GameChars(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            gamechars
      `
    );
    return rows.map((row) => new GameChars(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            gamechars
        WHERE
            id=$1
      `,
      [id]
    );

    return new GameChars(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingEntry = await GameChars.findById(id);
    const updatedEntry = { ...existingEntry, ...attributes };
    const { charName, charSpecies, game } = updatedEntry;
    const { rows } = await pool.query(
      `
        UPDATE
            gamechars
        SET
            char_name=$1,
            char_species=$2,
            game=$3
        WHERE
            id=$4
        RETURNING
            *
      `,
      [charName, charSpecies, game, id]
    );

    return new GameChars(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
            gamechars
        WHERE
            id=$1
        RETURNING
            *
      `,
      [id]
    );
    return new GameChars(rows[0]);
  }
};
