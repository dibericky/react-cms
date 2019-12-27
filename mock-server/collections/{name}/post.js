const fs = require('fs');
const { join } = require('path');
const uuid = require('uuid/v4');

module.exports = (req, res) => {
  const { name } = req.params;
  const dbPath = join(__dirname, '..', '..', '..', 'mock-db', 'db.json');
  fs.readFile(dbPath, (err, data) => {
    const db = JSON.parse(data);
    const primaryKeyName = db.configs[name].find((col) => col.primaryKey).name;

    const primaryKeyValue = uuid();
    const newValues = {
      [primaryKeyName]: primaryKeyValue,
      ...JSON.parse(req.body),
    };
    db.collections[name].push(newValues);
    fs.writeFileSync(dbPath, JSON.stringify(db));
    return res.send(newValues);
  });
};
