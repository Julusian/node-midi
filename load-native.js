// Lives at the package root so prebuilds resolve from `./` (no `../` from dist/), which keeps bundlers happy.
const pkgPrebuilds = require('pkg-prebuilds')
const bindingOptions = require('./binding-options.js')

module.exports = function loadNativeBinding() {
	return pkgPrebuilds(__dirname, bindingOptions)
}
