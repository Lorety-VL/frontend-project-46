import _ from 'lodash';

const toStr = (nodeValue, depth) => {
  const indient = ' '.repeat(4 * (depth));
  const indientBracket = ' '.repeat(4 * (depth - 1));
  if (!_.isObject(nodeValue)) {
    return `${nodeValue}`;
  }
  const keyVal = Object.entries(nodeValue);
  const lines = keyVal.map(([key, val]) => `${indient}${key}: ${toStr(val, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${indientBracket}}`,
  ].join('\n');
};

const stylish = (tree, depth = 1) => {
  const indient = ' '.repeat(4 * depth - 2);
  const indientBracket = ' '.repeat(4 * (depth - 1));
  const str = tree.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${indient}  ${node.key}: ${stylish(node.value, depth + 1)}`;
      case 'added':
        return `${indient}+ ${node.key}: ${toStr(node.value, depth + 1)}`;
      case 'deleted':
        return `${indient}- ${node.key}: ${toStr(node.value, depth + 1)}`;
      case 'unChanged':
        return `${indient}  ${node.key}: ${toStr(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${indient}- ${node.key}: ${toStr(node.value1, depth + 1)}`,
          `${indient}+ ${node.key}: ${toStr(node.value2, depth + 1)}`,
        ].join('\n');
      default:
        throw new Error('unknown type of key');
    }
  }).join('\n');
  return `{\n${str}\n${indientBracket}}`;
};

export default stylish;
