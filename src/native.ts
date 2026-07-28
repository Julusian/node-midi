import pkgPrebuilds from 'pkg-prebuilds'
import path from 'path'

// @ts-expect-error No types
// eslint-disable-next-line n/no-missing-import
import bindingOptions from '../binding-options.js'

let loadedBinding: any = undefined
let loadError: Error | undefined = undefined

// Attempt to load the native binding at import time, but capture any failure
// instead of throwing. This lets consumers (notably the `/lazy` entry) keep using
// the pure-JS surface (constants, message parser) on systems where the native
// dependencies (e.g. libasound) are unavailable. The error is re-thrown lazily,
// only when the native binding is actually needed.
try {
	loadedBinding = pkgPrebuilds(path.join(__dirname, '..'), bindingOptions)
} catch (e) {
	// Normalise to an Error so `loadError` is always truthy when the load failed,
	// even if something falsy was thrown.
	loadError = e instanceof Error ? e : new Error(String(e))
}

/** Returns the loaded native binding, throwing the captured load error if it failed to load. */
export function getNativeBinding(): any {
	if (loadError) throw loadError
	return loadedBinding
}

/**
 * Verify that the native library loaded successfully.
 * Throws the underlying load error if it did not.
 */
export function verifyLibraryLoaded(): void {
	getNativeBinding()
}
