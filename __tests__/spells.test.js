const pool = require('../lib/utils/pool');
const fs = require('fs');
const app = require('../lib/app');
const request = require('supertest');
const Spell = require('../lib/models/spells');

describe('spells routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./lib/sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates new spell via POST', async() => {
    const response = await request(app)
      .post('/api/v1/spells')
      .send({
        name: 'fireball'
      });

    expect(response.body).toEqual({
      id: '1',
      name: 'fireball'
    });
  });

  it('gets all spells via GET', async() => {
    const spells = await Promise.all([
      { name: 'first' },
      { name: 'second' },
      { name: 'third' },
    ].map(spell => Spell.insert(spell)));

    const response = await request(app)
      .get('/api/v1/spells');

    expect(response.body).toEqual(expect.arrayContaining(spells));
    expect(response.body).toHaveLength(spells.length);
  });

  it('finds a spell by id via GET', async() => {
    const spell = await Spell.insert({ name: 'drool' });

    const response = await request(app)
      .get(`/api/v1/spells/${spell.id}`);

    expect(response.body).toEqual(spell);
  });

  it('updates a spell by id via PUT', async() => {
    const spell = await Spell.insert({ name: 'drool' });

    const response = await request(app)
      .put(`/api/v1/spells/${spell.id}`)
      .send({
        name: 'rain'
      });

    expect(response.body).toEqual({
      ...spell,
      name: 'rain'
    });
  });

  it('deletes a spell by id via DELETE', async() => {
    const spell = await Spell.insert({ name: 'stone' });

    const response = await request(app)
      .delete(`/api/v1/spells/${spell.id}`);

    expect(response.text).toEqual(`spell with id of ${spell.id} has been deleted`);
  });


});
