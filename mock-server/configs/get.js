const fs = require('fs');
const { join } = require('path');


module.exports = (req, res) => {
  const PATH = join(__dirname, '..', '..', 'mock-db', 'databases', 'configs.json');
  fs.readFile(PATH, (err, data) => {
    res.send(JSON.parse(data));
  });
};
