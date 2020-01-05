const fs = require('fs');
const { join } = require('path');
const uuid = require('uuid/v4');

module.exports = (req, res) => {
  const { name } = req.params;
  const dbPath = join(__dirname, '..', '..', '..', 'mock-db', 'databases', `${name}.json`);
  fs.readFile(dbPath, (err, data) => {
    const db = JSON.parse(data);

    return res.send(db);
  });
};
