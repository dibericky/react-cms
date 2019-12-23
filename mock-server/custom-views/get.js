const fs = require('fs');
const { join } = require('path');

module.exports = (req, res) => {
  fs.readFile(join(__dirname, '..', '..', 'mock-db', 'db.json'), (err, data) => {
    const db = JSON.parse(data);
    res.send(db['custom-views']);
  });
};
