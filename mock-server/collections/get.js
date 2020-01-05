/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { join } = require('path');

module.exports = (req, res) => {
  const DB_PATH = join(__dirname, '..', '..', 'mock-db', 'databases');
  fs.readdir(DB_PATH, (err, files) => {
    if (err) throw err;
    const toOmit = ['configs.json', 'custom-views.json'];
    const collectionsFilesName = files.filter((name) => !toOmit.includes(name));
    const collections = {};
    for (const fileName of collectionsFilesName) {
      const collection = fs.readFileSync(join(DB_PATH, fileName));
      collections[fileName.replace('.json', '')] = JSON.parse(collection);
    }
    res.send(collections);
  });
};
