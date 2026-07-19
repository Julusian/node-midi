// Bring in the set of constants to reflect MIDI messages and their
// parameters, to eliminate the need for magic numbers.
/** An instrument list, only valid in the General MIDI standard */
import { Instruments } from './instruments.js'
/** A drum map, only valid in the General MIDI standard */
import { Drums } from './drums.js'
/** Note descriptions, with Middle C = C5 = MIDI note 60 */
import { Notes } from './notes.js'
/** Message names, including CCs */
import { Messages } from './messages.js'

import { Input, MidiMessage } from './input.js'
import { Output } from './output.js'

export * from './input.js'
export * from './output.js'
export type { MidiEventInfo } from './message-parser.js'

/** @deprecated */
export type MidiCallback = (deltaTime: number, message: MidiMessage) => void

export const Constants = {
	Instruments,
	Drums,
	Notes,
	Messages,
}

/** @deprecated */
export const input = Input
/** @deprecated */
export const output = Output
