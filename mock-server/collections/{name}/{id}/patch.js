const fs = require('fs');
const { join } = require('path');

module.exports = (req, res) => {
  const { name, id } = req.params;
  const dbPath = join(__dirname, '..', '..', '..', '..', 'mock-db', 'db.json');
  fs.readFile(dbPath, (err, data) => {
    const db = JSON.parse(data);
    const indexItem = db.collections[name].findIndex((item) => item.id === id);
    if (indexItem === -1) {
      return res.status(204);
    }
    const currentValues = db.collections[name][indexItem];
    const newValues = {
      ...currentValues,
      ...JSON.parse(req.body),
    };
    db.collections[name][indexItem] = newValues;
    fs.writeFileSync(dbPath, JSON.stringify(db));
    return res.send(newValues);
  });
};
