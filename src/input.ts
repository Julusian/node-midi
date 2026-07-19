import Stream from 'stream'
import { EventEmitter } from 'events'
import { MidiMessageParser } from './message-parser.js'
import type { MidiMessageParserEvents } from './message-parser.js'
import { midi } from './native.js'

/**
 * An array of numbers corresponding to the MIDI bytes: [status, data1, data2].
 * See https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html for more info.
 */
export type MidiMessage = number[]

/** The events emitted by {@link Input}: the parser's parsed events plus the raw passthroughs. */
export type MidiInputEvents = MidiMessageParserEvents & {
	message: [deltaTime: number, message: MidiMessage]
	messageBuffer: [deltaTime: number, message: Buffer]
}

export class Input extends EventEmitter<MidiInputEvents> {
	readonly #input: any
	readonly #parser = new MidiMessageParser()

	constructor() {
		super()

		// Forward the parser's parsed events out of the Input itself
		this.#parser.on('sysex', (bytes) => this.emit('sysex', bytes))
		this.#parser.on('noteon', (note, velocity, info) => this.emit('noteon', note, velocity, info))
		this.#parser.on('noteoff', (note, velocity, info) => this.emit('noteoff', note, velocity, info))
		this.#parser.on('cc', (param, value, info) => this.emit('cc', param, value, info))

		this.#input = new midi.Input((deltaTime: number, message: Buffer) => {
			// The raw message passthrough is Input's own concern...
			this.emit('messageBuffer', deltaTime, message)
			this.emit('message', deltaTime, Array.from(message.values()))
			// ...then the parser turns it into the higher-level events.
			this.#parser.handleMessage(deltaTime, message)
		})
	}

	static getPortNames(): string[] {
		return midi.getInputPortNames()
	}

	closePort(): void {
		return this.#input.closePort()
	}
	destroy(): void {
		return this.#input.destroy()
	}
	getPortCount(): number {
		return this.#input.getPortCount()
	}
	getPortName(port: number): string {
		return this.#input.getPortName(port)
	}
	isPortOpen(): boolean {
		return this.#input.isPortOpen()
	}
	ignoreTypes(sysex: boolean, timing: boolean, activeSensing: boolean): void {
		return this.#input.ignoreTypes(sysex, timing, activeSensing)
	}
	openPort(port: number): void {
		return this.#input.openPort(port)
	}
	openPortByName(name: string): void {
		for (let port = 0; port < this.#input.getPortCount(); ++port) {
			if (name === this.#input.getPortName(port)) {
				return this.#input.openPort(port)
			}
		}
		return undefined
	}
	openVirtualPort(port: string): void {
		return this.#input.openVirtualPort(port)
	}
	setBufferSize(size: number, count = 4): void {
		return this.#input.setBufferSize(size, count)
	}
}

export function createReadStream(input?: Input): Stream.Readable {
	input = input || new Input()

	const stream = new Stream.Readable({
		objectMode: true,
		read() {
			// Data is pushed from the messageBuffer event handler
		},
	})

	input.on('messageBuffer', (_deltaTime, packet) => {
		stream.push(packet)
	})

	return stream
}
