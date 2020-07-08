const rollup = require('rollup');
const path = require('path');
const { terser } = require('rollup-plugin-terser');

const getConfig = require('./config');
const { name } = require('../package.json');
const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath);
};

const buildConfigInfo = {
  debug: {
    input: resolveFile('src/module/core.ts'),
    output: {
      file: resolveFile(`dist/${name}-debug.esm.js`),
      format: 'es',
    },
  },
  core: {
    input: resolveFile('src/module/core.ts'),
    output: {
      file: resolveFile(`dist/${name}-core.esm.js`),
      format: 'es',
    },
    // plugins: [terser()],
  },
  axios: {
    input: resolveFile('src/index.ts'),
    output: {
      file: resolveFile(`dist/${name}.esm.js`),
      format: 'es',
    },
    // plugins: [terser()],
  },
  taro: {
    input: resolveFile('src/index-taro.ts'),
    output: {
      file: resolveFile(`dist/${name}-taro.esm.js`),
      format: 'es',
    },
    // plugins: [terser()],
  },
};

const buildConfig = Object.keys(buildConfigInfo).map((name) =>
  getConfig(
    Object.assign({}, buildConfigInfo[name], {
      plugins: [...(buildConfigInfo[name].plugins || [])],
    })
  )
);
console.log(buildConfig);
module.exports = buildConfig;
