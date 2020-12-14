module.exports = class Spell {
  id;
  name;
  
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }

  
};
