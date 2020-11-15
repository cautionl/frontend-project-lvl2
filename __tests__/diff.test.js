import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import genDiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const nestedJson1 = getFixturePath('one.json');
const nestedJson2 = './__fixtures__/two.json';
const nestedYaml1 = './__fixtures__/one.yaml';
const nestedYaml2 = './__fixtures__/two.yaml';

test('Json', () => {
  expect(genDiff(nestedJson1, nestedJson2)).toEqual(readFile('./__fixtures__/expect-json.txt'));
});

test('Yaml', () => {
  const resultJson = fs.readFileSync('./__fixtures__/expect-json.txt', 'utf-8');
  expect(genDiff(nestedYaml1, nestedYaml2)).toEqual(resultJson);
});

test('Plain', () => {
  const resultPlain = fs.readFileSync('./__fixtures__/expect-plain.txt', 'utf-8');
  expect(genDiff(nestedYaml1, nestedYaml2, 'plain')).toEqual(resultPlain);
  expect(genDiff(nestedJson1, nestedJson2, 'plain')).toEqual(resultPlain);
});

test('json', () => {
  const result = fs.readFileSync('./__fixtures__/expect-json-format.txt', 'utf-8');
  expect(genDiff(nestedYaml1, nestedYaml2, 'json')).toEqual(result);
  expect(genDiff(nestedJson1, nestedJson2, 'json')).toEqual(result);
});
