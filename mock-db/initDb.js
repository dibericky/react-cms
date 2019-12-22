const fs = require('fs');
const { join } = require('path');

const initialData = fs.readFileSync(join(__dirname, 'initialDb.json'));
fs.writeFileSync(join(__dirname, 'db.json'), initialData);
