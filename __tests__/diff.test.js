import fs from 'fs';
import genDiff from '../index.js';

test('genGiff', () => {
  const nestedJson1 = './__fixtures__/nestedJson1.json';
  const nestedJson2 = './__fixtures__/nestedJson2.json';
  const resultJson = fs.readFileSync('./__fixtures__/expect-json.txt', 'utf-8');
  expect(genDiff(nestedJson1, nestedJson2)).toEqual(resultJson);
});
