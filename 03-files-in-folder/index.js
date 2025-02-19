const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(
  folderPath,
  {
    withFileTypes: true,
  },
  (err, files) => {
    if (err) {
      return console.error(err);
    }
    files.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(folderPath, `${file.name}`);
        logFileInfo(filePath, file);
      }
    });
  },
);

function logFileInfo(filePath, file) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      return console.error(err.message);
    }
    const fileName = path.parse(file.name).name;
    const fileExt = path.parse(file.name).ext.slice(1);

    console.log(`${fileName} - ${fileExt} - ${stats.size} bytes`);
  });
}
