import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylish = readFixture('stylish.txt');
const plain = readFixture('plain.txt');
const json = readFixture('json.txt');

test.each([
  ['json'],
  ['yaml'],
])('returns $expected differences between $a and $b', (format) => {
  const filepath1 = getFixturePath(`one.${format}`);
  const filepath2 = getFixturePath(`two.${format}`);
  expect(genDiff(filepath1, filepath2)).toBe(stylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(plain);
  expect(genDiff(filepath1, filepath2, 'json')).toBe(json);
});
