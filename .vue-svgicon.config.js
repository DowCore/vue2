const path = require('path')
const svgFilePaths = ['./src/assets/svg'].map((v) => path.resolve(v))
const tagName = 'svg-icon'

module.exports = {
  tagName,
  svgFilePath: svgFilePaths,
  svgoConfig: {},
  pathAlias: {
    '@svg': svgFilePaths[0],
  },
  transformAssetUrls: {
    [tagName]: ['data'],
  },
}
