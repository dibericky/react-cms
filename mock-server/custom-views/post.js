const fs = require('fs');
const { join } = require('path');
const uuid = require('uuid/v4');

module.exports = (req, res) => {
  const dbPath = join(__dirname, '..', '..', 'mock-db', 'databases', 'custom-views.json');
  fs.readFile(dbPath, (err, data) => {
    const customViews = JSON.parse(data);
    const id = uuid();
    const newCustomView = {
      id,
      ...JSON.parse(req.body),
    };
    const newDb = {
      ...customViews,
      [id]: newCustomView,
    };
    fs.writeFileSync(dbPath, JSON.stringify(newDb));
    res.send(newCustomView);
  });
};
