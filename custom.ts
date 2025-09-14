//% color=#fff609 weight=50 icon="\f1b0" block="SAMMY"
namespace sammy {
    export function say(speech: number[][]) {
        let Formants: number[][]
        Formants = [
            // vowels f1, f2, f3
            [710, 1100, 2540], //0 = ah
            [280, 2250, 2890], //1 = ee
            [400, 1920, 2560], //2 = ih
            [550, 1770, 2490], //3 = eh
            [690, 1660, 2490], //4 = ae
            [590, 880, 2540], //5 = oh
            [310, 870, 2250], //6 = oo
            // approximants
            [300, 700, 2100],//7 = w 
            [300, 1850, 2620],//8 = y
            [300, 1000, 1600],//9 = r  
            [200, 1000, 2800],//10 = l
            // plosives
            // voiced lf1, lf2, lf3
            [0, 600, 2500], //11 = bb
            [0, 1800, 3000], //12 = dd
            [0, 3000, 3000], //13 = gg
            // aspirated f2 multiplier, empty, empty
            [0.5], //14 = pp
            [1], //15 = tt
            [2], //16 = kk
            // fricatives f, str (repeat)
            [3000, 0.4, 3500, 0.3, 4000, 0.3, 4500, 0.2, 5000, 0.2], //17 = ff
            [400, 0.2, 4000, 0.2, 4500, 0.2, 5000, 0.2], //18 = vv
            [300, 0.1, 2500, 0.3, 3000, 0.2], //19 = th
            [3000, 0.2, 4500, 0.5, 5000, 0.5], //20 = ss
            [250, 0.5, 4000, 0.5, 4500, 0.3], //21 = zz
            [3000, 0.3, 3500, 0.5, 4000, 1, 4500, 0.7, 5000, 0.5], //22 = sh
            [1000, 0.3, 2750, 0.2], //23 = hh 
            // nasals
            [400, 0.7, 2600],//24 = m
            [300, 1, 2400],//25 = n
        ]
        let FormantsClone = [
            // vowels f1, f2, f3
            [710, 1100, 2540], //0 = ah
            [280, 2250, 2890], //1 = ee
            [400, 1920, 2560], //2 = ih
            [550, 1770, 2490], //3 = eh
            [690, 1660, 2490], //4 = ae
            [590, 880, 2540], //5 = oh
            [310, 870, 2250], //6 = oo
            // approximants
            [300, 700, 2100],//7 = w 
            [300, 1850, 2620],//8 = y
            [300, 1000, 1600],//9 = r  
            [200, 1000, 2800],//10 = l
            // plosives
            // voiced lf1, lf2, lf3
            [0, 600, 2500], //11 = bb
            [0, 1800, 3000], //12 = dd
            [0, 3000, 3000], //13 = gg
            // aspirated f2 multiplier, empty, empty
            [0.5], //14 = pp
            [1], //15 = tt
            [2], //16 = kk
            // fricatives f, str (repeat)
            [3000, 0.4, 3500, 0.3, 4000, 0.3, 4500, 0.2, 5000, 0.2], //17 = ff
            [400, 0.2, 4000, 0.2, 4500, 0.2, 5000, 0.2], //18 = vv
            [300, 0.1, 2500, 0.3, 3000, 0.2], //19 = th
            [3000, 0.2, 4500, 0.5, 5000, 0.5], //20 = ss
            [250, 0.5, 4000, 0.5, 4500, 0.3], //21 = zz
            [3000, 0.3, 3500, 0.5, 4000, 1, 4500, 0.7, 5000, 0.5], //22 = sh
            [1000, 0.3, 2750, 0.2], //23 = hh 
            // nasals
            [400, 0.7, 2600],//24 = m
            [300, 1, 2400],//25 = n
        ]
        let FormantLetters: string[]
        let VowelMarker = 10
        let VoiceMarker = 13
        let AspireMarker = 16
        let FricativeMarker = 23
        for (let index = 0; index <= speech.length - 1; index++) {
            if (speech[index][0] > FricativeMarker) {
                /// formant 1
                music.play(music.createSoundEffect(
                    WaveShape.Sine,
                    Formants[speech[index][0]][0],
                    Formants[speech[index][0]][0],
                    255,
                    255,
                    speech[index][1],
                    SoundExpressionEffect.None,
                    InterpolationCurve.Linear
                ), music.PlaybackMode.InBackground)
                if (index < speech.length - 1 && speech[index - 1][0] <= VowelMarker && speech[index - 1][0] >= 0) {
                    /// formant 2
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index - 1][0]][1],
                        Formants[speech[index - 1][0]][1] * Formants[speech[index][0]][1],
                        100,
                        100,
                        speech[index][1],
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                }
                else {
                    /// formant 2
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[3][1],
                        Formants[3][1] * Formants[speech[index][0]][1],
                        100,
                        100,
                        speech[index][1],
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                }
                /// formant 3
                music.play(music.createSoundEffect(
                    WaveShape.Sine,
                    Formants[speech[index][0]][2],
                    Formants[speech[index][0]][2],
                    150,
                    150,
                    speech[index][1],
                    SoundExpressionEffect.None,
                    InterpolationCurve.Linear
                ), music.PlaybackMode.InBackground)
                pause(speech[index][1])
            }
            else if (speech[index][0] == 19) {
                const mySound: Buffer = hex`050001010001000111000000`;
                music.playInstructions(0, mySound)
                for (let i = 0; i < Formants[speech[index][0]].length / 2; i += 2) {
                    /// formant 1
                    music.play(music.createSoundEffect(
                        WaveShape.Noise,
                        Formants[speech[index][0]][i],
                        Formants[speech[index][0]][i],
                        Formants[speech[index][0]][i + 1] * 255,
                        Formants[speech[index][0]][i + 1] * 255 * 0.7,
                        speech[index][1],
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                }
                pause(speech[index][1] / 2)
                if (index < speech.length - 1 && speech[index + 1][0] <= VowelMarker && speech[index + 1][0] >= 0) {
                    /// formant 1
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][0],
                        Formants[speech[index + 1][0]][0],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 2
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][1],
                        Formants[speech[index + 1][0]][1],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 3
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][2],
                        Formants[speech[index + 1][0]][2],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                }
                pause(speech[index][1] / 2)
            }
            else if (speech[index][0] > AspireMarker) {
                const mySound: Buffer = hex`050001010001110011000000`;
                music.playInstructions(0, mySound)
                for (let i = 0; i < Formants[speech[index][0]].length / 2; i += 2) {
                    /// formant 1
                    music.play(music.createSoundEffect(
                        WaveShape.Noise,
                        Formants[speech[index][0]][i],
                        Formants[speech[index][0]][i],
                        Formants[speech[index][0]][i + 1] * 255,
                        Formants[speech[index][0]][i + 1] * 255 * 0.7,
                        speech[index][1],
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                }
                pause(speech[index][1] / 2)
                if (index < speech.length - 1 && speech[index + 1][0] <= VowelMarker && speech[index + 1][0] >= 0) {
                    /// formant 1
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][0],
                        Formants[speech[index + 1][0]][0],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 2
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][1],
                        Formants[speech[index + 1][0]][1],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 3
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][2],
                        Formants[speech[index + 1][0]][2],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                }
                pause(speech[index][1] / 2)
            }
            else if (speech[index][0] > VoiceMarker) {
                pause(speech[index][1] / 2)
                if (index < speech.length - 1 && speech[index + 1][0] <= VowelMarker && speech[index + 1][0] >= 0) {
                    //aspiration
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][1] * Formants[speech[index][0]][0],
                        Formants[speech[index + 1][0]][1] * Formants[speech[index][0]][0],
                        255,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    pause(speech[index][1] / 2)
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][1] * Formants[speech[index][0]][0],
                        Formants[speech[index + 1][0]][1] * Formants[speech[index][0]][0],
                        255,
                        0,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 1
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][0],
                        Formants[speech[index + 1][0]][0],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 2
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][1],
                        Formants[speech[index + 1][0]][1],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 3
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][2],
                        Formants[speech[index + 1][0]][2],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    pause(speech[index][1] / 2)
                }
                else {
                    //aspiration
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[3][1] * Formants[speech[index][0]][0],
                        Formants[3][1] * Formants[speech[index][0]][0],
                        255,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    pause(speech[index][1] / 2)
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[3][1] * Formants[speech[index][0]][0],
                        Formants[3][1] * Formants[speech[index][0]][0],
                        255,
                        0,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 1
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[3][0],
                        Formants[3][0],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 2
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[3][1],
                        Formants[3][1],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 3
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[3][2],
                        Formants[3][2],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    pause(speech[index][1] / 2)
                }
            }
            else if (speech[index][0] > VowelMarker) {
                ///pause + voicing
                music.play(music.createSoundEffect(
                    WaveShape.Sine,
                    200,
                    200,
                    255,
                    255,
                    speech[index][1] / 2,
                    SoundExpressionEffect.None,
                    InterpolationCurve.Linear
                ), music.PlaybackMode.InBackground)
                pause(speech[index][1] / 2)
                if (index < speech.length - 1 && speech[index + 1][0] <= VowelMarker && speech[index + 1][0] >= 0) {
                    /// formant 1
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][0] - Math.constrain(Formants[speech[index][0]][0], -300, 300),
                        Formants[speech[index + 1][0]][0],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 2
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][1] - Math.constrain(Formants[speech[index][0]][1], -300, 300),
                        Formants[speech[index + 1][0]][1],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 3
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index + 1][0]][2] - Math.constrain(Formants[speech[index][0]][2], -300, 300),
                        Formants[speech[index + 1][0]][2],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    pause(speech[index][1] / 2)
                }
                else {
                    /// formant 1
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[3][0] - Math.constrain(Formants[speech[index][0]][0], -300, 300),
                        Formants[3][0],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 2
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[3][1] - Math.constrain(Formants[speech[index][0]][1], -300, 300),
                        Formants[3][1],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 3
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[3][2] - Math.constrain(Formants[speech[index][0]][2], -300, 300),
                        Formants[3][2],
                        0,
                        255,
                        speech[index][1] / 2,
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    pause(speech[index][1] / 2)
                }
            }
            else if (speech[index][0] >= 0) {
                /// formant 1
                music.play(music.createSoundEffect(
                    WaveShape.Sine,
                    Formants[speech[index][0]][0],
                    Formants[speech[index][0]][0],
                    255,
                    255,
                    speech[index][1],
                    SoundExpressionEffect.None,
                    InterpolationCurve.Linear
                ), music.PlaybackMode.InBackground)
                /// formant 2
                music.play(music.createSoundEffect(
                    WaveShape.Sine,
                    Formants[speech[index][0]][1],
                    Formants[speech[index][0]][1],
                    255,
                    255,
                    speech[index][1],
                    SoundExpressionEffect.None,
                    InterpolationCurve.Linear
                ), music.PlaybackMode.InBackground)
                /// formant 3
                music.play(music.createSoundEffect(
                    WaveShape.Sine,
                    Formants[speech[index][0]][2],
                    Formants[speech[index][0]][2],
                    255,
                    255,
                    speech[index][1],
                    SoundExpressionEffect.None,
                    InterpolationCurve.Linear
                ), music.PlaybackMode.InBackground)
                pause(speech[index][1])
            }
            else if (speech[index][0] == -1) {
                if (speech[index + 1][0] >= 0) {
                    /// formant 1
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index - 1][0]][0],
                        Formants[speech[index + 1][0]][0],
                        255,
                        255,
                        speech[index][1],
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 2
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index - 1][0]][1],
                        Formants[speech[index + 1][0]][1],
                        255,
                        255,
                        speech[index][1],
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 3
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index - 1][0]][2],
                        Formants[speech[index + 1][0]][2],
                        255,
                        255,
                        speech[index][1],
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                }
                else {
                    /// formant 1
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index - 1][0]][0],
                        Formants[speech[index - 1][0]][0],
                        255,
                        0,
                        speech[index][1],
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 2
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index - 1][0]][1],
                        Formants[speech[index - 1][0]][1],
                        255,
                        0,
                        speech[index][1],
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                    /// formant 3
                    music.play(music.createSoundEffect(
                        WaveShape.Sine,
                        Formants[speech[index - 1][0]][2],
                        Formants[speech[index - 1][0]][2],
                        255,
                        0,
                        speech[index][1],
                        SoundExpressionEffect.None,
                        InterpolationCurve.Linear
                    ), music.PlaybackMode.InBackground)
                }
                pause(speech[index][1])
            }
            else if (speech[index][0] == -2) {
                let shift = speech[index][1]
                for (let i = 0; i < FormantsClone.length; i++) {
                    for (let w = 0; w < FormantsClone[i].length; w++) {
                        if (FormantsClone[i][w] > 2) {
                            Formants[i][w] = FormantsClone[i][w] + shift;
                        }
                    }
                }
            }
            else if (speech[index][0] == -3) {
                pause(speech[index][1])
            }
        }
    }
}
