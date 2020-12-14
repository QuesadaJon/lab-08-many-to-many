const pool = require('../lib/utils/pool');
const fs = require('fs');
const request = require('supertest');
const app = require ('../lib/app');
const Caster = require('../lib/models/casters');

describe('caster routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./lib/sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });
  
  it('creates new caster via POST', async() => {
    const response = await request(app)
      .post('/api/v1/casters')
      .send({
        name: 'Hagrid'
      });

    expect(response.body).toEqual({
      id: '1',
      name: 'Hagrid'
    });
  });

  it('gets all casters via GET', async() => {
    const casters = await Promise.all([
      { name: 'first' },
      { name: 'second' },
      { name: 'third' },
    ].map(caster => Caster.insert(caster)));

    const response = await request(app)
      .get('/api/v1/casters');

    expect(response.body).toEqual(expect.arrayContaining(casters));
    expect(response.body).toHaveLength(casters.length);
  });

  it('finds a caster by id via GET', async() => {
    const caster = await Caster.insert({ name: 'drool' });

    const response = await request(app)
      .get(`/api/v1/casters/${caster.id}`);

    expect(response.body).toEqual(caster);
  });

  it('updates a caster by id via PUT', async() => {
    const caster = await Caster.insert({ name: 'drool' });

    const response = await request(app)
      .put(`/api/v1/casters/${caster.id}`)
      .send({
        name: 'peg'
      });

    expect(response.body).toEqual({
      ...caster,
      name: 'peg'
    });
  });

  it('deletes a caster by id via DELETE', async() => {
    const caster = await Caster.insert({ name: 'iggy' });

    const response = await request(app)
      .delete(`/api/v1/casters/${caster.id}`);

    expect(response.text).toEqual(`caster with id of ${caster.id} has been deleted`);
  });

});
