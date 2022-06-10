module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-scss',
  rules: {
    indentation: 2,
    'no-descending-specificity': null,
  },
}
