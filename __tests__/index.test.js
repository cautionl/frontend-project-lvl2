import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylish = readFile('stylish.txt');
const plain = readFile('plain.txt');
const json = readFile('json.txt');

describe('Tests', () => {
  test.each([
    ['one.json', 'two.json'],
    ['one.yaml', 'two.yaml'],
  ])('returns $expected differences between $a and $b', (a, b) => {
    const filepath1 = getFixturePath(a);
    const filepath2 = getFixturePath(b);
    expect(genDiff(filepath1, filepath2)).toBe(stylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(plain);
    expect(genDiff(filepath1, filepath2, 'json')).toBe(json);
  });
});
