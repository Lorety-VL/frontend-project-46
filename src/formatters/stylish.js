const getSpecialSymbol = ({ typeOfKey }) => {
  switch (typeOfKey) {
    case 'same':
      return '  ';
    case 'added':
      return '+ ';
    case 'deleted':
      return '- ';
    default:
      throw new Error('unknown type of key');
  }
};

const stylish = (tree, level = 1) => {
  const space = ' '.repeat(level * 4 - 2);
  const specialSymbol = getSpecialSymbol(tree);
  if (tree.type === 'file') {
    const actualValue = tree.value === '' ? ':' : `: ${tree.value}`;
    return `${space}${specialSymbol}${tree.keyName}${actualValue}`;
  }
  const { childrens } = tree;
  const nestedLines = childrens.reduce((acc, node) => [...acc, stylish(node, level + 1)], []).join('\n');

  return `${space}${specialSymbol}${tree.keyName}: {\n${nestedLines}\n${space}  }`;
};
const connect = (tree) => {
  const str = tree.map((node) => stylish(node)).join('\n');
  return `{\n${str}\n}`;
};

export default connect;
