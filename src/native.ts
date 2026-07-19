import pkgPrebuilds from 'pkg-prebuilds'
import path from 'path'

// @ts-expect-error No types
// eslint-disable-next-line n/no-missing-import
import bindingOptions from '../binding-options.js'

export const midi = pkgPrebuilds(path.join(__dirname, '..'), bindingOptions)
