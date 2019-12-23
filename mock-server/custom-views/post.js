const fs = require('fs');
const { join } = require('path');
const uuid = require('uuid/v4');

module.exports = (req, res) => {
  const dbPath = join(__dirname, '..', '..', 'mock-db', 'db.json');
  fs.readFile(dbPath, (err, data) => {
    const db = JSON.parse(data);
    const customViews = db['custom-views'];
    const id = uuid();
    const newCustomView = {
      id,
      ...JSON.parse(req.body),
    };
    const newDb = {
      ...db,
      'custom-views': {
        ...customViews,
        [id]: newCustomView,
      },
    };
    fs.writeFileSync(dbPath, JSON.stringify(newDb));
    res.send(newCustomView);
  });
};
