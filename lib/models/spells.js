const pool = require('../utils/pool');

module.exports = class Spell {
  id;
  name;
  
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }


  static async insert({ name }) {
    const { rows } = await pool.query(
      'INSERT INTO spells (name) VALUES ($1) RETURNING *',
      [name]
    );

    return new Spell(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM spells WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw new Error(`No spells found for id of ${id}`);

    return new Spell(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM spells');

    return rows.map(row => new Spell(row));
  }

  static async update(id, { name }) {
    const { rows } = await pool.query(
      `UPDATE spells
          SET name=$1
          WHERE id=$2
          RETURNING *`,
      [name, id]
    );

    if(!rows[0]) throw new Error(`No spell with id ${id} exists`);

    return new Spell(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM spells WHERE id=$1 RETURNING *',
      [id]
    );

    if(!rows[0]) throw new Error(`No spell with id ${id} exists`);
    return `spell with id of ${id} has been deleted`;
  }


};
