const fs = require('fs');
const { join } = require('path');

module.exports = (req, res) => {
  const { id } = req.params;
  const dbPath = join(__dirname, '..', '..', '..', 'mock-db', 'databases', 'custom-views.json');
  fs.readFile(dbPath, (err, data) => {
    const customViews = JSON.parse(data);

    const newCustomView = {
      id,
      ...JSON.parse(req.body),
    };
    const newDb = {
      ...customViews,
      [id]: {
        ...customViews[id],
        ...newCustomView,
      },
    };
    fs.writeFileSync(dbPath, JSON.stringify(newDb));
    res.send(newCustomView);
  });
};
