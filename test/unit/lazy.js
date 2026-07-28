var should = require('should')

// The `/lazy` entry point must be importable without loading the native binding,
// so that the pure-JS surface (constants) stays usable even when the native
// dependencies (e.g. libasound) are unavailable. Importing it must never throw.
var lazy = require('../../dist/lazy')

describe('lazy entry point', function () {
	it('exposes the constants without needing the native binding', function () {
		lazy.Constants.should.have.properties(['Instruments', 'Drums', 'Notes', 'Messages'])
	})

	it('exposes Input and Output', function () {
		;(typeof lazy.Input).should.equal('function')
		;(typeof lazy.Output).should.equal('function')
	})

	it('exposes verifyLibraryLoaded as a function', function () {
		;(typeof lazy.verifyLibraryLoaded).should.equal('function')
	})
})
