// The main entry point re-exports the full surface from the `/lazy` entry, but
// additionally verifies the native binding up-front. This preserves the historical
// fail-fast behaviour: importing `@julusian/midi` throws immediately if the native
// binding is unavailable. Use `@julusian/midi/lazy` to defer that error until the
// native code is actually needed.
export * from './lazy.js'

import { verifyLibraryLoaded } from './lazy.js'

verifyLibraryLoaded()
