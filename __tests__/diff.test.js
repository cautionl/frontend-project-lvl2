import genDiff from '../src/diff.js';

test('genGiff', () => {
  const flatJson1 = './__fixtures__/one.json';
  const flatJson2 = './__fixtures__/two.json';
  const flatYaml1 = './__fixtures__/one.yaml';
  const flatYaml2 = './__fixtures__/two.yaml';
  expect(genDiff(flatJson1, flatJson2)).toEqual('{\n-follow: false\nhost: hexlet.io\n-proxy: 123.234.53.22\n-timeout: 50\n+timeout: 20\n+verbose: true\n}');
  expect(genDiff(flatYaml1, flatYaml2)).toEqual('{\n-follow: false\nhost: hexlet.io\n-proxy: 123.234.53.22\n-timeout: 50\n+timeout: 20\n+verbose: true\n}');
});