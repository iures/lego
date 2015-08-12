var args = require('minimist')(process.argv.slice(2));
var VERSION = args.version || require('../package.json').version;

module.exports = {
  banner:
  '/*!\n' +
  ' * Crowdtap CT Design\n' +
  ' * https://github.com/angular/material\n' +
  ' * @license MIT\n' +
  ' * v' + VERSION + '\n' +
  ' */\n',
  jsBaseFiles: [
    'src/core/**/*.js'
  ],
  jsFiles: [
    'src/**/*.js',
    '!src/**/*.spec.js'
  ],
  mockFiles : [
    'test/crowdtap-ct-mocks.js'
  ],
  themeBaseFiles: [
    'src/core/style/variables.less',
    'src/core/style/mixins.less'
  ],
  lessBaseFiles: [
    'src/core/style/color-palette.less',
    'src/core/style/variables.less',
    'src/core/style/mixins.less',
  ],
  lessStandaloneFiles: [
    'src/core/style/layout.less'
  ],
  paths: 'src/{components,services}/**',
  outputDir: 'dist/',
  demoFolder: 'demo-partials'
};


