import genDiff, { readFile } from '../src/index.js';

const Json1 = 'one.json';
const Json2 = 'two.json';
const Yaml1 = 'one.yaml';
const Yaml2 = 'two.yaml';
const stylish = readFile('stylish.txt');
const plain = readFile('plain.txt');
const json = readFile('json.txt');

describe('Stylish', () => {
  test.each`
  a        | b        | expected
  ${Yaml1} | ${Yaml2} | ${stylish}
  ${Json1} | ${Json2} | ${stylish}
  ${Yaml1} | ${Json2} | ${stylish}
  ${Json1} | ${Yaml2} | ${stylish}
`('returns $expected differences between $a and $b', ({ a, b, expected }) => {
    expect(genDiff(a, b)).toBe(expected);
  });
});

describe('Plain', () => {
  test.each`
  a        | b        | expected
  ${Yaml1} | ${Yaml2} | ${plain}
  ${Json1} | ${Json2} | ${plain}
  ${Yaml1} | ${Json2} | ${plain}
  ${Json1} | ${Yaml2} | ${plain}
`('returns $expected differences between $a and $b', ({ a, b, expected }) => {
    expect(genDiff(a, b, 'plain')).toBe(expected);
  });
});

describe('Json', () => {
  test.each`
  a        | b        | expected
  ${Yaml1} | ${Yaml2} | ${json}
  ${Json1} | ${Json2} | ${json}
  ${Yaml1} | ${Json2} | ${json}
  ${Json1} | ${Yaml2} | ${json}
`('returns $expected differences between $a and $b', ({ a, b, expected }) => {
    expect(genDiff(a, b, 'json')).toBe(expected);
  });
});
