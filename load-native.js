// This loader deliberately lives at the package root.
//
// `pkg-prebuilds` resolves the native binary relative to the base path it is
// given, looking for `<base>/prebuilds/...` (and `<base>/build/Release/...`).
// The prebuilt binaries and the `build/` output both live at the package root,
// so the base path needs to be the package root.
//
// Previously this was done from the compiled `dist/native.js` with
// `path.join(__dirname, '..')`. That works for a plain `node_modules` install,
// but breaks when the library is bundled by esbuild/webpack: the bundler inlines
// `dist/native.js` into the output, so `__dirname` no longer points at the
// installed package and the `..` climb resolves to the wrong directory. Bundler
// native-asset plugins also cannot follow the computed `path.join(__dirname, '..')`
// expression to copy the `prebuilds/` directory next to the output.
//
// Keeping the lookup in a real CommonJS module at the root means the base path is
// simply this file's `__dirname` (the package root) with no `..` traversal, which
// bundler asset relocators can trace so the `prebuilds/` directory is copied and
// the binary is resolved relative to `./`.
const pkgPrebuilds = require('pkg-prebuilds')
const bindingOptions = require('./binding-options.js')

/** Load the native binding, resolving prebuilds relative to the package root. */
module.exports = function loadNativeBinding() {
	return pkgPrebuilds(__dirname, bindingOptions)
}
