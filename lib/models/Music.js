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

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            music
        WHERE
            id=$1  
      `,
      [id]
    );

    return new Music(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingEntry = await Music.findById(id);
    const updatedEntry = { ...existingEntry, ...attributes };
    const { song, artist } = updatedEntry;
    const { rows } = await pool.query(
      `
        UPDATE
            music
        SET
            song=$1,
            artist=$2
        WHERE
            id=$3
        RETURNING
            *
      `,
      [song, artist, id]
    );

    return new Music(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
          music
      WHERE
          id=$1
      RETURNING
          *
    `,
      [id]
    );

    return new Music(rows[0]);
  }
};
