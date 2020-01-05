/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { join } = require('path');

module.exports = (req, res) => {
  const DB_PATH = join(__dirname, '..', '..', 'mock-db', 'databases');
  fs.readdir(DB_PATH, (err, files) => {
    if (err) throw err;
    const toOmit = ['configs.json', 'custom-views.json'];
    const collectionsFilesName = files.filter((name) => !toOmit.includes(name));

    res.send(collectionsFilesName.map((file) => file.replace('.json', '')));
  });
};
