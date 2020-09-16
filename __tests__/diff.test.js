import genDiff from '../src/diff.js';

test('genGiff', () => {
  const result = '/home/vladimir/file.json';
  const result1 = '/home/vladimir/file1.json';
  expect(genDiff(result, result1)).toEqual('{\n-follow: false\nhost: hexlet.io\n-proxy: 123.234.53.22\n-timeout: 50\n+timeout: 20\n+verbose: true\n}');
});