const fs = require('node:fs/promises');
const path = require('node:path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');

async function writeFile(filePath) {
  try {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on('line', async (data) => {
      if (data.toLowerCase() === 'exit') {
        console.log('Exiting...');
        rl.close();
        return;
      }

      await fs.appendFile(filePath, data + '\n');
      console.log(`'${data}' added to file`);
    });

    rl.on('close', () => {
      console.log(`File writing completed.`);
    });

    console.log('Enter data (type "exit" to quit):');
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

writeFile(filePath);
