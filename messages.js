// MIDI messages
module.exports = {

    // All basic messages are held in the root, because of how commonly they're
    // used. Luckily, there's no name clashes with sub-names
    NOTE_OFF:           0x80,		/* [ pitch, volume ] */
    NOTE_ON:            0x90,		/* [ pitch, volume ] */
    NOTE_KEY_PRESSURE:  0xa0,		/* [ pitch, pressure (after touch) ] */
    SET_PARAMETER:      0xb0,		/* [ param number (CC), setting ] */
    SET_PROGRAM:        0xc0,		/* [ program ] */
    CHANGE_PRESSURE:    0xd0,		/* [ pressure (after touch) ] */
    SET_PITCHWHEEL:     0xe0,		/* [ LSB,  MSB (two 7 bit values) ] */
    
    METAEVENT:          0xff,
    SYS_EX1:            0xf0,
    SYS_EX2:            0xf7,

    /* Alternative names */
    PATCH_CHANGE:       0xc0,       /* Equivalent to SET_PROGRAM */
    CONTROL_CHANGE:     0xb0,       /* Equivalent to SET_PARAMETER */

    SYSMASK:            0xf0,


    // Control changes
    cc: {
		/* 0-31, where defined, all indicate the MSB */
		BANK_SELECT:		    0,
		MODULATION:             1,
		BREATH_CONTROL:         2,
		UNDEFINED_3:            3,
		FOOT_CONTROL:           4,
		PORTAMENTO_TIME:        5,
		DATE_ENTRY:             6,
		VOLUME:                 7,
		BALANCE:                8,
		UNDEFINED_9:            9,
		PAN:                    10,
		EXPRESSION:             11,
		EFFECT_CONTROL_1:       12,
		EFFECT_CONTROL_2:       13,
		UNDEFINED_14:           14,
		UNDEFINED_15:           15,
		GENERAL_PURPOSE_1:      16,
		GENERAL_PURPOSE_2:		17,
		GENERAL_PURPOSE_3:		18,
		GENERAL_PURPOSE_4:		19,

        /* 20-31 are undefined */
		UNDEFINED_20:           20,
		UNDEFINED_21:           21,
		UNDEFINED_22:           22,
		UNDEFINED_23:           23,
		UNDEFINED_24:           24,
		UNDEFINED_25:           25,
		UNDEFINED_26:           26,
		UNDEFINED_27:           27,
		UNDEFINED_28:           28,
		UNDEFINED_29:           29,
		UNDEFINED_30:           30,
		UNDEFINED_31:           31,

        /* LSB for control changes 0-31		32-63 */
		BANK_SELECT_LSB:		32,
        MODULATION_LSB:         33,
        BREATH_CONTROL_LSB:     34,
		UNDEFINED_35:           35,
        FOOT_CONTROL_LSB:       36,
        PORTAMENTO_TIME_LSB:    37,
        DATA_ENTRY_LSB:         38,
        VOLUME_LSB:             39,
        BALANCE_LSB:            40,
		UNDEFINED_41:           41,
        PAN_LSB:                42,
        EXPRESSION_LSB:         43,
        EFFECT_CONTROL_1_LSB:   44,
        EFFECT_CONTROL_2_LSB:   45,

        UNDEFINED_46:           46,
		UNDEFINED_47:           47,
        GENERAL_PURPOSE_1_LSB:  48,
        GENERAL_PURPOSE_2_LSB:  49,
        GENERAL_PURPOSE_3_LSB:  50,
        GENERAL_PURPOSE_4_LSB:  51,

        /* 52-63 are undefined */
		UNDEFINED_52:           52,
		UNDEFINED_53:           53,
		UNDEFINED_54:           54,
		UNDEFINED_55:           55,
		UNDEFINED_56:           56,
		UNDEFINED_57:           57,
		UNDEFINED_58:           58,
		UNDEFINED_59:           59,
		UNDEFINED_60:           60,
		UNDEFINED_61:           61,
		UNDEFINED_62:           62,
		UNDEFINED_63:           63,

        SUSTAIN_PEDAL:          64,
		PORTAMENTO:             65,
        PEDAL_SUSTENUTO:        66,
        PEDAL_SOFT:             67,
        LEGATO_FOOT_SWITCH:     68,
		HOLD_2:                 69,
        SOUND_VARIATION:        70,
		TIMBRE:                 71,
        RELEASE_TIME:           72,
		ATTACKTIME:             73,
        BRIGHTNESS:             74,
		REVERB:                 75,
		DELAY:                  76,
        PITCH_TRANSPOSE:        77,
		FLANGE:                 78,
        SPECIAL_FX:             79,

        GENERAL_PURPOSE_5_LSB:  80,
        GENERAL_PURPOSE_6_LSB:  81,
        GENERAL_PURPOSE_7_LSB:  82,
        GENERAL_PURPOSE_8_LSB:  83,

        PORTAMENTO_CONTROL:     84,

        /* 85-90 are undefined */
		UNDEFINED_85:           85,
		UNDEFINED_86:           86,
		UNDEFINED_87:           87,
		UNDEFINED_88:           88,
		UNDEFINED_89:           89,
		UNDEFINED_90:           90,

        /* Effects depth */
		FX_DEPTH:               91,
		TREMELO_DEPTH:          92,
        CHORUS_DEPTH:           93,
        CELESTA_DEPTH:          94,
        PHASER_DEPTH:           95,
		DATA_INC:               96,
		DATA_DEC:               97,
        NON_REG_PARAM_LSB:      98,
        NON_REG_PARAM_MSB:      99,
        REG_PARAM_LSB:          100,
        REG_PARAM_MSB:          101,

        /* 102-119 are undefined */
		UNDEFINED_102:          102,
		UNDEFINED_103:          103,
		UNDEFINED_104:          104,
		UNDEFINED_105:          105,
		UNDEFINED_106:          106,
		UNDEFINED_107:          107,
		UNDEFINED_108:          108,
		UNDEFINED_109:          109,
		UNDEFINED_110:          110,
		UNDEFINED_111:          111,
		UNDEFINED_112:          112,
		UNDEFINED_113:          113,
		UNDEFINED_114:          114,
		UNDEFINED_115:          115,
		UNDEFINED_116:          116,
		UNDEFINED_117:          117,
		UNDEFINED_118:          118,
		UNDEFINED_119:          119,

        // Modes
        ALL_SOUND_OFF:          120,
        RESET_ALL_CONTROLLERS:  121,
		LOCAL_CONTROL:          122,
        ALL_NOTES_OFF:          123,
		OMNI_MODE_OFF:          124,
		OMNI_MODE_ON:           125,
		MONO_MODE_ON:           126,
		POLY_MODE_ON:           127,

		/* Alternative names */
		MOD_WHEEL:              1,

		/* All sound controllers have only LSB */
		HARM_CONTENT:           71,
        SOUND_CONTROLLER_1:     70,
        SOUND_CONTROLLER_2:     71,
        SOUND_CONTROLLER_3:     72,
        SOUND_CONTROLLER_4:     73,
        SOUND_CONTROLLER_5:     74,
        SOUND_CONTROLLER_6:     75,
        SOUND_CONTROLLER_7:     76,
        SOUND_CONTROLLER_8:     77,
        SOUND_CONTROLLER_9:     78,
        SOUND_CONTROLLER_10:    79,

        EFFECT_1_DEPTH:         91,
		EFFECT_2_DEPTH:         92,
		EFFECT_3_DEPTH:         93,
		EFFECT_4_DEPTH:         94,
		EFFECT_5_DEPTH:         95,

        DETUNE_DEPTH:           94,
    },


    /*
    ** System Common (Status byte: 1111 0ttt)
    */
    syscommon: {
        UNDEFINED_1:            0xf1,
        SONG_POSITION:          0xf2, /* [LSB, MSB] */
        SONG_SELECT:            0xf3,
        UNDEFINED_4:            0xf4,
        UNDEFINED_5:            0xf5,
        TUNE_REQUEST:           0xf6,
        EOX:                    0xf7, /* End of Exclusive */
    },


    /*
    ** System Real Time (Status byte: 1111 1ttt)
    */
    realtime: {
        TIMING_CLOCK:   0xf8,
        UNDEFINED_F9:   0xf9,
        START:          0xfa,
        CONTINUE:       0xfb,
        STOP:           0xfc,
        UNDEFINED_FD:   0xfd,
        ACTIVE_SENSING: 0xfe,
        SYSTEM_RESET:   0xff,
    },


    /*
    ** System Exclusive (Status byte: 1111 0000)
    **
    ** The first byte of a sysex must be the identification number
    ** (7 bits, MSB=0). This is followed by an arbitary number of
    ** data bytes (all MSB=0), and ending in the sexEOX msg.
    ** Note: Any other status byte (where MSB=1) will also terminate
    ** a sysex message, with the exception of the System Real Time
    ** events above.
    */
    sysex: {
        EOX:                    0xf7, /* End of Exclusive */
    },

};
