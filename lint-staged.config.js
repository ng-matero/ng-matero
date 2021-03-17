module.exports = {
  '**/*.ts?(x)': [
    filenames =>
      filenames.length > 10
        ? 'ng lint'
        : `tslint --format verbose --project ./tsconfig.json --config ./tslint.json ${filenames.join(
            ' '
          )}`,
    'prettier --write',
  ],
  'src/*.scss': filenames => `stylelint --syntax scss ${filenames.join(' ')}`,
  '*.{html,js,json,md,yml}': filenames => `git add ${filenames.join(' ')}`,
};
