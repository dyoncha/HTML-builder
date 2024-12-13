const fs = require('node:fs/promises');
const path = require('node:path');

async function readFile() {
  const data = await fs.readFile(path.join(__dirname, 'text.txt'));
  console.log(data.toString());
}

readFile();
