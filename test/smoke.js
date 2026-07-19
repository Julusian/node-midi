// Hosted Linux CI runners run an Azure cloud kernel built without ALSA, so
// there is no /dev/snd/seq and RtMidi cannot open (virtual) ports. This smoke
// test just asserts that the prebuilt native addon loads for the current
// Node.js version - catching prebuild breakage (glibc floor, libasound
// linkage, N-API ABI) without needing a working sequencer.
var midi = require('../dist/midi.js')

if (typeof midi.Input !== 'function' || typeof midi.Output !== 'function') {
	console.error('midi module loaded but is missing expected exports')
	process.exit(1)
}

console.log('native addon loaded ok')
