module.exports = {
  '**/*.ts?(x)': filenames =>
    filenames.length > 10
      ? 'ng lint'
      : `tslint --format verbose --project ./tsconfig.base.json --config ./tslint.json ${filenames.join(
          ' '
        )}`,
  'src/*.scss': filenames => `stylelint --syntax scss ${filenames.join(' ')}`,
  '*.{html,md,json,yml,js}': filenames => {
    const prettier = `prettier --write -- ${filenames.join(' ')}`;
    const git = `git add ${filenames.join(' ')}`;
    return [prettier, git];
  },
};
