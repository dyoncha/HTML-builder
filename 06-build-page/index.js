const fs = require('node:fs/promises');
const path = require('node:path');

createProject();

async function createProject() {
  const projectPath = path.join(__dirname, 'project-dist');

  // delete previous build
  try {
    await fs.rm(projectPath, { recursive: true, force: true });
  } catch (error) {
    console.error(error.message);
  }

  await fs.mkdir(projectPath, { recursive: true });

  const assetsTarget = path.join(projectPath, 'assets');
  const assetsSource = path.join(__dirname, 'assets');
  await copyFiles(assetsSource, assetsTarget);

  const stylesTarget = path.join(projectPath);
  const stylesSource = path.join(__dirname, 'styles');
  await builtCSS(stylesSource, stylesTarget);

  const htmlTarget = path.join(projectPath);
  const htmlSource = path.join(__dirname, '');
  await builtHTML(htmlSource, htmlTarget);
}

async function builtHTML(sourceFolder, targetFolder) {
  try {
    const bundleFilePath = path.join(targetFolder, 'index.html');
    const componentsPath = path.join(sourceFolder, 'components');
    const components = await fs.readdir(componentsPath, '');
    let template = await fs.readFile(
      path.join(sourceFolder, 'template.html'),
      'utf-8',
    );

    for (let component of components) {
      const componentName = path.parse(component).name;
      const componentPath = path.join(componentsPath, component);
      const componentContent = await fs.readFile(componentPath, 'utf-8');
      const placeholder = `{{${componentName}}}`;
      template = template.replace(
        new RegExp(placeholder, 'g'),
        componentContent,
      );
    }

    await fs.writeFile(bundleFilePath, template);
    console.log('index.html has been built successfully!');
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function builtCSS(sourceFolder, targetFolder) {
  try {
    const styleFiles = await fs.readdir(sourceFolder);
    const bundleFile = path.join(targetFolder, 'style.css');

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

async function copyFiles(sourceFolder, folderCopy) {
  try {
    const files = await fs.readdir(sourceFolder);

    await fs.mkdir(folderCopy, { recursive: true });

    for (let file of files) {
      const sourceFile = path.join(sourceFolder, file);
      const fileCopy = path.join(folderCopy, file);

      const stat = await fs.stat(sourceFile);

      if (stat.isDirectory()) {
        await copyFiles(sourceFile, fileCopy);
      } else {
        await fs.copyFile(sourceFile, fileCopy);
        console.log(`${path.basename(sourceFile)} copied successfully.`);
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}
