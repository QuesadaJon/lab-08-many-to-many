const pool = require('../lib/utils/pool');
const fs = require('fs');

describe('spells routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./lib/sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

});
