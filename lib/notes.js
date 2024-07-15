// MIDI notes
module.exports = {

    /*
    ** The MIDI spec only indicates middle C to be
    ** 60. It doesn't indicate which octave this is.
    ** Some may consider 4, if they label octaves 
    ** from -1, instead of 0. I have adopted on octave
    ** number C here.
    */
    MIDDLE_C : 60,
    
    // Relative offsets
    C		: 0,
    C_SHARP : 1,
    C_FLAT	: -1,
    D		: 2,
    D_SHARP : 3,
    D_FLAT  : 1,
    E		: 4,
    E_SHARP : 5,
    E_FLAT  : 3,
    F		: 5,
    F_SHARP : 6,
    F_FLAT  : 4,
    G		: 7,
    G_SHARP : 8,
    G_FLAT  : 6,
    A		: 9,
    A_SHARP : 10,
    A_FLAT  : 8,
    B		: 11,
    B_SHARP : 12,
    B_FLAT  : 10,

    // For the octaves
    C0	: 0, 
    C1	: 12,
    C2	: 24,
    C3	: 36,
    C4	: 48,
    C5	: 60,
    C6	: 72,
    C7	: 84,
    C8	: 96,
    C9	: 108,
    C10	: 120,

};

