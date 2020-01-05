const fs = require('fs');
const { join } = require('path');

module.exports = (req, res) => {
  fs.readFile(join(__dirname, '..', '..', 'mock-db', 'databases', 'custom-views.json'), (err, data) => {
    res.send(JSON.parse(data));
  });
};
