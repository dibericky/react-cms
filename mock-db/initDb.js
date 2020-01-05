/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { join } = require('path');


fs.readdir(join(__dirname, 'initial'), (err, files) => {
  if (err) throw err;
  const databasesPath = join(__dirname, 'databases');
  fs.mkdirSync(databasesPath, { recursive: true });
  for (const file of files) {
    const initialData = fs.readFileSync(join(__dirname, 'initial', file));
    fs.writeFileSync(join(__dirname, 'databases', file), initialData);
  }
});
