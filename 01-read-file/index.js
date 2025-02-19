const fs = require('fs');
const path = require('path');

function readFile() {
  const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
  let data = '';

  stream.on('data', (chunk) => (data += chunk));
  stream.on('end', () => console.log(data));
  stream.on('error', (err) => console.error('Error:', err));
}

readFile();
