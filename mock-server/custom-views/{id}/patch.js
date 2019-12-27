const fs = require('fs');
const { join } = require('path');

module.exports = (req, res) => {
  const { id } = req.params;
  const dbPath = join(__dirname, '..', '..', '..', 'mock-db', 'db.json');
  fs.readFile(dbPath, (err, data) => {
    const db = JSON.parse(data);
    const customViews = db['custom-views'];

    const newCustomView = {
      id,
      ...JSON.parse(req.body),
    };
    const newDb = {
      ...db,
      'custom-views': {
        ...customViews,
        [id]: {
          ...db['custom-views'][id],
          ...newCustomView,
        },
      },
    };
    fs.writeFileSync(dbPath, JSON.stringify(newDb));
    res.send(newCustomView);
  });
};
