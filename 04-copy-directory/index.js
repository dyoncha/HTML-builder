const fs = require('node:fs/promises');
const path = require('node:path');

async function copyFiles(sourceFolder, folderCopy) {
  try {
    const files = await fs.readdir(sourceFolder);

    await fs.mkdir(folderCopy, { recursive: true });

    for (let file of files) {
      const sourceFile = path.join(sourceFolder, file);
      const fileCopy = path.join(folderCopy, file);

      await fs.copyFile(sourceFile, fileCopy);
      console.log(`${path.basename(sourceFile)} copied successfully.`);
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

const sourceFolderPath = path.join(__dirname, 'files');
const folderCopyPath = path.join(__dirname, 'files-copy');

copyFiles(sourceFolderPath, folderCopyPath);
