const fs = require('fs');
const { join } = require('path');

module.exports = (req, res) => {
  const { name, id } = req.params;
  const dbPath = join(__dirname, '..', '..', '..', '..', 'mock-db', 'databases', `${name}.json`);
  fs.readFile(dbPath, (err, data) => {
    const db = JSON.parse(data);
    const configsDb = fs.readFileSync(join(__dirname, '..', '..', '..', '..', 'mock-db', 'databases', 'configs.json'));
    const configs = JSON.parse(configsDb);
    const primaryKeyName = configs[name].find((col) => col.primaryKey).name;

    const indexItem = db.findIndex((item) => item[primaryKeyName] === id);
    if (indexItem === -1) {
      return res.status(204).send();
    }
    const currentValues = db[indexItem];
    const newValues = {
      ...currentValues,
      ...JSON.parse(req.body),
    };
    db[indexItem] = newValues;
    fs.writeFileSync(dbPath, JSON.stringify(db));
    return res.send(newValues);
  });
};
