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

const stylish = (tree, depthMain = 1) => {
  const iter = (node, depth = depthMain) => {
    const indient = ' '.repeat(4 * depth - 2);
    switch (node.type) {
      case 'nested':
        return `${indient}  ${node.key}: ${stylish(node.value, depth + 1)}`;
      case 'added':
        return `${indient}+ ${node.key}: ${toStr(node.value, depth + 1)}`;
      case 'deleted':
        return `${indient}- ${node.key}: ${toStr(node.value, depth + 1)}`;
      case 'same':
        return `${indient}  ${node.key}: ${toStr(node.value, depth + 1)}`;
      case 'diff':
        return [
          `${indient}- ${node.key}: ${toStr(node.value1, depth + 1)}`.trimEnd(),
          `${indient}+ ${node.key}: ${toStr(node.value2, depth + 1)}`,
        ].join('\n');
      default:
        throw new Error('unknown type of key');
    }
  };
  const str = tree.map((node) => iter(node).trimEnd()).join('\n');
  return `{\n${str}\n${' '.repeat(4 * (depthMain - 1))}}`;
};

export default stylish;
