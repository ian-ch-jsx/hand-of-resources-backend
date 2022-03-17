const pool = require('../utils/pool');

module.exports = class Music {
  id;
  song;
  artist;

  constructor(row) {
    this.id = row.id;
    this.song = row.song;
    this.artist = row.artist;
  }

  static async insert({ song, artist }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            music (song, artist)
        VALUES
            ($1, $2)
        RETURNING
            *
      `,
      [song, artist]
    );

    return new Music(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            music
      `
    );

    return rows.map((row) => new Music(row));
  }
};
