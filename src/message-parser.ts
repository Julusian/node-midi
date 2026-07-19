import { EventEmitter } from 'events'

/** Message names, including CCs */
import { Messages } from './messages.js'

export interface MidiEventInfo {
	channel: number
	deltaTime: number
}

/** The parsed events {@link MidiMessageParser} understands and emits. */
export type MidiMessageParserEvents = {
	sysex: [bytes: Buffer]

	noteon: [note: number, velocity: number, info: MidiEventInfo]
	noteoff: [note: number, velocity: number, info: MidiEventInfo]
	cc: [param: number, value: number, info: MidiEventInfo]
}

/**
 * Parses the raw MIDI messages delivered by the native binding into higher-level events,
 * reassembling multi-chunk sysex transfers along the way.
 *
 * This is split out from `Input` so the parsing logic can be exercised directly, without a
 * physical (or virtual) MIDI device: feed it buffers via {@link handleMessage} and listen
 * for the resulting events. It deals only with parsing; the raw `message`/`messageBuffer`
 * passthrough events are `Input`'s concern, not this class's.
 */
export class MidiMessageParser extends EventEmitter<MidiMessageParserEvents> {
	#pendingSysexBuffer: Buffer | null = null

	/** Feed one raw message, as delivered by the native binding, emitting any parsed events. */
	handleMessage(deltaTime: number, message: Buffer): void {
		if (message.byteLength === 0) return
		const lastByte = message[message.byteLength - 1]

		// a long sysex can be sent in multiple chunks, depending on the RtMidi buffer size
		let proceed = true
		if (this.#pendingSysexBuffer) {
			// If first byte is valid midi (7bit data)
			if (message[0] < 0x80) {
				this.#pendingSysexBuffer = Buffer.concat([this.#pendingSysexBuffer, message])
				if (lastByte === 0xf7) {
					this.emit('sysex', this.#pendingSysexBuffer)
					this.#pendingSysexBuffer = null
				}
				proceed = false
			} else if (message[0] >= 0xf8) {
				// System realtime messages (clock 0xf8, active sensing 0xfe, etc.) are
				// legal in the middle of a sysex transfer, and RtMidi delivers them as
				// separate callbacks. Skip them without discarding the pending buffer so
				// the sysex can continue reassembling from the following chunks.
				proceed = false
			} else {
				// ignore invalid sysex messages
				this.#pendingSysexBuffer = null
			}
		}
		if (proceed) {
			// Sysex
			if (message[0] === 0xf0) {
				if (lastByte === 0xf7) {
					// Full
					this.emit('sysex', message)
				} else {
					// Partial
					this.#pendingSysexBuffer =
						// eslint-disable-next-line n/no-unsupported-features/node-builtins
						typeof Buffer.copyBytesFrom === 'function' ? Buffer.copyBytesFrom(message) : Buffer.concat([message]) // Clone buffer
				}
				return
			}

			const channel = message[0] & 0x0f
			const type = message[0] & 0xf0
			if (type === Messages.NOTE_ON) {
				this.emit('noteon', message[1], message[2], { channel, deltaTime })
			} else if (type === Messages.NOTE_OFF) {
				this.emit('noteoff', message[1], message[2], { channel, deltaTime })
			} else if (type === Messages.SET_PARAMETER) {
				this.emit('cc', message[1], message[2], { channel, deltaTime })
			} else {
				// Future: more message types
				//
				// const data = this.parseMessage(message)
				// if (data.type === 'sysex' && lastByte !== 0xf7) {
				// 	this.#pendingSysexBuffer = Buffer.copyBytesFrom(message) // Clone buffer
				// } else {
				// 	data.msg._type = data.type // easy access to message type
				// 	this.emit(data.type, data.msg)
				// 	if (data.type === 'mtc') {
				// 		this.parseMtc(data.msg)
				// 	}
				// }
			}
		}
	}
}
