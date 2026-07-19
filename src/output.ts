import Stream from 'stream'
import { midi } from './native.js'

export class Output {
	readonly #output: any

	constructor() {
		this.#output = new midi.Output()
	}

	static getPortNames(): string[] {
		return midi.getOutputPortNames()
	}

	closePort(): void {
		return this.#output.closePort()
	}
	destroy(): void {
		return this.#output.destroy()
	}
	getPortCount(): number {
		return this.#output.getPortCount()
	}
	getPortName(port: number): string {
		return this.#output.getPortName(port)
	}
	isPortOpen(): boolean {
		return this.#output.isPortOpen()
	}
	openPort(port: number): void {
		return this.#output.openPort(port)
	}
	openPortByName(name: string): void {
		for (let port = 0; port < this.#output.getPortCount(); ++port) {
			if (name === this.#output.getPortName(port)) {
				return this.#output.openPort(port)
			}
		}
		return undefined
	}
	openVirtualPort(port: string): void {
		return this.#output.openVirtualPort(port)
	}
	send(message: number[] | Buffer): void {
		return this.sendMessage(message)
	}
	sendMessage(message: number[] | Buffer): void {
		if (Array.isArray(message)) {
			message = Buffer.from(message)
		}
		if (!Buffer.isBuffer(message)) {
			throw new Error('First argument must be an array or Buffer')
		}

		return this.#output.sendMessage(message)
	}
}

export function createWriteStream(output?: Output): Stream.Writable {
	output = output || new Output()

	const stream = new Stream.Writable({
		objectMode: true,
		write(chunk: Buffer | number[], _encoding, callback) {
			if (!Buffer.isBuffer(chunk)) {
				chunk = Buffer.from(chunk)
			}
			try {
				output.sendMessage(chunk)
				callback()
			} catch (e) {
				callback(e as Error)
			}
		},
	})

	return stream
}
