module.exports = {
  '*.{js,ts}': ['eslint --quiet --fix', 'prettier --write'],
  '*.{css,scss}': 'stylelint --quiet --fix',
  '*.{html,json,md,yml}': filenames => `git add ${filenames.join(' ')}`,
};
