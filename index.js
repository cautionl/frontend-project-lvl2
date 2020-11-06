import treeData from './src/treeData.js';
import getData from './src/parse.js';
import treeStr from './src/treeString.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const dataPresentation = treeData(data1, data2);
  const result = treeStr(dataPresentation);
  return result;
};

export default genDiff;
