import fs from 'fs';
import genDiff from '../src/index.js';

const nestedJson1 = './__fixtures__/one.json';
const nestedJson2 = './__fixtures__/two.json';
const nestedYaml1 = './__fixtures__/one.yaml';
const nestedYaml2 = './__fixtures__/two.yaml';

test('Json', () => {
  const resultJson = fs.readFileSync('./__fixtures__/expect-json.txt', 'utf-8');
  expect(genDiff(nestedJson1, nestedJson2)).toEqual(resultJson);
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
