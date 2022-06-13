module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-scss',
  rules: {
    indentation: 2,
    'no-descending-specificity': null,
    'selector-class-pattern': '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$',
  },
}
