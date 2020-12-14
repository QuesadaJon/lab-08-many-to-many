const pool = require('../utils/pool');

module.exports = class Caster {
  id;
  name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }

  static async insert({ name }) {
    const { rows } = await pool.query(
      'INSERT INTO casters (name) VALUES ($1) RETURNING *',
      [name]
    );

    return new Caster(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM casters WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw new Error(`No caster found for id of ${id}`);

    return new Caster(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM casters');

    return rows.map(row => new Caster(row));
  }

  static async update(id, { name }) {
    const { rows } = await pool.query(
      `UPDATE casters
          SET name=$1
          WHERE id=$2
          RETURNING *`,
      [name, id]
    );

    if(!rows[0]) throw new Error(`No caster with id ${id} exists`);

    return new Caster(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM casters WHERE id=$1 RETURNING *',
      [id]
    );

    if(!rows[0]) throw new Error(`No caster with id ${id} exists`);
    return `caster with id of ${id} has been deleted`;
  }


};
