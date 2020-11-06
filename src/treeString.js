const treeStr = (data) => {
  const resultStr = data.map((obj) => {
    if (obj.children !== undefined) {
      return `${obj.key}: ${treeStr(obj.children)}\n`;
    }
    if (obj.status === 'unchanged') {
      return `${obj.key}: ${obj.value}\n`;
    }
    if (obj.status === 'changed') {
      return `- ${obj.key}: ${obj.oldValue}\n+ ${obj.key}: ${obj.newValue}\n`;
    }
    if (obj.status === 'add') {
      return `+ ${obj.key}: ${obj.value}\n`;
    }
    return `- ${obj.key}: ${obj.value}\n`;
  });
  return `{\n${resultStr.join('')}}`;
};

export default treeStr;
