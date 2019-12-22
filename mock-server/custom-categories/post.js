const fs = require('fs');
const { join } = require('path');
const uuid = require('uuid/v4');

module.exports = (req, res) => {
  const dbPath = join(__dirname, '..', '..', 'mock-db', 'db.json');
  fs.readFile(dbPath, (err, data) => {
    const db = JSON.parse(data);
    const customCategories = db['custom-categories'];
    const id = uuid();
    const newCustomCategory = {
      id,
      ...JSON.parse(req.body),
    };
    const newDb = {
      ...db,
      'custom-categories': {
        ...customCategories,
        [id]: newCustomCategory,
      },
    };
    fs.writeFileSync(dbPath, JSON.stringify(newDb));
    res.send(newCustomCategory);
  });
};
