import getTreeData from './treeData.js';
import getData from './parse.js';
import formatter from './ formatters /index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const dataPresentation = getTreeData(data1, data2);
  return formatter(dataPresentation, format);
};

export default genDiff;
