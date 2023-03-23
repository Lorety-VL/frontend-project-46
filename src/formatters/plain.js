import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return typeof (value) === 'string' ? `'${value}'` : `${value}`;
};

const plain = (tree, pathMain = []) => tree.flatMap((node) => {
  const path = [...pathMain, node.key].join('.');
  switch (node.type) {
    case 'nested':
      return plain(node.value, [path]);
    case 'added':
      return `Property '${path}' was added with value: ${getValue(node.value)}`.trimEnd();
    case 'deleted':
      return `Property '${path}' was removed`.trimEnd();
    case 'changed':
      return [
        `Property '${path}' was updated. `,
        `From ${getValue(node.value1)} to ${getValue(node.value2)}`.trimEnd(),
      ].join('');
    case 'unChanged':
      return [];
    default:
      throw new Error('unknown type of key');
  }
}).join('\n');

export default plain;
