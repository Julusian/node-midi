/// <reference types="node" />

import { Stream } from 'stream';
import { EventEmitter } from 'events';

/**
 * An array of numbers corresponding to the MIDI bytes: [status, data1, data2].
 * See https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html for more info.
 */
export type MidiMessage = number[];
export type MidiCallback = (deltaTime: number, message: MidiMessage) => void;

export class Input extends EventEmitter {
    constructor()

    /** Close the midi port */
    closePort(): void;
    /** Close and dispose of the midi port */
    destroy(): void;
    /** Count the available input ports */
    getPortCount(): number;
    /** Get the name of a specified input port */
    getPortName(port: number): string;
    isPortOpen(): boolean
    /**
     * Sysex, timing, and active sensing messages are ignored by default. To
     * enable these message types, pass false for the appropriate type in the
     * function below.  Order: (Sysex, Timing, Active Sensing) For example if
     * you want to receive only MIDI Clock beats you should use
     * input.ignoreTypes(true, false, true)
     */
    ignoreTypes(sysex: boolean, timing: boolean, activeSensing: boolean): void;
    /** Open the specified input port */
    openPort(port: number): void;
    /** Open the specified input port */
    openPortByName(name: string): void;
    /**
     * Instead of opening a connection to an existing MIDI device, on Mac OS X
     * and Linux with ALSA you can create a virtual device that other software
     * may connect to. This can be done simply by calling
     * openVirtualPort(portName) instead of openPort(portNumber).
     */
    openVirtualPort(port: string): void;

    on(event: 'message', callback: MidiCallback): this;
    /**
     * Set the size of the internal buffer used to cache incoming MIDI messages.
     * The default size is 2048 bytes. The count parameter specifies the number
     * of messages the buffer can hold. If count is not specified, it defaults 
     * to 4.
     */
    setBufferSize(size: number, count?: number): void;
}

export class Output {
    constructor()
    
    /** Close the midi port */
    closePort(): void;
    /** Close and dispose of the midi port */
    destroy(): void;
    /** Count the available output ports */
    getPortCount(): number;
    /** Get the name of a specified output port */
    getPortName(port: number): string;
    isPortOpen(): boolean
    /** Open the specified output port */
    openPort(port: number): void;
    /** Open the specified output port */
    openPortByName(name: string): void;
    /**
     * Instead of opening a connection to an existing MIDI device, on Mac OS X
     * and Linux with ALSA you can create a virtual device that other software
     * may connect to. This can be done simply by calling
     * openVirtualPort(portName) instead of openPort(portNumber).
     */
    openVirtualPort(port: string): void;
    /** Send a MIDI message */
    send(message: MidiMessage): void;
    /** Send a MIDI message */
    sendMessage(message: MidiMessage): void;
}

/** @deprecated */
export const input: typeof Input;
/** @deprecated */
export const output: typeof Output;

export function createReadStream(input?: Input): Stream;

export function createWriteStream(output?: Output): Stream;
