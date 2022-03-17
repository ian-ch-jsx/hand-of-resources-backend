const pool = require('../utils/pool');

module.exports = class Podcasts {
  id;
  title;
  topic;
  descr;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.topic = row.topic;
    this.description = row.descr;
  }

  static async insert({ title, topic, description }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            podcasts (title, topic, descr)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
      `,
      [title, topic, description]
    );
    return new Podcasts(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            podcasts
      `
    );
    return rows.map((row) => new Podcasts(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            podcasts
        WHERE
            id=$1  
      `,
      [id]
    );

    return new Podcasts(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingEntry = await Podcasts.findById(id);
    const updatedEntry = { ...existingEntry, ...attributes };
    const { title, topic, description } = updatedEntry;
    const { rows } = await pool.query(
      `
        UPDATE
            podcasts
        SET
            title=$1,
            topic=$2,
            descr=$3
        WHERE
            id=$4
        RETURNING
            *
      `,
      [title, topic, description, id]
    );

    return new Podcasts(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
            podcasts
        WHERE
            id=$1
        RETURNING
            *
      `,
      [id]
    );

    return new Podcasts(rows[0]);
  }
};
