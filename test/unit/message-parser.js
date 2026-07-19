var should = require('should')
var { MidiMessageParser } = require('../../dist/message-parser')

// The native binding delivers a long sysex in multiple chunks, and delivers
// interleaved system realtime messages (clock, active sensing, ...) as their own
// separate callbacks. MidiMessageParser is the device-independent unit that turns
// those raw buffers into the parsed events Input exposes, so it can be tested directly.
describe('MidiMessageParser', function () {
	var parser
	var events

	beforeEach(function () {
		parser = new MidiMessageParser()
		events = []
		for (var name of ['sysex', 'noteon', 'noteoff', 'cc']) {
			;(function (name) {
				parser.on(name, function () {
					events.push([name, Array.prototype.slice.call(arguments)])
				})
			})(name)
		}
	})

	function eventsOfType(type) {
		return events.filter(function (e) {
			return e[0] === type
		})
	}

	function feed(bytes) {
		parser.handleMessage(0, Buffer.from(bytes))
	}

	it('emits nothing for an empty message', function () {
		feed([])
		events.length.should.eql(0)
	})

	describe('channel messages', function () {
		it('parses note on with channel and deltaTime', function () {
			parser.handleMessage(1.5, Buffer.from([0x92, 0x40, 0x7f]))

			var noteon = eventsOfType('noteon')
			noteon.length.should.eql(1)
			noteon[0][1].should.eql([0x40, 0x7f, { channel: 0x02, deltaTime: 1.5 }])
		})

		it('parses note off', function () {
			feed([0x81, 0x30, 0x00])

			var noteoff = eventsOfType('noteoff')
			noteoff.length.should.eql(1)
			noteoff[0][1].should.eql([0x30, 0x00, { channel: 0x01, deltaTime: 0 }])
		})

		it('parses control change', function () {
			feed([0xb0, 0x07, 0x64])

			var cc = eventsOfType('cc')
			cc.length.should.eql(1)
			cc[0][1].should.eql([0x07, 0x64, { channel: 0x00, deltaTime: 0 }])
		})
	})

	describe('sysex', function () {
		it('emits a single-chunk sysex in one event', function () {
			feed([0xf0, 0x7d, 0x01, 0x02, 0xf7])

			var sysex = eventsOfType('sysex')
			sysex.length.should.eql(1)
			sysex[0][1][0].should.eql(Buffer.from([0xf0, 0x7d, 0x01, 0x02, 0xf7]))
		})

		it('reassembles a sysex split across multiple chunks', function () {
			feed([0xf0, 0x01, 0x02])
			feed([0x03, 0x04])
			feed([0x05, 0xf7])

			var sysex = eventsOfType('sysex')
			sysex.length.should.eql(1)
			sysex[0][1][0].should.eql(Buffer.from([0xf0, 0x01, 0x02, 0x03, 0x04, 0x05, 0xf7]))
		})

		it('does not drop sysex data when realtime messages are interleaved', function () {
			// This is the regression: clock / active-sensing arriving mid-transfer must
			// not discard the pending sysex buffer.
			feed([0xf0, 0x01, 0x02]) // sysex begins
			feed([0xf8]) // MIDI clock tick between chunks
			feed([0x03, 0x04]) // more sysex data
			feed([0xfe]) // active sensing between chunks
			feed([0x05, 0xf7]) // sysex completes

			var sysex = eventsOfType('sysex')
			sysex.length.should.eql(1)
			sysex[0][1][0].should.eql(Buffer.from([0xf0, 0x01, 0x02, 0x03, 0x04, 0x05, 0xf7]))
		})

		it('discards a pending sysex when a non-realtime status byte interrupts it', function () {
			feed([0xf0, 0x01, 0x02])
			// A channel message (note on) is not valid mid-sysex and aborts it.
			feed([0x90, 0x40, 0x7f])
			// The note on is still parsed...
			eventsOfType('noteon').length.should.eql(1)
			// ...and this orphaned data must not resurrect the aborted sysex.
			feed([0x03, 0xf7])

			eventsOfType('sysex').length.should.eql(0)
		})
	})
})
