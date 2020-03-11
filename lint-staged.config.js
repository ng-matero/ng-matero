module.exports = {
  '**/*.ts?(x)': filenames =>
    filenames.length > 10
      ? 'ng lint'
      : `tslint --format verbose --project ./tsconfig.json --config ./tslint.json ${filenames.join(
          ' '
        )}`,
  'src/*.scss': filenames => `stylelint --syntax scss ${filenames.join(' ')}`,
};
