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
};
