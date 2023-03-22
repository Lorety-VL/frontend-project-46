import _ from 'lodash';

const toStr = (nodeValue, depth) => {
  const indient = ' '.repeat(4 * (depth + 1));
  const indientBracket = ' '.repeat(4 * depth);
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

const stylish = (trees, depthMain = 0) => {
  const iter = (tree, depth = depthMain) => {
    const indient = ' '.repeat(4 * depth);
    switch (tree.type) {
      case 'nested':
        return `${indient}    ${tree.key}: ${stylish(tree.value, depth + 1)}`.trimEnd();
      case 'added':
        return `${indient}  + ${tree.key}: ${toStr(tree.value, depth + 1)}`.trimEnd();
      case 'deleted':
        return `${indient}  - ${tree.key}: ${toStr(tree.value, depth + 1)}`.trimEnd();
      case 'same':
        return `${indient}    ${tree.key}: ${toStr(tree.value, depth + 1)}`.trimEnd();
      case 'diff':
        return [
          `${indient}  - ${tree.key}: ${toStr(tree.value1, depth + 1)}`.trimEnd(),
          `${indient}  + ${tree.key}: ${toStr(tree.value2, depth + 1)}`.trimEnd(),
        ].join('\n');
      default:
        throw new Error('unknown type of key');
    }
  };
  const str = trees.map((node) => iter(node)).join('\n');
  return `{\n${str}\n${' '.repeat(4 * depthMain)}}`;
};

export default stylish;
