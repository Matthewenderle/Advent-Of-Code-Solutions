import path from 'path';
import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const createMode = args.includes('-create');

async function run() {
  if (args.length === 0) {
    console.error('Usage: node index.js <year>/<day>');
    console.error('Or to create a new file for this day:\n       node index.js <year>/<day> -create');
    process.exit(1);
  }

  const [year, day] = args[0].split('/');
  if (!year || !day) {
    console.error('Invalid argument format. Expected <year>/<day>');
    process.exit(1);
  }

  if (createMode) createDayFolder(args[0]);

  return checkAndRunModule(path.join(__dirname, year, `day-${day}`, 'index.js'), args[0]);
}

run();

function createDayFolder(date) {
  const [year, day] = date.split('/');
  if (!year || !day) {
    console.error('Invalid date format. Expected <year>/<day>');
    return;
  }

  const folderPath = path.join(__dirname, year, `day-${day}`);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
    return copyTemplateFile(args[0]);
  } else {
    console.log(`Folder already exists: ${folderPath}`);
  }
}

function copyTemplateFile(date) {
  const [year, day] = date.split('/');
  const folderPath = path.join(__dirname, year, `day-${day}`);
  const templatePath = path.join(__dirname, 'templates', 'index.js');
  const destinationPath = path.join(folderPath, 'index.js');

  if (fs.existsSync(templatePath)) {
    fs.copyFileSync(templatePath, destinationPath);
    console.log(`Copied template to: ${destinationPath}`);
  } else {
    console.error(`Template file not found: ${templatePath}`);
  }

  const inputDevPath = path.join(folderPath, 'input-dev.txt');
  const inputPath = path.join(folderPath, 'input.txt');

  fs.writeFileSync(inputDevPath, '');
  fs.writeFileSync(inputPath, '');

  console.log(`Created blank input files: ${inputDevPath}, ${inputPath}`);
}

async function checkAndRunModule(dayModulePath, date) {
  if (!fs.existsSync(dayModulePath)) {
    console.error(`Module file not found: ${dayModulePath}`);
    console.error(`You must create it using the 'node index.js <year>/<day> -create' command.`);
    process.exit(1);
  }

  try {
    let modulePath = dayModulePath;
    if (process.platform === 'win32') {
      modulePath = pathToFileURL(dayModulePath).href;
    }
    const dayModule = await import(modulePath);
    if (typeof dayModule.default === 'function') {
      dayModule.default(date);
    } else {
      console.error(`No default export function found in ${dayModulePath}`);
    }
  } catch (error) {
    console.error(`Failed to load module ${dayModulePath}:`, error);
  }
}
