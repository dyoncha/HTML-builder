const fs = require('node:fs/promises');
const path = require('node:path');

async function mergeStyles(sourceFolder, targetFolder) {
  try {
    const styleFiles = await fs.readdir(sourceFolder);
    const bundleFile = path.join(targetFolder, 'bundle.css');

    await fs.writeFile(bundleFile, '');

    for (let file of styleFiles) {
      const filePath = path.join(sourceFolder, file);
      const fileExtension = path.extname(file);

      if (fileExtension === '.css') {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        await fs.appendFile(bundleFile, fileContent);
        console.log(`Added: ${file}`);
      }
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

const sourceFolderPath = path.join(__dirname, 'styles');
const targetFolder = path.join(__dirname, 'project-dist');

mergeStyles(sourceFolderPath, targetFolder);
