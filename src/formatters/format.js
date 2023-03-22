import stylish from './stylish.js';

const makeFormat = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error('unknown format');
  }
};

export default makeFormat;
